const yaml = require('js-yaml');
const fs = require('fs');


function yamlToScss(yamlObj, depth = 0) {
  let scss = '';
  const indent = '  '.repeat(depth);
  
  if (yamlObj.variables) {
    for (const key in yamlObj.variables) {
      scss += `${indent}$${key}: ${yamlObj.variables[key]};\n`;
    }
  }

  if (yamlObj.mixins) {
    for (const key in yamlObj.mixins) {
      scss += `${indent}@mixin ${key} {\n${yamlToScss(yamlObj.mixins[key], depth + 1)}${indent}}\n`;
    }
  }

  for (const key in yamlObj) {
    if (key !== 'variables' && key !== 'mixins') {
      const value = yamlObj[key];
      if (typeof value === 'object') {
        scss += `${indent}${key} {\n${yamlToScss(value, depth + 1)}${indent}}\n`;
      } else {
        if (key.startsWith('@include')) {
          scss += `${indent}@include ${value};\n`;
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

// Convert to CSS or SCSS
const scssOutput = yamlToScss(yamlObj);
fs.writeFileSync(process.argv[3], scssOutput);

console.log('CSS/SCSS file generated successfully!');
