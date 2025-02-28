# Functions examples

The examples use the Bootstrap CSS classes and the default options.

## Table of contents

- [JSSelect](#js-select)
- [init](#init)
- [setStyles](#set-styles)
- [darkTheme](#dark-theme)
- [lightTheme](#light-theme)
- [autoTheme](#auto-theme)
- [initialTheme](#initial-theme)
- [value](#value)
- [clear](#clear)
- [optionSelect](#option-select)
- [addEventListener](#add-event-listener)
- [search](#search)
- [open](#open)
- [close](#close)

### JSSelect {#js-select}

Read more about the function and its parameters [here](/docs/functions.md#js-select).

```javascript
/* To use the default options and lang. */
JSSelect("my-select");

/* To use the default options and a custom lang. */
JSSelect("my-select", {}, es_EC);
/* NOTE: Works only if a constant of language is declared, before this call.  */

/* To use custom options */
JSSelect("my-select", { selectClass: "myClass" });
```

### init

Read more about the function and its parameters [here](/docs/functions.md#init).

```javascript
/* To init the library with the specified options. */
JSSelect("my-select").init();
/* or */
const cs = JSSelect("my-select")
cs.init();
```

### setStyles {#set-styles}

Read more about the function and its parameters [here](/docs/functions.md#set-styles).

```javascript
const cs = JSSelect("my-select");
cs.init();
cs.setStyles("myStyle1 myStyle2 myStyle3");
```

### darkTheme {#dark-theme}

Read more about the function and its parameters [here](/docs/functions.md#dark-theme).

```javascript
const cs = JSSelect("my-select");
cs.init();
cs.darkTheme();
```

### lightTheme {#light-theme}

Read more about the function and its parameters [here](/docs/functions.md#light-theme).

```javascript
const cs = JSSelect("my-select");
cs.init();
cs.lightTheme();
```

### autoTheme {#auto-theme}

Read more about the function and its parameters [here](/docs/functions.md#auto-theme).

```javascript
const cs = JSSelect("my-select");
cs.init();
cs.lightTheme();
```

### initialTheme {#initial-theme}

Read more about the function and its parameters [here](/docs/functions.md#initial-theme).

```javascript
const cs = JSSelect("my-select");
cs.init();
cs.initialTheme("dark");
```

### value

Read more about the function and its parameters [here](/docs/functions.md#value).

```javascript
const cs = JSSelect("my-select");
cs.init();
const value = cs.value();
```

### clear

Read more about the function and its parameters [here](/docs/functions.md#clear).

```javascript
const cs = JSSelect("my-select");
cs.init();
/* Clear all the selected options */
cs.clear();
/* Clear the specified options (if exist) */
cs.clear(1);
```

### optionSelect {#option-select}

Read more about the function and its parameters [here](/docs/functions.md#option-select).

```javascript
const cs = JSSelect("my-select");
cs.init();
/* Select the specified options (if exist) */
cs.optionSelect(1);
```

### addEventListener {#add-event-listener}

Read more about the function and its parameters [here](/docs/functions.md#add-event-listener).

```javascript
const cs = JSSelect("my-select");
cs.init();
cs.addEventListener("change", function(custom, options) {
  if
});
```

### search

Read more about the function and its parameters [here](/docs/functions.md#search).

```javascript
const cs = JSSelect("my-select");
cs.init();
cs.search("something");
```

### open

Read more about the function and its parameters [here](/docs/functions.md#open).

```javascript
const cs = JSSelect("my-select");
cs.init();
cs.open();
```

### close

Read more about the function and its parameters [here](/docs/functions.md#close).

```javascript
const cs = JSSelect("my-select");
cs.init();
cs.close();
```
