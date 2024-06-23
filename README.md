## YamlCSS Converter

![Header Image](images/header.jpg)


Welcome to our YamlCSS Framework, a user-friendly tool designed to simplify web styling without requiring extensive new learning. Leveraging familiar SASS/CSS knowledge, this framework enables seamless translation of YAML configurations into robust CSS/SCSS, facilitating efficient management of variables, mixins, and styling across projects. Whether configuring colors, typography, or complex layouts, our framework empowers developers to enhance productivity and maintainability with minimal effort and maximum impact.

**Features:**

* Parses YAML files using the `js-yaml` library.
* Converts the parsed YAML data to CSS styles based on a predefined structure.
* Offers a command-line tool for easy conversion.
* Offers an out-of-the-box SCSS support for nested styling /Mixins/Variables/Functions/Inheritance/Loops/Conditions .

**Installation:**

1. Clone this repository or download the zip file.
Or Install globally via a package manager:

   ```bash
   npm install -g https://github.com/neon-x-hub/yaml-css.git
   ```

**Usage:**

1. **Create a YAML file:** Define your styles in a YAML file (e.g., `styles.yaml`). Refer to the example structure below.
2. **Run the script:** Execute the script using the command line:

   ```bash
   ycss input.yaml output.scss
   ```

   - Replace `input.yaml` with your actual file name.
   - Replace `output.scss` with your desired output file name for the generated CSS/SCSS.

### Feature with some examples

### Note:
If any key or value strings in the YAML configuration contain special characters, ensure they are wrapped in double quotes (`"`). This helps maintain correct interpretation and processing when translating into SCSS.

### 1. Variables

**YAML:**
```yaml
variables:
  primary-color: '#3498db'
  padding: '10px'
  font-sizes: [10px, 20px, 30px]
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
$font-sizes: (10px, 20px, 30px);
$theme-colors: (primary: #3498db, secondary: #2ecc71, danger: #e74c3c);
$colors: (red, green, blue);
```

### 2. Mixins

**YAML:**
```yaml
# You can define a set of mixins
mixins:
  box:
    padding: $padding
    border: 1px solid $primary-color
  chip:
    padding: $padding
    border-radius: 9999px
# Or you can define each mixin individually with the "mxn" keyword
mxn box2:
  padding: $padding
  border: 1px solid $primaryColor
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
@mixin box2 {
  padding: $padding;
  border: 1px solid $primaryColor;
}
```

### 3. Functions

**YAML:**
```yaml
# You can define a set of functions
functions:
  darken:
    - [color, amount] # Params
    - | # Body
       @return mix(black, $color, $amount);

# Or you can define each function individually with "func" keyword
func lighten:
  - [color, amount]
  - |
     @return mix(white, $color, $amount);
```

**SCSS:**
```scss
@function darken ($color, $amount) {
  @return mix(black, $color, $amount);
  
}
@function lighten($color, $amount) {
  @return mix(white, $color, $amount);
  
}

```

### 4. Styles By Tag, Classes and IDs

**YAML:**
```yaml
h1:
  font-size: 24px
  font-weight: bold
  color: green
  "&:hover":
    color: blue

.class :
  color: red
  font-size: 16px
  font-weight: bold
  text-decoration: underline
  "&:before" :
    color: blue

"#id":
  color: blue
  font-weight: bold
  text-decoration: none
  "&:hover":
    text-decoration: underline
```

**SCSS:**
```scss
h1 {
  font-size: 24px;
  font-weight: bold;
  color: green;
  &:hover {
    color: blue;
  }
}
.class {
  color: red;
  font-size: 16px;
  font-weight: bold;
  text-decoration: underline;
  &:before {
    color: blue;
  }
}
#id {
  color: blue;
  font-weight: bold;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}
```

**CSS:**
```css
h1 {
  font-size: 24px;
  font-weight: bold;
  color: green;
}
h1:hover {
  color: blue;
}

.class {
  color: red;
  font-size: 16px;
  font-weight: bold;
  text-decoration: underline;
}
.class:before {
  color: blue;
}

#id {
  color: blue;
  font-weight: bold;
  text-decoration: none;
}
#id:hover {
  text-decoration: underline;
}
```

### 5. Support for CSS @ Rules (e.g. @supports, @media ...etc)
Supported tags are 'media', 'font-face', 'keyframes', 'supports', 'document', 'page', 'namespace'

**YAML:**
```yaml
supports (display:grid):
  .grid-container:
    display: grid
```

**CSS/SCSS:**
```scss
@supports (display: grid) {
  .grid-container {
    display: grid;
  }
}
```
### 6. The @use Sass rule
**YAML:**
```yaml
use:
  - sass:map
  - m: sass:math
```

**SCSS**
```scss
@use 'sass:map';
@use 'sass:math' as m;
```

### 7. Nested Selector with Mixin (nav ul li a)

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
**CSS:**
``` css
nav ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
nav ul li {
  display: inline-block;
  padding: 10px;
  border-radius: 9999px;
}
nav ul li a {
  text-decoration: none;
  color: #3498db;
  padding: 10px;
  border: 1px solid #3498db;
}
```
### 8. Extend Selector - Inheritance (.nav-item)

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

**CSS:**
```css
/* Doesn't scale well!! */

.nav-item {
  background-color: #f5f5f5;
}

.base-style, .nav-item {
  color: #3498db;
  margin: 10px;
}
```

### 9. Looping through Colors (@each)

**YAML:**
```yaml
each $color in $colors:
  .color-#{$color}:
    color: $color

each $color $value in $theme-colors: # With maps
  .text-#{$color}:
    color: $value

```

**SCSS:**
```scss
@each $color in $colors {
  .color-#{$color} {
    color: $color;
  }
}

@each $color, $value in $theme-colors { // With maps
  .text-#{$color} {
    color: $value;
  }
}
```
**CSS:**
```css
.color-red {
  color: "red";
}

.color-green {
  color: "green";
}

.color-blue {
  color: "blue";
}

/* With maps */

.text-primary {
  color: #3498db;
}

.text-secondary {
  color: #2ecc71;
}

.text-danger {
  color: #e74c3c;
}

```
### 14. Conditional Statements (@if, @else if, @else)

**YAML:**
```yaml
if $theme == 'dark':
  body:
    background-color: black
    color: white

elif $theme == 'light':
  body:
    background-color: white
    color: black
else:
  body:
    background-color: green
    color: red
```

**SCSS:**
```scss
@if $theme == 'dark' {
  body {
    background-color: black;
    color: white;
  }
}
@else if $theme == 'light' {
  body {
    background-color: white;
    color: black;
  }
}
@else {
  body {
    background-color: green;
    color: red;
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
**CSS:**
```css
.scss .font-size-1 {
  font-size: "10px";
}
.scss .font-size-2 {
  font-size: "20px";
}
.scss .font-size-3 {
  font-size: "30px";
}
.scss .padding-1 {
  padding: 10px;
}
.scss .padding-2 {
  padding: 20px;
}
.scss .padding-3 {
  padding: 30px;
}
.scss .padding-4 {
  padding: 40px;
}
```
**License:**

MIT License

**Contributing:**

This is my first public repository.

We welcome contributions to this project! Feel free to fork the repository, make changes, and submit pull requests.
