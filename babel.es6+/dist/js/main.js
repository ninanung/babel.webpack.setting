"use strict";

var _lib = require("./lib");

console.log(_lib.pi);
console.log((0, _lib.power)(_lib.pi, _lib.pi));
var foo = new _lib.Foo();
console.log(foo.foo());
console.log(foo.bar());