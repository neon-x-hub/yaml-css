const fs = require('fs'); // File system module for reading and writing files
const yaml = require('js-yaml'); // js-yaml library for YAML parsing
const Css = require('json-to-css');
const yamlFile = process.argv[2];
// Function to convert YAML to JSON
function yamlToJson(yamlFilepath) {
  try {
    const yamlString = fs.readFileSync(yamlFilepath, 'utf8'); // Read YAML file
    const jsonObject = yaml.load(yamlString); // Parse YAML into a JavaScript object
    return JSON.stringify(jsonObject, null, 2); // Stringify JSON with indentation
  } catch (error) {
    console.error(`Error parsing YAML file: ${error}`);
    return null;
  }
}

// Function to convert JSON to CSS (assuming hypothetical json-to-css library)
function jsonToCss(jsonString) {
  try {
    // Hypothetical usage of json-to-css library
    const cssString = Css.of({...JSON.parse(jsonString)});
    //console.log(cssString); // Replace with actual library call
    return cssString;
  } catch (error) {
    console.error(`Error converting JSON to CSS: ${error}`);
    return null;
  }
}

// Main function to process YAML file and output CSS
function compileYamlToCss(yamlFilepath, outputFilepath) {
  const jsonString = yamlToJson(yamlFilepath);
  if (!jsonString) return; // Handle error if YAML parsing fails

  const cssString = jsonToCss(jsonString);
  if (!cssString) return; // Handle error if JSON to CSS conversion fails

  fs.writeFileSync(outputFilepath, cssString,'utf8');
  console.log(`Successfully compiled YAML to CSS and saved to ${outputFilepath}`);
}

// Example usage
const cssFile = yamlFile + '.css';

compileYamlToCss(yamlFile, cssFile);
