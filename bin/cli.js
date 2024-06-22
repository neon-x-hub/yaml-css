#!/usr/bin/env node

const { convertYamlToScss } = require('../src/converter');
const fs = require('fs');
const path = require('path');
const sass = require('sass');
const { Command } = require('commander');

const program = new Command();

program
  .name('yamlcss')
  .description('Convert YAML to SCSS or CSS')
  .version('1.0.0')
  .argument('<inputFile>', 'Input YAML file')
  .argument('<outputFile>', 'Output SCSS or CSS file')
  .action((inputFile, outputFile) => {
    const yamlFile = fs.readFileSync(inputFile, 'utf8');
    
    const scssOutput = convertYamlToScss(yamlFile);

    const outputExtension = path.extname(outputFile).substring(1);
    if (outputExtension === 'scss') {
      fs.writeFileSync(outputFile, scssOutput);
    } else if (outputExtension === 'css') {
      const result = sass.renderSync({ data: scssOutput });
      fs.writeFileSync(outputFile, result.css.toString());
    } else {
      console.error('Unsupported file extension. Please provide an output file with .scss or .css extension.');
    }
  });

program.parse(process.argv);