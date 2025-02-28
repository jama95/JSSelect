# Functions

These are all the public functions of the library.
Read more about the types present in the functions, [here](./types.md).

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

## `JSSelect(select: string, opt?: Options, lang?: Lang)` {#js-select}

Sets the configuration of options and language.

`select`: the select element id.

`options`: the select options.

`lang`: the language messages.
Language options expand or overwrite the default language.
*The default language is english.*

>:memo:If no options or lang are specified, the defaults will be used instead.

Examples are available [here](/examples/functions.md#js-select).

## `init()` {#init}

Initialize the library.

Examples are available [here](/examples/functions.md#init).

## `setStyles(classes?: string)` {#set-styles}

Sets additional styles to the custom select.

`classes`: a white spaced list of CSS classes.

>:memo:If no classes are specified the function just recalculate some the element styles.

Examples are available [here](/examples/functions.md#set-styles).

## `darkTheme()` {#dark-theme}

Sets the dark theme styles.

Examples are available [here](/examples/functions.md#dark-theme).

## `lightTheme()` {#light-theme}

Sets the light theme styles.

Examples are available [here](/examples/functions.md#light-theme).

## `autoTheme()` {#auto-theme}

Sets the theme dark or light styles automatically.

Examples are available [here](/examples/functions.md#auto-theme).

## `initialTheme(theme: string)` {#initial-theme}

Sets the initial theme.

`theme`: the initial theme (dark, light, auto).

Examples are available [here](/examples/functions.md#initial-theme).

>:warning:The default theme of the library is `auto` and it is not necessary to use this function to set it.

## `value()` {#value}

Return the selected option(s) value(s).

>:memo:Returns a stringify array if it is a multiple select.

Examples are available [here](/examples/functions.md#value).

## `clear(index?: number)` {#clear}

Clear all or the specified selected option.

`index`: the index of the selected option(s).
*The index value is ignored if the select is not set as multiple.*
*If the select is set as multiple and index is not specified, clear all the options.*

Examples are available [here](/examples/functions.md#clear).

## `optionSelect(index: number)` {#option-select}

Select the option corresponding to the indicated index.

`index`: the index of the option to be selected.

>:memo:Return undefined if the index is not found.

Examples are available [here](/examples/functions.md#option-select).

## `addEventListener(event: string, fn: JSSelectEvent)` {#add-event-listener}

Add an eventListener to the change event of the custom select control.

`event`: the event name (change).
*The `change` event is the only valid.*

`fn`: the event function.
*See [JSSelectEvent](/docs//types.md#js-select-event) for details about the parameters.*

Examples are available [here](/examples/functions.md#add-event-listener).

## `search(value: string)` {#search}

Search the specified value in the list of options.

`value`: the value to search.

Examples are available [here](/examples/functions.md#search).

## `open()` {#open}

Opens the dropdown options list.

Examples are available [here](/examples/functions.md#open).

## `close()` {#close}

Closes the dropdown options list.

Examples are available [here](/examples/functions.md#close).
