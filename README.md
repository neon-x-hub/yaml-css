## YAML to CSS Converter

This is a public JavaScript project that converts YAML styles to CSS. It allows you to define styles in a user-friendly YAML format and generate the corresponding CSS/SCSS code.

**Features:**

* Parses YAML files using the `js-yaml` library.
* Converts the parsed YAML data to CSS styles based on a predefined structure.
* Offers a command-line tool for easy conversion.
* Offers an out-of-the-box SCSS support for nested styling /Mixins/Variables/Functions/Inheretance/Loops/Conditions .

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
   node yaml-to-css.js styles.yaml styles.scss
   ```

   - Replace `styles.yaml` with your actual file name.
   - Replace `styles.scss` with your desired output file name for the generated CSS/SCSS.

**Example YAML Structure:**

```yaml
variables:
  primary-color: '#3498db'
  padding: '10px'
  theme-colors:
    primary: '#3498db'
    secondary: '#2ecc71'
    danger: '#e74c3c'
  colors:
    - red
    - green
    - blue

mixins:
  box:
    padding: $padding
    border: 1px solid $primary-color
  chip:
    padding: $padding
    border-radius: 9999px

functions:
  tint:
    params: [color, amount]
    body: |
      @return mix(white, $color, $amount);

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

  "&:hover":
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

.good:hover button:
  background-color: green
  
nav:
  ul:
    margin: 0
    padding: 0
    list-style: none
    li:
      display: inline-block
      "@include": chip
      a:
        text-decoration: none
        color: $primary-color
        "@include": box

.nav-item:
  "%extend": base-style
  background-color: "#f5f5f5"

.base-style:
  color: $primary-color
  margin: $padding

"@each $color in $colors":
  .color-#{$color}:
    color: $color

"@if $primary-color == '#3498db'":
  .primary-bg:
    background-color: $primary-color

.scss:
  "@for $i from 1..3":
    .font-size-#{$i}:
      font-size: nth($font-sizes, $i);

  "@for $i from 1..4":
    .padding-#{$i}:
      padding: $i * 10px;
```

Gives the following SCSS file: 

```scss

$primary-color: #3498db;
$padding: 10px;
$theme-colors: (primary: #3498db, secondary: #2ecc71, danger: #e74c3c);
$colors: (red, green, blue);
@mixin box {
  padding: $padding;
  border: 1px solid $primary-color;
}
@mixin chip {
  padding: $padding;
  border-radius: 9999px;
}
@function tint($color, $amount) {
  @return mix(white, $color, $amount);
  
}
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}
h1 {
  font-size: 2em;
  margin-bottom: 0.5em;
}
h2 {
  font-size: 1.5em;
  margin-bottom: 0.3em;
}
p {
  line-height: 1.5;
  margin-bottom: 1em;
}
a {
  color: #007bff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}
button {
  background-color: #007bff;
  color: white;
  padding: 0.5em 1em;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.special {
  color: red;
  font-weight: bold;
}
.good:hover button {
  background-color: green;
}
nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    li {
      display: inline-block;
      @include chip;
      a {
        text-decoration: none;
        color: $primary-color;
        @include box;
      }
    }
  }
}
.nav-item {
@extend .base-style;
  background-color: #f5f5f5;
}
.base-style {
  color: $primary-color;
  margin: $padding;
}
@each $color in $colors {
  .color-#{$color} {
    color: $color;
  }
}
@if $primary-color == '#3498db' {
  .primary-bg {
    background-color: $primary-color;
  }
}
.scss {
  @for $i from 1 through 3 {
    .font-size-#{$i} {
      font-size: nth($font-sizes, $i);;
    }
  }
  @for $i from 1 through 4 {
    .padding-#{$i} {
      padding: $i * 10px;;
    }
  }
}


```

**License:**

MIT License

**Contributing:**

This is my first public repository.

We welcome contributions to this project! Feel free to fork the repository, make changes, and submit pull requests.
