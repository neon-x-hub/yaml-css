const yaml = require('js-yaml');
const fs = require('fs');
const sass = require('sass')

function yamlToScss(yamlObj, depth = 0) {
  let scss = '';
  const indent = '  '.repeat(depth);

  for (const key in yamlObj) {
      const value = yamlObj[key];

      if (key === 'variables') {
        for (const varName in value) {
            const varValue = formatValue(value[varName]);
            scss += `${indent}$${varName}: ${varValue};\n`;
          }
      } else if (key === 'mixins') {
          for (const mixinName in value) {
              scss += `${indent}@mixin ${mixinName} {\n${yamlToScss(value[mixinName], depth + 1)}${indent}}\n`;
          }
      } else if (key === 'functions') {
          for (const functionName in value) {
              const funcDef = value[functionName];
              const params = funcDef[0].map(p => `$${p}`).join(', ');
              const body = funcDef[1].split('\n').map(line => `${indent}  ${line}`).join('\n');
              scss += `${indent}@function ${functionName} (${params}) {\n${body}\n${indent}}\n`;
          }
      } else if (typeof value === 'object') {
          if (key.startsWith('func ')) {
              const functionName = key.split(' ')[1];
              const params = value[0].map(p => `$${p}`).join(', ');
              const body = value[1].split('\n').map(line => `${indent}  ${line}`).join('\n');
              scss += `${indent}@function ${functionName}(${params}) {\n${body}\n${indent}}\n`;
          } else if (key.startsWith('mxn ')) {
              const mixinName = key.split(' ')[1];
              const body = yamlToScss(value, depth + 1);
              scss += `${indent}@mixin ${mixinName} {\n${body}${indent}}\n`;
          }
          else {
              const extend = value['extend'] ? `${indent}@extend .${value['extend']};\n` : '';
              delete value['extend'];

              const ruleMatch = key.match(/^(\w+)\s+(.*)/);
              if (ruleMatch) {
                  const [, rule, params] = ruleMatch;

                  if (rule === 'each') {
                      const [, variable, , list] = key.split(' ');
                      const body = yamlToScss(value, depth + 1);
                      scss += `${indent}@each ${variable} in ${list} {\n${body}${indent}}\n`;
                  } else if (rule === 'for') {
                      const [, variable, , range] = key.split(' ');
                      const [start, end] = range.split('..');
                      const body = yamlToScss(value, depth + 1);
                      scss += `${indent}@for ${variable} from ${start} through ${end} {\n${body}${indent}}\n`;
                  } else if (rule === 'if') {
                      const condition = params.trim();
                      const body = yamlToScss(value, depth + 1);
                      scss += `${indent}@if ${condition} {\n${body}${indent}}\n`;
                  } else if (['media', 'font-face', 'keyframes', 'supports', 'document', 'page', 'namespace'].includes(rule)) {
                      const body = yamlToScss(value, depth + 1);
                      scss += `${indent}@${rule} ${params} {\n${body}${indent}}\n`;
                  } else {
                      scss += `${indent}${key} {\n${extend}${yamlToScss(value, depth + 1)}${indent}}\n`;
                  }
              } else {
                  scss += `${indent}${key} {\n${extend}${yamlToScss(value, depth + 1)}${indent}}\n`;
              }
          }
      } else {
          if (key.startsWith('include')) {
              scss += `${indent}${key.replace('include', '@include ')}${value};\n`;
          } else {
              scss += `${indent}${key}: ${value};\n`;
          }
      }
  }

  return scss;
}

function formatValue(value) {
    if (Array.isArray(value)) {
      return '(' + value.map(formatValue).join(', ') + ')';
    } else if (typeof value === 'object' && value !== null) {
      return '(' + Object.entries(value).map(([k, v]) => `${k}: ${formatValue(v)}`).join(', ') + ')';
    } else {
      return value;
    }
  }

// Load YAML file
const yamlFile = fs.readFileSync(process.argv[2], 'utf8');
const yamlObj = yaml.load(yamlFile);
// Convert YAML to SCSS
const scssOutput = yamlToScss(yamlObj);

const outputFile = process.argv[3];
const outputExtension = outputFile.split('.').pop();

if (outputExtension === 'scss') {
  // Write SCSS to file
  fs.writeFileSync(outputFile, scssOutput);
} else if (outputExtension === 'css') {
  // Compile SCSS to CSS and write to file
  const result = sass.renderSync({ data: scssOutput });
  fs.writeFileSync(outputFile, result.css);
} else {
  console.error('Unsupported file extension. Please provide an output file with .scss or .css extension.');
}
