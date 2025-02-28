# JSSelect

[![JavaScript](https://img.shields.io/badge/JavaScript-%23F7DF1E?logo=javascript&logoColor=%23000)](https://developer.mozilla.org/en-US/docs/Web/JavaScript) [![TypeScript](https://img.shields.io/badge/TypeScript-%233178C6?logo=typescript&logoColor=%23fff)](https://www.typescriptlang.org) [![Sass](https://img.shields.io/badge/Sass-%23CC6699?logo=sass&logoColor=%23fff)](https://sass-lang.com) [![CSS](https://img.shields.io/badge/CSS-%231572B6?logo=css3&logoColor=%23fff)](https://developer.mozilla.org/en-US/docs/Web/CSS) [![Gulp](https://img.shields.io/badge/Gulp-%23CF4647?logo=gulp&logoColor=%23fff)](https://gulpjs.com/) [![Babel](https://img.shields.io/badge/Babel-%23F9DC3E?logo=babel&logoColor=%23000)](https://babeljs.io) [![NPM](https://img.shields.io/badge/NPM-%23CB3837?logo=npm)](https://www.npmjs.com) [![standard-readme compliant](https://img.shields.io/badge/readme%20style%20standard-brightgreen)](https://github.com/RichardLitt/standard-readme) [![contributor covenant code of conduct](https://img.shields.io/badge/contributor_covenant-9f16c3)](https://github.com/RichardLitt/standard-readme) [![Keep a Changelog v1.1.0 badge](https://img.shields.io/badge/Keep%20a%20Changelog%20v1.1.0-%23E05735)](./CHANGELOG.md)  [![MIT LiCENSE](https://img.shields.io/badge/MIT%20License-blue.svg?style=flat)](/LICENSE)

A JavaScript library to replace the default HTML select control.

Works like the default select control but with useful features and customization options. It is written in TypeScript, compiled in UMD format and includes minimal CSS styles to ensure compatibility with any CSS framework.

Features:

- Linked change events.
- Search field to filter options.
- Clear value button.
- Data source form object.
- Fetch data source.
- Dark and light theme compatible.

## Table of Contents

- [Background](#background)
- [Install](#install)
- [Usage](#usage)
- [Security](#security)
- [API](#api)
- [Contributing](#contributing)
- [License](#license)

## Background

This library is inspired by the project [Select2](https://github.com/select2/select2).

## Install

It is recommended to use a package manager to include it in your project, or you can also include it in the head of your HTML via a CDN or downloading the compiled files from a [release](https://github.com/jama95/JSSelect/releases).

### Via package manager

```bash
npm install js-select
```

### Via CDN or Release

```html
<link href="https://cdn.jsdelivr.net/npm/js-select/dist/css/JSSelect.min.css" rel="stylesheet" type="text/css">
<script src="https://cdn.jsdelivr.net/npm/js-select/dist/js/JSSelect.min.js" type="text/javascript"></script>
<!-- (optional) if you want to use the country list info -->
<script src="https://cdn.jsdelivr.net/npm/js-select/dist/js/lang/countries.min.js" type="text/javascript"></script>
<!-- (optional) if you want to use a translation -->
<script src="https://cdn.jsdelivr.net/npm/js-select/dist/js/lang/es_EC.min.js" type="text/javascript"></script>
```

If you want to download a version, add the file references as shown above by replacing the href and src values with the appropriate file paths.

>:memo:The translations already includes the country list info.

## Usage

To use JSSelect you should to use the root function and assign it to a variable or constant.

```javascript
const cs = JSSelect("mySelect");
cs.init();
```

Read more about its use in [examples](./examples).

Check the [FAQ](./FAQ.md) if you have a question, you can also view the existing [discussions](https://github.com/jama95/JSSelect/discussions/categories/q-a), if there is none related to your question, you can start a [new discussion](https://github.com/jama95/JSSelect/discussions/new?category=q-a) to ask the community.

>:memo:Remember to choose the Q&A category if you want to ask questions to the community through a discussion.

## Security

Reliable references have been used to ensure the reliability of the information used.

Read more about in [SECURITY.md](./SECURITY.md)

## API

### Types

The most important types of the library are `options` and `lang`, because they allow you to customize the functionality of the library.

`Options`: Where all the options for modifying the basic operation of the library are listed.

`Lang`: Where all language-related options are listed.

>:warning:Knowing the types is important if you want to contribute to the code.

Read more about these and other types in [docs](./docs/types.md).

### Functions

The main functions of the library are `JSSelect` `init`.

`JSSelect`: The root function, all the other functions need it to work.

`init`: The function to initialize the library.

Read more about these and other functions in [docs](./docs/functions.md).

## Contributing

Read about how to contribute, [here](./CONTRIBUTING.md).

Donations are welcome🙂.

[![PayPal Donate](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.me/jama95)

## License

JSSelect is freely distributable under the terms of the [MIT License](https://spdx.org/licenses/MIT.html).

See the license file [here](/LICENSE).
