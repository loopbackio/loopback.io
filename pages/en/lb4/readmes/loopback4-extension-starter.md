# loopback4-extension-starter

**This repository has been deprecated. See [Examples and tutorials](http://loopback.io/doc/en/lb4/Examples-and-tutorials.html) for the list of actively maintained examples.**
 
## Summary
A quick starting point for LoopBack 4 Extension developers.

## Overview
LoopBack 4 is built to be extensible from the ground up. As such, extension developers can write various kinds of extensions. This starter repository is meant to be a starting point for your own extensions. This extension starter project will provide you with the recommended project layout, simple examples you can build upon, configuration and more.

Some of the extensions supported by LoopBack 4 are:

### Components
Components provide a way for extensions to package their *Providers* to their Dependency Keys for ease of use by Application Developers.

### Controllers
Controllers are responsible for handling endpoints for different transport protocols such as REST / GRPC.

### Decorators
Decorators are functions which are capable of providing annotations for class methods and arguments. Decorators generally take the form `@decorator`. _Annotations are hints given to a method at runtime to change certain behavior._

### Mixins
LoopBack 4 supports mixins at the `Application` level. Mixins allow you to add new methods, modify or override existing methods. 

### Providers
A Provider is a class which provides a `value()` function that is called by `Context` when an entity requests the value to be injected. 

### Repositories
A Repository provides an interface for interacting with a database.

## Installation
Get started by either downloading this project or cloning it as follows:

`git clone https://github.com/strongloop/loopback4-extension-starter.git`

## Basic Usage
An extension can be made using just one of the various extension types but most complex extensions will involve multiple extension types working together. 

After you have a copy of the `loopback4-extension-starter` you can modify it as needed to create your own extension by understand each extension type by reading about it and understanding it's starter example. 

### Project Layout

#### `src/`
This directory contains all your extension's source code. This is where you should be working to create your extension. It has a top level `index.ts` for exporting all other files, `keys.ts` for defining your binding keys and constants, `types.ts` for defining your types and interfaces. 

Each of the different extension types also contains a corresponding directory to keep your extension organized. 

#### `test/`
This directory contains directories for different kinds of tests for your extension, namely `acceptance`, `integration`, and `unit`. The directory struture inside each of those should be similar to the `src/` directory. 

#### Other files
You'll want to update the following files as needed for your extension:

- `CODEOWNDERS` - Update it to include your information
- `LICENSE` - Default is MIT. Update as needed
- `package.json` - Update project name, description, author, git url, etc.
- Any config files such as `.gitignore`, `.prettierrc`, `tsconfig`, etc.

## Related Resources
- _Coming Soon_ - Writing Extensions for LoopBack 4

## Contributions
- [Guidelines](https://github.com/strongloop/loopback-next/wiki/Contributing#guidelines)
- [Join the team](https://github.com/strongloop/loopback-next/issues/110)

## Tests
run `npm test` from the root folder.

## Contributors
See [all contributors](https://github.com/strongloop/loopback-next/graphs/contributors).

## License
MIT
