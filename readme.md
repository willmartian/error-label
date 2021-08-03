![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

# `<error-label>`

_Simple, declarative, accessible error labeling._

```html
<form>
  <label for="email-input">Email</label>
  <input id="email-input" type="email">
  <error-label for="email-input" type="typeMismatch">Not a valid email.</error-label>
</form>
```

Form validation with descriptive error messages is an annoying task that is [necessary](https://www.nngroup.com/articles/visibility-system-status/) in almost _every_ web development project.

The `<error-label>` custom element builds off of the browser's default `<label>` element and [Constraint Validation API](https://developer.mozilla.org/en-US/docs/Web/API/Constraint_validation) to take the effort out of this common task, allowing developers to stay [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself). 

[**Live Demo on Codepen**](https://codepen.io/willmartian/pen/BaRYvRy)

**The guiding philosopy of this project is that good error labels should require little to no custom JavaScript.**

- [Features](#features)
  - [Default Errors](#default-errors)
  - [Custom Error Messages](#custorm-error-messages)
  - [Custom Error Types](#custrom-error-types)
  - [Error Groups](#error-groups)
  - [Styling](#styling)
- [Using this component](#using-this-component)
  - [Licenses](#licenses)

## Features
### Overview 

The `<error-label>` custom element works much like the default `<label>` element. Error labels are linked to inputs using the `for` attribute: `<error-label for="inputId"></error-label>`

However, error labels are not displayed to the user by default. They are only visible if the error designated in the `type` attribute has occured: `<error-label for="inputId" type="errorId"></error-label>`

### Default Errors
Without providing any [custom errors](), the `<error-label>` component will support all of the default errors defined by the [Constraint Validation API](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState#properties):

- `badInput`
- `patternMismatch`
- `rangeOverflow`
- `rangeUnderflow`
- `stepMismatch`
- `tooLong`
- `tooShort`
- `typeMismatch`
- `valid`
- `valueMissing`

#### Example
```html
<form>
  <label for="password-input">Password</label>
  <input id="password-input" type="password" minlength="6">
  <error-label for="password-input" type="tooShort">Your password must be at least 6 characters long.</error-label>
</form>
```

### Custom Error Messages

You can provide any custom message or HTML inside of an `<error-label>`. 

In addition to this, you can also use the `{{value}}` variable to access the raw user input value, or the `{{length}}` variable to access its length. 

#### Example
```html
<form>
  <label for="num-input">Enter a number</label>
  <input id="num-input" type="number">
  <error-label for="num-input" type="badInput">{{value}} is not a number.</error-label>
</form>
```

### Custom Error Types

You can also provide your own custom error types by providing a config object to the parent `<form>` element's `data-error-config` attribute.
```html
<form data-error-config="errorLabelConfig">
  <label for="name-input">Name</label>
  <input id="name-input">
  <error-label for="name-input" type="badLang">Please don't say that.</error-label>
</form>

<script>
errorLabelConfig = {
  errors: {
    'badLang': target => target.value.includes('butt'),
  }
} 
</script>
```
Custom errors are added to the config objects `error` property. Custom errors are represented as functions that return a boolean value, where a truthy return value indicates the error is present.

Returning a non-empty string will use it as the default message for that error:
```html
<form data-error-config="errorLabelConfig">
  <label for="name-input">Name</label>
  <input id="name-input">
  <error-label for="name-input" type="badLang"></error-label>
</form>

<script>
errorLabelConfig = {
  errors: {
    'badLang': target => target.value.includes('butt') ? `Please don't say ${target.value}.` : false,
  }
} 
</script>
```

### Error Groups

Error labels can also be grouped together to avoid repetition. Attributes defined on the group will be inherited by the error labels within.

```html
<label for="email-input2">Error-Group Email</label>
<input id="email-input2" minlength="5" type="email">
<error-label-group for="email-input2">
  <error-label type="typeMismatch">Not a valid email.</error-label>
  <error-label type="tooShort">Way too short buddy!</error-label>
</error-label-group>
```

#### Templates

Error groups can also copy content from `<template>` elements, to allow for reusable default messages.

```html
<template id="default-errors">
  <error-label type="typeMismatch">Not a valid email.</error-label>
  <error-label type="tooShort">Way too short!</error-label>
</template>
```

```html
<error-label-group template="default-errors" for="email-input"></error-label-group>
```

### Styling

Error labels and groups can be styled using plain CSS:
```html
<style>
  error-label {
    color: red;
    display: block;
    margin: .5em;
    margin-top: 1em;
  }

  error-label:not([hidden])::before {
    content: '* '
  }

  error-label-group {
    display: block;
  }
</style>
```

## Using this component

Include the following at the top of your HTML file:

```html
<script type="module" src="https://unpkg.com/error-label/dist/error-label/error-label.esm.js"></script>
```

### Licenses

#### Community License

https://www.gnu.org/licenses/gpl-3.0.en.html

#### Enterprise License

A more permissive enterprise license is also available. Please direct all related inquiries [here.](https://willmartian.com/contact)
