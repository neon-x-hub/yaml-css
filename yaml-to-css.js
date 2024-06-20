const yaml = require('js-yaml');
const fs = require('fs');

function yamlToScss(yamlObj, depth = 0) {
  let scss = '';
  const indent = '  '.repeat(depth);
  for (const key in yamlObj) {
    const value = yamlObj[key];
    if (typeof value === 'object') {
      scss += `${indent}${key} {\n${yamlToScss(value, depth + 1)}${indent}}\n`;
    } else {
      scss += `${indent}${key}: ${value};\n`;
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

console.log('CSS and SCSS files generated successfully!');
