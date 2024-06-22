// Temporary test to ensure that the converter is working

const { convertYamlToScss } = require('../src/converter');
const fs = require('fs');
const path = require('path');

test('convert YAML to SCSS', () => {
  const inputYaml = fs.readFileSync(path.join(__dirname, 'input.yaml'), 'utf8');
  const expectedScss = fs.readFileSync(path.join(__dirname, 'expected.scss'), 'utf8');
  const result = convertYamlToScss(inputYaml);
  expect(result).toBe(expectedScss);
});
