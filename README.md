## YAML to CSS Converter

This is a public JavaScript project that converts YAML styles to CSS. It allows you to define styles in a user-friendly YAML format and generate the corresponding CSS code.

**Features:**

* Parses YAML files using the `js-yaml` library.
* Converts the parsed YAML data to CSS styles based on a predefined structure.
* Offers a command-line tool for easy conversion.

**Installation:**

1. Clone this repository or download the zip file.
2. Install the required dependencies:

   ```bash
   npm install
   ```

**Usage:**

1. **Create a YAML file:** Define your styles in a YAML file (e.g., `styles.yaml`). Refer to the example structure below.
2. **Run the script:** Execute the script using Node.js from the command line:

   ```bash
   node yaml-to-css.js styles.yaml output.css
   ```

   - Replace `styles.yaml` with your actual file name.
   - Replace `output.css` with your desired output file name for the generated CSS.

**Example YAML Structure:**

```yaml

body:
  font-family: Arial, sans-serif
  margin: 0
  padding: 0

h1:
  font-size: 2em
  margin-bottom: 0.5em

h2:
  font-size: 1.5em
  margin-bottom: 0.3em

p:
  line-height: 1.5
  margin-bottom: 1em

a:
  color: "#007bff"
  text-decoration: none

a:hover:
  text-decoration: underline

button:
  background-color: "#007bff"
  color: white
  padding: 0.5em 1em
  border: none
  border-radius: 4px
  cursor: pointer

.special:
  color: red
  font-weight: bold

.special:hover button:
  background-color: green
```

**License:**

MIT License

**Contributing:**

This is my first public github repository.
We welcome contributions to this project! Feel free to fork the repository, make changes, and submit pull requests.

