Laradic Support
====================

[![Build Status](https://img.shields.io/travis/laradic/support.svg?branch=master&style=flat-square)](https://travis-ci.org/laradic/support)
[![GitHub Version](https://img.shields.io/github/tag/laradic/support.svg?style=flat-square&label=version)](http://badge.fury.io/gh/laradic%2Fsupport)
[![Code Coverage](https://img.shields.io/badge/coverage-0%-red.svg?style=flat-square)](http://radic.nl:8080/job/laradic-support/cloverphp)
[![Total Downloads](https://img.shields.io/packagist/dt/laradic/support.svg?style=flat-square)](https://packagist.org/packages/laradic/support)
[![License](http://img.shields.io/badge/license-MIT-ff69b4.svg?style=flat-square)](http://radic.mit-license.org)

[![Goto Documentation](http://img.shields.io/badge/goto-docs-orange.svg?style=flat-square)](http://docs.radic.nl/laradic-support)
[![Goto API Documentation](https://img.shields.io/badge/goto-api--docs-orange.svg?style=flat-square)](http://docs.radic.nl/laradic-support/api)
[![Goto Repository](http://img.shields.io/badge/goto-repo-orange.svg?style=flat-square)](https://github.com/laradic/support)

--------------------------
Version 1.2
-----------

**Laravel 5** support package.

[**Check the documentation for all features and options**](http://docs.radic.nl/laradic-support/) (NA yet..)


## Todo
  
- Cleanup
- Tests (String tests are done but located outside of the package)
  
  
## Installation
#### Composer
```JSON
"laradic/support": "~1.2"
```
  
#### Laravel
Note: The `SupportServiceProvider` is only needed if you want to use the Filesystem class trough IoC.
```php
'Laradic\Support\SupportServiceProvider'
```
  
## Overview
#### Classes
| Class | Usage | Description | 
|---|---|---|
| Object | `Object::first(['a', 'b'])` | Object helper functions |
| Number | `Number::paddingLeft(['a', 'b'])` | Number helper functions |
| Arrays | `Arrays::unflatten($arr, '.')` | Array helper functions |
| String | `String::slug('Ha lo')` | Combines Laravel, Underscore and Stringy functions into 1 |
| Path | `Path::join('My', 'New', 'Path')` | Provides utility methods for handling path strings |
| Filesystem | `App::make('files')` <br> `new Filesystem()` | Extra filesystem functions |
| TemplateParser | `new TemplateParser(Filesystem $files, $sourceDir)` | Parse stubs into files |

#### Traits
| Trait | Description | 
|---|---|
| DotArrayAccessTrait | Implements ArrayAccess functionality into a class |
| EventDispatcherTrait | Implements event dispatcher functionality into a class |
| NamespacedItemResolverTrait | Implements namespace functionality into a class |
And some others, TBD.


#### Helpers
Check the `helpers.php` file for an overview

<a name="copyright"></a>
#### Copyright/License
Copyright 2015 [Robin Radic](https://github.com/RobinRadic) - [MIT Licensed](http://radic.mit-license.org)
