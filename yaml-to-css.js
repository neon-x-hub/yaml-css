const yaml = require('js-yaml');
const fs = require('fs');
const sass = require('sass')

function yamlToScss(yamlObj, depth = 0) {
  let scss = '';
  const indent = '  '.repeat(depth);

  // Handle variables
  if (yamlObj.variables) {
    for (const key in yamlObj.variables) {
      const value = yamlObj.variables[key];
      if (Array.isArray(value)) {
        scss += `${indent}$${key}: ("${value.join('", "')}");\n`;
      } else if (typeof value === 'object') {
        const mapValues = Object.entries(value).map(([k, v]) => `${k}: ${v}`).join(', ');
        scss += `${indent}$${key}: (${mapValues});\n`;
      } else {
        scss += `${indent}$${key}: ${value};\n`;
      }
    }
  }

  // Handle mixins
  if (yamlObj.mixins) {
    for (const key in yamlObj.mixins) {
      scss += `${indent}@mixin ${key} {\n${yamlToScss(yamlObj.mixins[key], depth + 1)}${indent}}\n`;
    }
  }

  // Handle functions
  if (yamlObj.functions) {
    for (const key in yamlObj.functions) {
      const func = yamlObj.functions[key];
      const params = func[0].map(p => `$${p}`).join(', ');
      const body = func[1].split('\n').map(line => `${indent}  ${line}`).join('\n');
      scss += `${indent}@function ${key}(${params}) {\n${body}\n${indent}}\n`;
    }
  }

  // Handle nested rules, includes, extends, conditionals and @ Rules
  for (const key in yamlObj) {
    if (!['variables', 'mixins', 'functions'].includes(key)) {
      const value = yamlObj[key];
      if (typeof value === 'object') {
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
      } else {
        if (key.startsWith('include')) {
          scss += `${indent}${key.replace('include', '@include ')}${value};\n`;
        } else {
          scss += `${indent}${key}: ${value};\n`;
        }
      }
    }
  }
  return scss;
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
