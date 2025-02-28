# Contributing guide

Thank you to contribute in this project! Any contributions you make will be mentioned.

Please be sure to adhere to our [Code of Conduct](/CODE_OF_CONDUCT).

## Table of Contents

- [Discussions](#discussions)
- [Issues](#issues)
- [Make changes](#make-changes)
  - [Make changes in the code](#make-changes-in-the-code)
  - [Make changes in the docs](#make-changes-in-the-docs)
- [External contribution](#external-contribution)

Writing code is not the only way to contribute; you can also report bugs, answer community questions, and suggest new features or improvements.

>**Remember:**
If you have any questions, do not be afraid to ask. Asking questions to the community is also a way to contribute.

## Discussions

A great way to interact with the community.

### When to use discussions?

If you have questions about how to use or suggestions for new features or improvements.
If you have a problem with the functionality and you are not sure if it is a bug or not.
>*In this case, if the conclusion of the community is that it is an unreported bug, please report it in [issues](https://github.com/jama95/JSSelect/issues/new).*

### Create a discussion

You should always check to see if a related [discussion](https://github.com/jama95/JSSelect/discussions) already exists before starting a [new one](https://github.com/jama95/JSSelect/discussions/new/choose).

>:warning:Select the correct category and always set an appropriate label.

## Issues

The only and the best way to report a bug.

### When to use issues?

If you are absolutely sure that you have found a bug in the code or an error in the docs.

### Create an issue

You should always check to see if a related [issue](https://github.com/jama95/JSSelect/issues) already exists before opening a [new one](https://github.com/jama95/JSSelect/issues/new/choose).

>:memo:Always set an appropriate label.

### Solve an issue

As a general rule, issues are not assigned to anyone, so you are free to search an existing issue that interest you and solve it.

## Make changes

To make any changes in any file, you must follow these steps:

1. Fork the repository.
2. Clones your fork.
3. Installs the project.
4. Create a working branch.
5. Commit and push the changes.
6. Creates a pull request to `dev branch`.

Every pull request should be related to an issue or discussion, otherwise it will be rejected.

If it is related to a discussion, it must be approved in advance.

>:memo:You must create a branch for each issue or discussion.
>:warning:Any pull request to the master branch will be rejected.

### Make changes in the code

When you make changes in the code, there are a few considerations you should always keep in mind:

- If you add a function, you must document it using JSDoc (in english).
- Be sure to maintain low [cognitive complexity](https://rules.sonarsource.com/typescript/RSPEC-3776/) in the code.
- Do not add inline comments.

>:bulb:*You can use the existing code as an example.*

#### Translations

- The filename must match the value of its [`locale`](./docs/types.md#locale) property (using a underscore instead of a hyphen).
- All translation files must be located in the [lang folder](./src/ts/lang/).
- Always must include a translation for the country list.
- Must include only the default properties.

>:warning:All translations must be done according to the default values (English).

### Make changes in the docs

Any change to the documentation files is considered an improvement, so you must [create a discussion](#create-a-discussion) first and wait for it to be approved.

## External contribution

Feel free to fork and make your own builds.

Any external contribution can be mentioned in the acknowledgements section of the README, if desired.

>:memo:Do not forget to mention this repository in your own.
  