# Types

These are all the types used in the library.

## Table of contents

- [Options](#options)
- [Lang](#lang)
- [GroupCallback](#group-added-callback)
- [OptionAddedCallback](#option-added-callback)
- [ClearedCallback](#cleared-callback)
- [OptionClearedCallback](#option-cleared-callback)
- [SearchCallback](#search-callback)
- [JSSelectEvent](#js-select-event)
- [Countries](#countries)
- [Others](#others)

## Options

These are all the available properties to customize the normal library functionality.

>:memo: By default some classes are form [Bootstrap](https://getbootstrap.com/docs/5.3/forms/select/).

### `multiple`

Sets if is a multiple select.
**Accepts:** `boolean` | `undefined`
**Default Value:** `undefined`

### `showInfo`

Sets if shows info about options list.
**Accepts:** `boolean`
**Default Value:** `true`

### `howInfoPosition`

Sets the position of the info (top or bottom, left or right).
**Accepts:** `string`
**Default Value:** `bottom right`

### `data`

Sets the local options list.
**Accepts:** [`CustomOptionsList`](#custom-option-list) | `undefined`
**Default Value:** `undefined`

### `fetch`

To fetch external options list.
**Accepts:** [`fetchOptions`](#fetch-options) | `undefined`
**Default Value:** `undefined`

### `fromCountries`

Sets the countries as the options list.
**Accepts:** [`fromCountries`](#from-countries) | `undefined`
**Default Value:** `undefined`

### `selectClass`

Class for the select.
**Accepts:** `string`
**Default Value:** `form-select`

### `inputClass`

Additional class for search input.
**Accepts:** `string`

### `optionsContainerClass`

Additional class for the container of the options.
**Accepts:** `string`

### `optionsClass`

Additional class for the options.
**Accepts:** `string`

### `optionsGroupClass`

Additional class for the tittle of the options group.
**Accepts:** `string`

### `openListOnHover`

Shows the options if the select is hover.
**Accepts:** `boolean`
**Default Value:** `false`

### `activeOptionColorDark`

Color of the focused option for dark mode.
**Accepts:** `string`
**Default Value:** `#52525e`

### `activeOptionColorLight`

Color of the focused option for light mode.
**Accepts:** `string`
**Default Value:** `#e0e0e6`

### `groupAddedCallback`

Function triggered after a group of option is added to the options list.
**Accepts:** [`GroupAddedCallback`](#group-added-callback) | `undefined`
**Default Value:** `undefined`

### `optionAddedCallback`

Function triggered after an option is added to the options list.
**Accepts:** [`OptionAddedCallback`](#option-added-callback) | `undefined`
**Default Value:** `undefined`

### `ClearedCallback`

Function triggered after the selected option is cleared.
**Accepts:** [`ClearedCallback`](#cleared-callback) | `undefined`
**Default Value:** `undefined`

### `optionClearedCallback`

Function triggered after an option is cleared in a multiple select.
**Accepts:** [`OptionClearedCallback`](#option-added-callback) | `undefined`
**Default Value:** `undefined`

### `searchCallback`

Function triggered after search an option.
**Accepts:** [`SearchCallback`](#search-callback) | `undefined`
**Default Value:** `undefined`

## Lang

These are all the available properties, the invalid messages from the available validators and some other language related options.

### `locale`

Language and region code.
*For more information see "[BCP 47 language tags](https://www.w3.org/International/articles/language-tags/)".*

### `empty`

Default empty options list message

### `placeholderS`

Default placeholder message (single option)

### `placeholderM`

Default placeholder message (multi option)

### `searchPlaceholder`

Default search placeholder message

### `fetch` {#fetch-message}

Default message for fetch data source

### `noResults`

Default empty option list message

### `loading`

Default loading message

### `noGroup`

Default empty group name

### `info`

Default info message

## GroupAddedCallback {#group-added-callback}

The group added callback function.

**Accepts:** `fn:(group: HTMLDivElement, tittle: HTMLDivElement, optGroupList: OPTGroupList, custom: CustomSelect, target: HTMLSelectElement, options: Options)`

- `group`: the options group element.
- `tittle`: the tittle element of the group.
- `optGroupList` the options group object.
- `custom`: the JSSelect object.
- `target`: the target select element.
- `options`: the JSSelect options.

**Returns:** `void`

## OptionAddedCallback {#option-added-callback}

The option added callback function.

**Accepts:** `fn:(option: HTMLDivElement, optionsList: OptionList, custom: CustomSelect, target: HTMLSelectElement, options: Options)`

- `option`: the option element.
- `optionsList` the option object.
- `custom`: the JSSelect object.
- `target`: the target select element.
- `options`: the JSSelect options.

**Returns:** `void`

## ClearedCallback {#cleared-callback}

The clear selected callback function  (if [multiple](#multiple) is `false`).

**Accepts:** `fn:(custom: CustomSelect, target: HTMLSelectElement, options: Options)`

- `custom`: the JSSelect object.
- `target`: the target select element.
- `options`: the JSSelect options.

**Returns:** `void`

## OptionClearedCallback {#option-cleared-callback}

The option cleared callback function (if [multiple](#multiple) is `true`).

**Accepts:** `fn:(option: HTMLDivElement, optionsList: OptionList, custom: CustomSelect, target: HTMLSelectElement, options: Options)`

- `option`: the option element.
- `optionsList` the option object.
- `custom`: the JSSelect object.
- `target`: the target select element.
- `options`: the JSSelect options.

**Returns:** `void`

## SearchCallback {#search-callback}

The search callback function.

**Accepts:** `fn:(value: string, filtered: CustomOptionsList, custom: CustomSelect, target: HTMLSelectElement, options: Options)`

- `value`: the searched value.
- `filtered` the filtered list of options.
- `custom`: the JSSelect object.
- `target`: the target select element.
- `options`: the JSSelect options.

**Returns:** `void`

## JSSelectEvent {#js-select-event}

The JSSelect event function.

**Accepts:** `fn:(custom: CustomSelect, option: OptionList)`

- `custom`: the JSSelect object.
- `option`: the JSSelect options list.

Returns: `void`

## Countries

>:memo: In the code this type is called iso3166.

These are all the available properties of the country list info.
>**This list in based on the ISO 3166 standard and no other countries or territories will be added.**

### `CTname`

ISO 3166 Country/Territory name.
**Accepts:** `string`

### `Capital`

Capital name.
**Accepts:** `string`

### `Continent`

Continent name.
**Accepts:** `string`

### `ONU`

ONU affiliation.
**Accepts:** `string`

### `3166-1a2`

ISO 3166-1 alpha 2 tag.
**Accepts:** `string`

### `3166-2a3`

ISO 3166-2 alpha3 tag.
**Accepts:** `string`

### `3166-3`

ISO 3166-3 tag.
**Accepts:** `string`

### `Flag`

Unicode flag code as HTML entity.
**Accepts:** `string`
**Example**
The Ecuador Flag: &#x1F1EA;&#x1F1E8;
`U+1F1EA U+1F1E8` &rarr; `&#x1F1EA;&#x1F1E8;`

### `Currency`

ISO 4217 currency name.
**Accepts:** `string`

### `ISO4217`

ISO 4217 currency tag.
**Accepts:** `string`

## Others

### `OptionList`

The single option structure.

#### `text`

The value to show.
**Accepts:** `string`

#### `value`

The value to return.
**Accepts:** `string`

---

### `OPTGroupList`

The option group structure.

#### `title`

The tittle of the group.
**Accepts:** `string`

#### `options`

The options list.
**Accepts:** `OptionList[]`

---

### `CustomOptionsList` {#custom-option-list}

The options list of the custom select.

#### `option_list`

The list of options groups and/or options.
**Accepts:** `(OptionList | OPTGroupList)[]`

#### `options` {#c-options}

The total of options.
**Accepts:** `number`

#### `groups`

The total of groups.
**Accepts:** `number`

---

### `CustomSelect`

The custom select elements.

#### `container`

The main container element.
**Accepts:** [`HTMLDivElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDivElement)

#### `select`

The select equivalent element.
**Accepts:** [`HTMLDivElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDivElement)

#### `value` {#value-element}

The value container element.
**Accepts:** [`HTMLDivElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDivElement)

#### `clear`

The clear element.
**Accepts:** [`HTMLDivElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDivElement)

#### `dropdown`

The dropdown container element.
**Accepts:** [`HTMLDivElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDivElement)

#### `search_container`

The search container element.
**Accepts:** [`HTMLDivElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDivElement)

#### `input` {#input-search}

The search element.
**Accepts:** [`HTMLInputElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement)

#### `label`

The label of the input element.
**Accepts:** [`HTMLLabelElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement)

#### `options_container`

The container of the options groups and/or options.
**Accepts:** [`HTMLDivElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDivElement)

#### `info` {#info-container}

The info message container.
**Accepts:** [`HTMLDivElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDivElement)

#### `loading` {#loading-element}

The loading data element.
**Accepts:** [`HTMLDivElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDivElement)

#### `backdrop`

The backdrop element.
**Accepts:** [`HTMLDivElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDivElement)

---

### `fetchOptions` {#fetch-options}

The options to fetch data.

#### `input`

The url to fetch the data.
**Accepts:** [`URL`](https://developer.mozilla.org/en-US/docs/Web/API/URL) | `string`

#### `body`

An object with data to send in the fetch request
**Accepts:** `object`
**Default Value:**: `{}`
*Always overrides the body of the init property.*

#### `initialCount`

The initial number of options to show.
**Accepts:** `number`
**Default Value:** `0`

#### `init`

Additional options of the fetch function (method, headers, ...).
**Accepts:** [`RequestInit`](https://developer.mozilla.org/en-US/docs/Web/API/RequestInit) | `undefined`
**Default Value:** `undefined`

---

### `fromCountries` {#from-countries}

#### `countries`

Countries source.
**Accepts:** `iso3166[]` | `undefined`
**Default Value:** `undefined`
*If its value is `undefined`, the world_en list is used instead.*

#### `options` {#fc-options}

Additional options to modify the returned options list*/
**Accepts:** [`countriesOptions`](#countriesoptions) | `undefined`
**Default Value:** `undefined`

---

### `countriesOptions`

These are all the available options to set countries as data source of the custom select.

#### `group`

Sets the name of the property to group the options.
**Accepts:** `undefined` | `string`(ONU, Continent, Currency)
**Default Value:** `undefined`
*If its value is `undefined`, the list will have no groups.*

#### `text` {#text-from-countries}

Sets the name of the property to show its value in the option.
**Accepts:** `undefined` | `string` | `fn(countries: iso3166) => string`
**Default Value:** `undefined`
*If its value is `undefined`, the property [`CTname`](#ctname) is used instead.*

#### `value` {#value-from-countries}

Sets the name of the property to use its value as the returned value of the option.
**Accepts:** `undefined` | `string`
**Default Value:** `undefined`
*If its value is `undefined`, the property [`CTname`](#ctname) is used instead.*

#### `condition`

Function to determine whether the country should be added.
**Accepts:** `undefined` | `fn(countries: iso3166) => string`
**Default Value:** `undefined`
*If its value is `undefined`, the list will include all the countries/territories.*
