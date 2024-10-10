# shapeof

Find the shape of a JS/TS values easily.

[![Licence](https://img.shields.io/badge/AGPL--3.0_with_additional_terms-olivegreen?style=plastic&label=License&logo=open-source-initiative&logoColor=white&color=olivegreen)](https://github.com/alanrodas/shapeof/blob/main/LICENSE) [![Version](https://img.shields.io/github/package-json/v/alanrodas/shapeof?style=plastic&label=Version&logo=git-lfs&logoColor=white&color=crimson)](https://www.npmjs.com/package/@alanrodas/shapeof)

[![API Docs](https://img.shields.io/github/package-json/homepage/alanrodas/shapeof?color=blue&label=API%20Docs&logo=gitbook&logoColor=white&style=plastic)](https://alanrodas.github.io/shapeof)

![GitHub Workflow Tests](https://img.shields.io/github/actions/workflow/status/alanrodas/shapeof/on-commit-test.yml?style=plastic&label=Tests&logo=github-actions&logoColor=white) ![GitHub Workflow Build](https://img.shields.io/github/actions/workflow/status/alanrodas/shapeof/on-commit-build.yml?style=plastic&label=Build&logo=github-actions&logoColor=white)

## Install and use

Install at your project by using **npm**.
```sh
npm install shapeof
```

Then, just import the functions in your project, and start using them.
```ts
import {shapeOf, hasShape} from 'shapeof';

shapeOf(value);
hasShape(value, shape);
```

## What is this?

This is a library for obtaining and checking the runtime **shape** of a a value in JavaScript and TypeScript.

You may think of **shapes** in a similar way as you will think of types, but the concept of **shape** extends the idea of runtime types that JS manages (and that you can obtain through `typeof`). Learn more about **shapes** below.

This module exports two main functions:
* `shapeOf`: Returns the shape of the given value.
* `hasShape`: answers a boolean stating if the given value has the given shape.

Note that `hasShape` ensures a correct check of the **shape hierarchy** so it's more complex than just obtaining the shape with `shapeOf` and comparing, which may not be what you expect.

>> You can read more about the usage of the functions in the next sections.

This library attempts to have small footprint on the code.

As an example, it may be used to check something such as:
```ts
typeof receivedData === 'number' && Number.isInteger(receivedData)
```

into something like:
```ts
shapeOf(receivedData) === 'int'
```
or even better:

```ts
hasShape(receivedData, 'int')
```

Also, when checking complex object shapes:
```ts
obj && obj.a && typeof obj.a === 'string' && obj.b && typeof obj.b === 'number'
```

It allows you to replace it with a more easily understandable code:
```ts
hasShape(obj, { a:'string', b: 'number'})
```

### When should I use it?

This library may be used to perform small checks on values, objects and arrays. It uniformly allows you to perform checks on common elements to check the runtime nature of the value.

It may be used to:
* Validate arguments passed to a function, to ensure they are of the correct shape.
* Validate the body or params of a request in a web service.
* Validate objects returned by a library that is not uniform in what it returns.

The small footprint of the library and the fact that it handles common shapes such as `int` or `array` by default in an easy manner makes it quite useful in some scenarios where small checks need to be performed.

### When not to use it?

This library attempts to have small footprint through the default configuration. Yet, more complex checks, may incur in big performance penalties.

Verifying if an array has a complex inner shape, such as:
```ts
hasShape(array, ['int'])
```
involves traversing all the elements of the array, and verifying the type of each element, thus making it possibly slow for really long arrays.

Also verifying a complex object shape, involves traversing the properties of the object, in a recursive manner, thus involving a quite heavy footprint.

Additionally, note that this library does not support objects that may have circular references (and we are not planning to support them).

If you are worried about performance or have object that may have circular checks, you should not use this library.

If you are looking to perform more complex checks, such as if the value is a number in a range, or is a string that complies with an enum value, this library will not suffice either. Maybe you are looking for a JSON validator?

## Shapes and shape hierarchy

A **shape** is a categorization of a value based on the possible usage you are ought to perform on such a value, in the same sense of a type. We use the word **shape** instead of **type** as to not confuse the possible values involves with the ones built into JS.

Shapes may take different forms. A valid shape may be a string representing a "base shape", an array representing an "array shape" or an object representing an "object shape". Additionally, some strings and arrays may represent "union shapes".

The type definition in TypeScript for all shapes is defined as follows:
```ts
type BaseShape = BaseShape | ArrayShape | ObjectShape | UnionShape;
```

### Base shapes

The **shapes** are a bigger categorization than types, and involve all the built-in types in JS as possible values. These are: **boolean**, **number**, **bigint**, **string**, **symbol**, **object**, **undefined** and **function**.

But we add a few more. For better support of numeric values we include the shapes
**int**, **float**, **nan** and **infinity**. The **int** shape represents elements of the `number` type such as `3`, `Number(8)` and even `9.0`. The **infinity** shape is used for both positive and negative infinity, while **nan** is used only for the NaN value. The **float** value is used for all other numbers.

Built-in objects that have special shapes and may be used commonly throughout your code also have specially assigned shapes: **null** (only the null value), **array** (any array), **regexp** (elements that are regular expressions, such as `/a/` or `RegExp('[a-z]'`)), **buffer** (instances created with `Buffer.from`) and **promise** (object created with promise or having a `then` property that is a function in the same shape as a promise).

And finally, objects created out of a constructor other than the built in ones mentioned above will have the shape **instance**.

> There is a special **wrapper** shape. We will discuss this shape later on.

Finally, there is a shape by the name **any**. This is similar to the "any type" concept used in TypeScript. All objects have an "any" shape when asked, so they all unify with **any**.

We call all this shapes "base shapes". They are represented with strings of the aforementioned names.

The type definition in TypeScript for base shapes looks like the following:
```ts
type BaseShape =
    // built-in types
    | 'boolean' | 'number' | 'bigint' | 'string' | 'symbol' | 'object' | 'undefined' | 'function'
    // extended number shapes
    | 'int' | 'float' | 'nan' | 'infinity'
    // extended object shapes
    | 'null' | 'array' | 'regexp' | 'buffer' | 'promise'
    // other instances shape
    | 'instance'
    // the any shape
    | 'any'
    // the optional wrapper shape
    | 'wrapper';
```

These shapes are arranged in a hierarchy, as follows:
```
any
 |
 |- boolean
 |- bigint
 |- string
 |- symbol
 |- undefined
 |- number
 |    |
 |    |- int
 |    |- float
 |    |- nan
 |    |- infinity
 |
 |- object
 |    |
 |    |- null
 |    |- function
 |    |- array
 |    |- regexp
 |    |- buffer
 |    |- promise
 |    |- instance
 |    |- wrapper
```

This particular hierarchy establishes a relationship of "supershapes" and "subshapes". These relationships will be used when unifying types or when attempting to check if an element matches a particular shape.

* **When using `shapeOf`:**
When using `shapeOf`, by default, you will be answered with the most specific base shape your element has. That is, if you ask for the shape of `8`, the shape `'int'` will be returned, and when asked for `/a/`, `'regexp'` will be returned.

* **When using `hasShape`:**
When using `hasShape`, when passed a base shape, you will be answered with `true` only if the shape of the object matches the given shape, or if the given shape is one of the "supershapes" of the object most specific shape. So for example, attempting to check if `7` is an `'int'` will return `true`, as well as attempting to check if it's a `'number'` or an `'any'`. For `{name: 'john'}`, it will return `true` when asked if its an `'object'` or an `'any'`.

In most cases, this shapes will suffice, but there are situations where you may need to know more about a particular shape, specially for shapes that are structured elements, such as arrays or objects. We provide support for working and specifying such shapes in two forms:

### Array shapes

An "array shape" is a type of shape that state that the value is an array, but it also presents information about the internal elements of an array with one single element inside that in itself is a shape. So you can run queries like the following:
```ts
hasShape(value, ['int'])
```

This will return `true` when value is not only an array, but all the internal elements of such array are integer values. You may use any shape in the internal element of the definition, so even arrays that have arrays inside may be represented as `[['regexp']]`.

> Note that verifying or obtaining these shapes is a resource intensive process, so only use such shapes when it's really required.

If an empty array is passed as a shape, then it's considered the same as an array of `'any'` values. In itself, an array of `'any'` values is equivalent to using the base shape `array`, as any array will suffice.

> Note that you may define arrays with more than one shape inside, but when used in that way, the array represents a union type, and not an array at all.

The type definition in TypeScript for base shapes looks like the following:
```ts
type ArrayShape = Shape[];
```

* **When using `shapeOf`:**
By default, `shapeOf` will not return an array shape, but use `'array'` instead. This increases performance as the `shapeOf` function is actually just a few nested ifs. You may require to activate the behavior for obtaining this type of shapes instead of base ones by passing the `useFullObjectShapes` option as `true`. Note that activating this implies traversing the array fully, obtaining all object shapes, and then attempting to unify those shapes. This process is resource intensive, and becomes heavier the longest the array.

* **When using `hasShape`:**
When using `hasShape` using an array shape, two conditions should be met:
    1. The value passed should be an array
    2. The internal elements of the array should match the internal shape of the array shape.
Differently to `shapeOf`, no special option needs to be passed in order to obtain this behavior. But, as you may imagine, the second step is implies that the array needs to be traversed. So keep that in mind when checking for your shapes, and only use array shapes when really required.

### Object shapes

The "object shapes" are a way of specifying the shape of an object, including the properties it has and the shapes of all those properties. An object that represents an object shape may look as follows:
```ts
const objShape = {
    worker_id: 'int',
    name: 'string',
    age: 'int',
    addresses: [{
        street: 'string',
        number: 'int',
        city: 'string'
    }],
}
```

As you can see, the object shape defines a set of properties, on which, the values used are in itself shapes. These shapes may be base shapes, array shapes, or even other object shapes (and union shapes that we will see next).

> Note that verifying or obtaining these shapes is a resource intensive process, so only use such shapes when it's really required.

By default, `shapeOf` will not return this shapes, but you may require to activate the behavior for obtaining this type of shapes instead of base ones.

The type definition in TypeScript for base shapes will look like the following if TS supported recursive types (the internal implementation is a little bit different, but with the same meaning):
```ts
type ObjectShape = Record<string, Shape>;
```


* **When using `shapeOf`:**
By default, `shapeOf` will not return an object shape, but use `'object'` instead. This increases performance as the `shapeOf` function is actually just a few nested ifs. You may require to activate the behavior for obtaining this type of shapes instead of base ones by passing the `useFullObjectShapes` option as `true`. Note that activating this implies recursively obtaining the shape of every property of the object (which may include arrays or other objects as properties, involving additional steps). So, use the feature wisely.

* **When using `hasShape`:**
When using `hasShape` using an object shape, two conditions should be met:
    1. The value passed should be a object that is not a built-in supported one.
    2. The object should have AT LEAST every property declared in the shape, and the values of such properties should match the shape expected in the given object shape.
Differently to `shapeOf`, no special option needs to be passed in order to obtain this behavior. But, as you may imagine, the second step is implies that the object needs to be recursively checked.
As you may note, we say "AT LEASE" which involves that the object `{name: 'john', age: 35}` does have the shape `{name: 'string'}`. You may alter this behavior to perform an exact match, that is so that the object should have "EXACTLY" the shape given, with no less and no more properties. This is achieved by passing the `exactShape` option as `true` to the `hasShape` function.

### Union shapes

For cases where a value may take more than one possible shape, you may use a "union shape". Union shapes can be written as string, if they are the union of base shapes, such as:
```ts
'number | bigint'
```

> Note that the space surrounding the pipe ( | ) is important, and should not be omitted.

or as an array with more than one element, when they are the union of more complex shapes, such as:
```ts
[ {name: 'string', age: 'number'}, 'string' ]
```

* **When using `shapeOf`:**
`shapeOf` will not attempt to identify union shapes, so it will never return one.

* **When using `hasShape`:**
When using `hasShape` using a union shape, the value is checked for any of the shapes used in the union. A value is considered to have the union shape if it has any of the shapes that conform the union.

### Wrapper shape

Both function, `shapeOf` and `hasShape` accept an option by the name `unwrapBaseShapes**. This allows to change the way wrapper objects are treated.
If you don't have any idea what an object wrapper is, you should check [JavaScript data types and data structures at MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures).

Basically, JS will use a primitive value for elements such as numbers or strings, but it will automatically convert the value to an object that wraps it when required, and unwrap it when not. That means that doing something like:
```ts
"Hello".includes('H')
```
will involve this conversion internally, as sending the message `includes` to a primitive value is not possible, and an object is required.

You may obtain a wrapped object manually by using the object wrapper constructor with new:
```ts
new String('hello')
```

But do note that this is considered a bad practice. In most scenarios you will never need such a construction.

So by default, The `unwrapBaseShapes` is `true`, so we treat `new String('hello')` in the same way we treat `'hello'` or `String('hello')`.

This behavior can be altered, so object wrappers are distinguishable from the primitive values. If want this behavior you may set the option `unwrapBaseShapes` as `false`. In this scenario, the type returned will be `'wrapper'`.

The following types are checked for wrapped representations:

| primitive shape   |  wrapped shape     |
|-------------------|--------------------|
| 'boolean'         | Boolean            |
| 'number'	        | Number             |
| 'bigint'	        | BigInt             |
| 'string'	        | String             |
| 'symbol'	        | Symbol             |

We recommend to avoid using the **wrapper** shape for most purposes.


## Function usage

### shapeOf

The signature of the function in TypeScript is as follows:
```ts
function shapeOf(value: any, options?: Partial<ShapeOfOptions>): Shape
```

where:
```ts
interface ShapeOfOptions {
    useFullObjectShapes: boolean;
    unwrapBaseShapes: boolean;
}
```

The `value` parameter is expected to be the element from which to obtain the shape of. This value can be any JavaScript value, including `null` or `undefined`.

The `options` parameter is an object that can alter the behavior of the function. By default the values used are:
```ts
{
    useFullObjectShapes: false,
    unwrapBaseShapes: true
}
```

If you don't pass an object, those defaults will be used. If you pass a partial object, such as `{useFullObjectShapes: true}`, the missing properties will be treated with the default values, and the rest will have your assigned value.

We already discussed in **wrapper objects** section how `unwrapBaseShapes` alters the behavior, so you can access wrapper object distinctly from primitive values.

The option `useFullObjectShapes` determines if the return value will be limited to a **base shape** (when `false`), or if **array shapes** and **object shapes** (when `true`).

Here are some example cases:
```ts
shapeOf(7)                         // 'int'
shapeOf(9.23)                      // 'float'
shapeOf('hello')                   // 'string'
shapeOf(/hello/)                   // 'regexp'
shapeOf(Buffer.from('hello'))      // 'buffer'
shapeOf(new Promise(() => {}))     // 'promise'
shapeOf([1, 7, 9])                 // 'array'
shapeOf({name: 'john', age: 37})   // 'object'
shapeOf(new Number(9.23))          // 'float'
shapeOf(new String('hello'))       // 'string'

// Enabling wrapper type
shapeOf(new Number(9.23), {
    unwrapBaseShapes: false        // 'wrapper'
})
shapeOf(new String('hello'), {
    unwrapBaseShapes: false        // 'wrapper'
})

// Enabling full objects
shapeOf([1, 7, 9], {
    useFullObjectShapes: true      // '['int']'
})
shapeOf({name: 'john', age: 37}, {
     useFullObjectShapes: true     // '{name: 'string', age: 'int'}'
})
```


### hasShape

The signature of the function in TypeScript is as follows:
```ts
function hasShape(value: unknown, shape: Shape, options?: Partial<HasShapeOptions>): boolean
```

where:
```ts
const defaultHasShapeOptions: HasShapeOptions = {
    unwrapBaseShapes: true,
    exactShape: false
};
```

The `value` parameter is expected to be the element from which to check the shape of. This value can be any JavaScript value, including `null` or `undefined`.

The `shape` parameter is the expected shape to check. It can be any shape, such as a base shape, an array shape, and object shape or a union shape.

The `options` parameter is an object that can alter the behavior of the function. By default the values used are:
```ts
{
    unwrapBaseShapes: true,
    exactShape: false
}
```

If you don't pass an object, those defaults will be used. If you pass a partial object, such as `{useFullObjectShapes: true}`, the missing properties will be treated with the default values, and the rest will have your assigned value.

We already discussed in **wrapper objects** section how `unwrapBaseShapes` alters the behavior, so you can access wrapper object distinctly from primitive values.

The option `exactShape` determines if the return value will check that an object passed as value should comply *AT LEAST* with the passed shape. If `false`, then when checking objects, the passed value may have more properties than the properties in the shape defined. If `true`, then when checking objects, the passed value needs to have exactly the same properties defined in the shape. For either case, the properties defined by the value are required to have the shapes defined by the property in the shape.

An important thing to note is that the shape is checked considering the hierarchy. So for example , if the value is `7` and the given shape is `number`, the result will be `true`, even though the actual shape of the value returned by shapeOf is `'int'`.

Here are some example cases:
```ts
// The following are true
hasShape(7, 'int')
hasShape(7, 'number')
hasShape(7, 'any')
hasShape(9.23, 'float')
hasShape(9.23, 'number')
hasShape(9.23, 'any')
hasShape('hello', 'string')
hasShape('hello', 'any')
hasShape(/hello/, 'regexp')
hasShape(/hello/, 'object')
hasShape(/hello/, 'any')
hasShape(Buffer.from('hello'), 'buffer')
hasShape(Buffer.from('hello'), 'object')
hasShape(new Number(9.23), 'float')
hasShape(new Number(9.23), 'number')
hasShape(new Number(9.23), 'any')
hasShape(new String('hello'), 'string')
hasShape(new String('hello'), 'any')
hasShape([1, 7, 9], 'array')
hasShape([1, 7, 9], 'object')
hasShape([1, 7, 9], 'any')
hasShape({name: 'john', age: 37}, 'object')
hasShape({name: 'john', age: 37}, 'any')
hasShape(new Number(9.23), 'wrapper', {unwrapBaseShapes: false})
hasShape(new Number(9.23), 'object', {unwrapBaseShapes: false})
hasShape(new Number(9.23), 'any', {unwrapBaseShapes: false})
hasShape(new String('hello'), 'wrapper', {unwrapBaseShapes: false})
hasShape(new String('hello'), 'object', {unwrapBaseShapes: false})
hasShape(new String('hello'), 'any', {unwrapBaseShapes: false})
hasShape([1, 7, 9], ['int'])
hasShape([1, 7, 9], ['any'])
hasShape({name: 'john', age: 37}, {name: 'string', age: 'int'})
hasShape({name: 'john', age: 37}, {name: 'string', age: 'number'})
hasShape({name: 'john', age: 37}, {name: 'string', age: 'int'})
hasShape({name: 'john', age: 37}, {name: 'string', age: 'number'})
hasShape({name: 'john', age: 37}, {age: 'int'})
hasShape({name: 'john', age: 37}, {name: 'string'})
hasShape({name: 'john', age: 37}, {name: 'string', age: 'int'},
    {exactShape: true})
hasShape({name: 'john', age: 37}, {name: 'string', age: 'number'},
    {exactShape: true})

// The following are false
hasShape(7, 'float')
hasShape(9.23, 'int')
hasShape('hello', 'symbol')
hasShape(new Number(9.23), 'wrapper')
hasShape(new String('hello'), 'wrapper')
hasShape([1, 7, 9], ['bigint'])
hasShape({name: 'john', age: 37}, {name: 'string', age: 'bigint'})
hasShape({name: 'john', age: 37}, {age: 'int'},
    {exactShape: true})
hasShape({name: 'john', age: 37}, {name: 'string'},
    {exactShape: true})
```

## Contributing

If you want to contribute to the project, please raise an issue to discuss the possible changes before including them, and send a pull request of your changes.
