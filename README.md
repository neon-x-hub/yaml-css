## YAML to CSS Converter

Welcome to our YAML-CSS Framework, a user-friendly tool designed to simplify web styling without requiring extensive new learning. Leveraging familiar SASS/CSS knowledge, this framework enables seamless translation of YAML configurations into robust CSS/SCSS, facilitating efficient management of variables, mixins, and styling across projects. Whether configuring colors, typography, or complex layouts, our framework empowers developers to enhance productivity and maintainability with minimal effort and maximum impact.

**Features:**

* Parses YAML files using the `js-yaml` library.
* Converts the parsed YAML data to CSS styles based on a predefined structure.
* Offers a command-line tool for easy conversion.
* Offers an out-of-the-box SCSS support for nested styling /Mixins/Variables/Functions/Inheritance/Loops/Conditions .

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

### Feature with some examples

### Note:
If any key or value strings in the YAML configuration contain special characters, ensure they are wrapped in double quotes (`"`). This helps maintain correct interpretation and processing when translating into SCSS.

### 1. Variables

**YAML:**
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
```

**SCSS:**
```scss
$primary-color: #3498db;
$padding: 10px;
$theme-colors: (primary: #3498db, secondary: #2ecc71, danger: #e74c3c);
$colors: (red, green, blue);
```

### 2. Mixins

**YAML:**
```yaml
mixins:
  box:
    padding: $padding
    border: 1px solid $primary-color
  chip:
    padding: $padding
    border-radius: 9999px
```

**SCSS:**
```scss
@mixin box {
  padding: $padding;
  border: 1px solid $primary-color;
}

@mixin chip {
  padding: $padding;
  border-radius: 9999px;
}
```

### 3. Functions

**YAML:**
```yaml
functions:
  tint:
    params: [color, amount]
    body: |
      @return mix(white, $color, $amount);
```

**SCSS:**
```scss
@function tint($color, $amount) {
  @return mix(white, $color, $amount);
}
```

### 4. Body Styles

**YAML:**
```yaml
body:
  font-family: Arial, sans-serif
  margin: 0
  padding: 0
```

**SCSS:**
```scss
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}
```

### 5. Heading Styles (h1, h2)

**YAML:**
```yaml
h1:
  font-size: 2em
  margin-bottom: 0.5em

h2:
  font-size: 1.5em
  margin-bottom: 0.3em
```

**SCSS:**
```scss
h1 {
  font-size: 2em;
  margin-bottom: 0.5em;
}

h2 {
  font-size: 1.5em;
  margin-bottom: 0.3em;
}
```

### 6. Paragraph Styles (p)

**YAML:**
```yaml
p:
  line-height: 1.5
  margin-bottom: 1em
```

**SCSS:**
```scss
p {
  line-height: 1.5;
  margin-bottom: 1em;
}
```

### 7. Link Styles (a)

**YAML:**
```yaml
a:
  color: "#007bff"
  text-decoration: none
  "&:hover":
    text-decoration: underline
```

**SCSS:**
```scss
a {
  color: #007bff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}
```

### 8. Button Styles (button)

**YAML:**
```yaml
button:
  background-color: "#007bff"
  color: white
  padding: 0.5em 1em
  border: none
  border-radius: 4px
  cursor: pointer
```

**SCSS:**
```scss
button {
  background-color: #007bff;
  color: white;
  padding: 0.5em 1em;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
```

### 9. Special Class (.special)

**YAML:**
```yaml
.special:
  color: red
  font-weight: bold
```

**SCSS:**
```scss
.special {
  color: red;
  font-weight: bold;
}
```

### 10. Nested Selector with Pseudo-class (hover)

**YAML:**
```yaml
.good:hover button:
  background-color: green
```

**SCSS:**
```scss
.good:hover button {
  background-color: green;
}
```

### 11. Nested Selector with Mixin (nav ul li a)

**YAML:**
```yaml
nav:
  ul:
    margin: 0
    padding: 0
    list-style: none
    li:
      display: inline-block
      include: chip
      a:
        text-decoration: none
        color: $primary-color
        include: box
```

**SCSS:**
```scss
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
```

### 12. Extend Selector - Inheritance (.nav-item)

**YAML:**
```yaml
.nav-item:
  extend: base-style
  background-color: "#f5f5f5"

.base-style:
  color: $primary-color
  margin: $padding
```

**SCSS:**
```scss
.nav-item {
  @extend .base-style;
  background-color: #f5f5f5;
}

.base-style {
  color: $primary-color;
  margin: $padding;
}
```

### 13. Looping through Colors (@each)

**YAML:**
```yaml
each $color in $colors:
  .color-#{$color}:
    color: $color
```

**SCSS:**
```scss
@each $color in $colors {
  .color-#{$color} {
    color: $color;
  }
}
```

### 14. Conditional Statement (@if)

**YAML:**
```yaml
if $primary-color == '#3498db':
  .primary-bg:
    background-color: $primary-color
```

**SCSS:**
```scss
@if $primary-color == '#3498db' {
  .primary-bg {
    background-color: $primary-color;
  }
}
```

### 15. Loops (@for)

**YAML:**
```yaml
.scss:
  for $i in 1..3:
    .font-size-#{$i}:
      font-size: nth($font-sizes, $i)

  for $i in 1..4:
    .padding-#{$i}:
      padding: $i * 10px
```

**SCSS:**
```scss
.scss {
  @for $i from 1 through 3 {
    .font-size-#{$i} {
      font-size: nth($font-sizes, $i);
    }
  }
  
  @for $i from 1 through 4 {
    .padding-#{$i} {
      padding: $i * 10px;
    }
  }
}
```

**License:**

MIT License

**Contributing:**

This is my first public repository.

We welcome contributions to this project! Feel free to fork the repository, make changes, and submit pull requests.
