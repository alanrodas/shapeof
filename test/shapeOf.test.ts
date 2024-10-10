/**
 * @author Alan Rodas Bonjour <alanrodas@gmail.com>
 */

import { describe, expect, describe as given, it, describe as when, describe as withInput } from '@jest/globals';

import { shapeOf, ShapeOfOptions } from '../src/index';

class CustomClass {
    a: number;
    constructor(a: number) {
        this.a = a;
    }
}

const testBasicShapesWithOptions = (options?: Partial<ShapeOfOptions>) => {
    // Primitive types
    withInput('a bigint', () => {
        const result = 'bigint';
        it(`returns "${result}"`, () => {
            expect(shapeOf(0n, options)).toBe(result);
            expect(shapeOf(10n, options)).toBe(result);
            expect(shapeOf(1000000000n, options)).toBe(result);
            expect(shapeOf(-10n, options)).toBe(result);
            expect(shapeOf(-100000000n, options)).toBe(result);
            expect(shapeOf(BigInt(0), options)).toBe(result);
            expect(shapeOf(BigInt(10), options)).toBe(result);
            expect(shapeOf(BigInt(1000000000), options)).toBe(result);
            expect(shapeOf(BigInt(-10), options)).toBe(result);
            expect(shapeOf(BigInt(-100000000), options)).toBe(result);
        });
    });
    withInput('a boolean', () => {
        const result = 'boolean';
        it(`returns "${result}"`, () => {
            expect(shapeOf(true, options)).toBe(result);
            expect(shapeOf(false, options)).toBe(result);
            expect(shapeOf(Boolean(true), options)).toBe(result);
            expect(shapeOf(Boolean(false), options)).toBe(result);
        });
    });
    withInput('undefined', () => {
        const result = 'undefined';
        it(`returns "${result}"`, () => {
            expect(shapeOf(undefined, options)).toBe(result);
        });
    });
    withInput('a symbol', () => {
        const result = 'symbol';
        it(`returns "${result}"`, () => {
            expect(shapeOf(Symbol('hello'), options)).toBe(result);
            expect(shapeOf(Symbol('bye'), options)).toBe(result);
        });
    });
    withInput('a string', () => {
        const result = 'string';
        it(`returns "${result}"`, () => {
            expect(shapeOf('hello', options)).toBe(result);
            expect(shapeOf('bye', options)).toBe(result);
            expect(shapeOf('', options)).toBe(result);
            expect(shapeOf('a long string', options)).toBe(result);
            expect(shapeOf(String('hello'), options)).toBe(result);
            expect(shapeOf(String('bye'), options)).toBe(result);
            expect(shapeOf(String(''), options)).toBe(result);
            expect(shapeOf(String('a long string'), options)).toBe(result);
        });
    });
    withInput('a function', () => {
        const result = 'function';
        it(`returns "${result}"`, () => {
            expect(shapeOf(() => {}, options)).toBe(result);
            expect(shapeOf(function() {}, options)).toBe(result);
            expect(shapeOf((a: number, b: number) => a + b, options)).toBe(result);
            expect(shapeOf(function (a: number, b: number) {return a + b;}, options)).toBe(result);
        });
    });

    // Numbers
    withInput('a number', () => {
        when('the withInput number is an int', () => {
            const result = 'int';
            it(`returns "${result}"`, () => {
                expect(shapeOf(0, options)).toBe(result);
                expect(shapeOf(10, options)).toBe(result);
                expect(shapeOf(1000000000, options)).toBe(result);
                expect(shapeOf(-10, options)).toBe(result);
                expect(shapeOf(-100000000, options)).toBe(result);
                expect(shapeOf(Number.MAX_SAFE_INTEGER, options)).toBe(result);
                expect(shapeOf(Number.MIN_SAFE_INTEGER, options)).toBe(result);
                expect(shapeOf(0.0, options)).toBe(result);
                expect(shapeOf(7.0, options)).toBe(result);
                expect(shapeOf(-5.0000000, options)).toBe(result);
                expect(shapeOf(Number(1), options)).toBe(result);
                expect(shapeOf(Number(0.0), options)).toBe(result);
            });
        });
        withInput('an infinity', () => {
            const result = 'infinity';
            it(`returns "${result}"`, () => {
                expect(shapeOf(Number.NEGATIVE_INFINITY, options)).toBe(result);
                expect(shapeOf(Number.POSITIVE_INFINITY, options)).toBe(result);
                expect(shapeOf(Number(Number.NEGATIVE_INFINITY), options)).toBe(result);
                expect(shapeOf(Number(Number.POSITIVE_INFINITY), options)).toBe(result);
            });
        });
        when('the withInput number is an NaN', () => {
            const result = 'nan';
            it(`returns "${result}"`, () => {
                expect(shapeOf(Number.NaN, options)).toBe(result);
                expect(shapeOf(Number(Number.NaN), options)).toBe(result);
            });
        });
        when('the withInput number is a float', () => {
            const result = 'float';
            it(`returns "${result}"`, () => {
                expect(shapeOf(0.1, options)).toBe(result);
                expect(shapeOf(3.1416, options)).toBe(result);
                expect(shapeOf(-3.1416, options)).toBe(result);
                expect(shapeOf(Number(0.1), options)).toBe(result);
                expect(shapeOf(Number(3.1416), options)).toBe(result);
                expect(shapeOf(Number(-3.1416), options)).toBe(result);
            });
        });
    });

    // Wrapped primitives
    withInput('a boolean', () => {
        const result = options?.unwrapBaseShapes ? 'boolean' : 'wrapper';
        it(`returns "${result}"`, () => {
            expect(shapeOf(new Boolean(true), options)).toBe(result);
            expect(shapeOf(new Boolean(false), options)).toBe(result);
        });
    });
    withInput('a string', () => {
        const result = options?.unwrapBaseShapes ? 'string' : 'wrapper';
        it(`returns "${result}"`, () => {
            expect(shapeOf(new String('hello'), options)).toBe(result);
            expect(shapeOf(new String('bye'), options)).toBe(result);
            expect(shapeOf(new String(''), options)).toBe(result);
            expect(shapeOf(new String('a long string'), options)).toBe(result);
        });
    });
    withInput('a number', () => {
        when('the given number is an int', () => {
            const result = options?.unwrapBaseShapes ? 'int' : 'wrapper';
            it(`returns "${result}"`, () => {
                expect(shapeOf(new Number(1), options)).toBe(result);
                expect(shapeOf(new Number(0.0), options)).toBe(result);
            });
        });
        when('the given number is infinity', () => {
            const result = options?.unwrapBaseShapes ? 'infinity' : 'wrapper';
            it(`returns "${result}"`, () => {
                expect(shapeOf(new Number(Number.NEGATIVE_INFINITY), options)).toBe(result);
                expect(shapeOf(new Number(Number.POSITIVE_INFINITY), options)).toBe(result);
            });
        });
        when('the given number is an NaN', () => {
            const result = options?.unwrapBaseShapes ? 'nan' : 'wrapper';
            it(`returns "${result}"`, () => {
                expect(shapeOf(new Number(Number.NaN), options)).toBe(result);
            });
        });
        when('the given number is a float', () => {
            const result = options?.unwrapBaseShapes ? 'float' : 'wrapper';
            it(`returns "${result}"`, () => {
                expect(shapeOf(new Number(0.1), options)).toBe(result);
                expect(shapeOf(new Number(3.1416), options)).toBe(result);
                expect(shapeOf(new Number(-3.1416), options)).toBe(result);
            });
        });
    });

    // Objects
    withInput('null', () => {
        const result = 'null'
        it(`returns "${result}"`, () => {
            expect(shapeOf(null, options)).toBe(result);
        });
    });

    withInput('a regexp', () => {
        const result = 'regexp'
        it(`returns "${result}"`, () => {
            expect(shapeOf(/abc/, options)).toBe(result);
            expect(shapeOf(/abc/g, options)).toBe(result);
            expect(shapeOf(/[a-z]+/, options)).toBe(result);
            expect(shapeOf(RegExp('abc'), options)).toBe(result);
            expect(shapeOf(RegExp('abc', 'g'), options)).toBe(result);
            expect(shapeOf(RegExp('[a-z]*'), options)).toBe(result);
            expect(shapeOf(new RegExp('abc'), options)).toBe(result);
            expect(shapeOf(new RegExp('abc', 'g'), options)).toBe(result);
            expect(shapeOf(new RegExp('[a-z]*'), options)).toBe(result);
        });
    });

    withInput('a regexp', () => {
        const result = 'buffer'
        it(`returns "${result}"`, () => {
            expect(shapeOf(Buffer.from('hola', 'utf-8'), options)).toBe(result);
            expect(shapeOf(Buffer.from('', 'ascii'), options)).toBe(result);
        });
    });

    withInput('a promise', () => {
        const result = 'promise'
        it(`returns "${result}"`, () => {
            expect(shapeOf(new Promise(() => {}), options)).toBe(result);
            expect(shapeOf(new Promise((resolve, reject) => {}), options)).toBe(result);
        });
    });

    withInput('custom classes', () => {
        const instance = new CustomClass(5);

        it('returns "instance" for a class instance', () => {
            expect(shapeOf(instance, options)).toBe('instance');
        });
    });
}

describe('shapeOf', () => {
    given('options contains unwrapBaseShapes as false', () => {
        const options = { unwrapBaseShapes: false };
        testBasicShapesWithOptions(options);
    });
    given('options contains unwrapBaseShapes as false', () => {
        const options = { unwrapBaseShapes: true };
        testBasicShapesWithOptions(options);
    });
    given('options contains useFullObjectShapes as false', () => {
        const options = { useFullObjectShapes: false };
        withInput('an array', () => {
            const result = 'array';
            it(`returns "${result}"`, () => {
                expect(shapeOf([], options)).toBe(result);
                expect(shapeOf([1, 2, 3], options)).toBe(result);
                expect(shapeOf(['A', 'B', 'C'], options)).toBe(result);
                expect(shapeOf(['A', 2, 'C'], options)).toBe(result);
                expect(shapeOf(Array(), options)).toBe(result);
                expect(shapeOf(Array(1, 2, 3), options)).toBe(result);
                expect(shapeOf(Array('A', 'B', 'C'), options)).toBe(result);
                expect(shapeOf(Array<any>('A', 2, 'C'), options)).toBe(result);
            });
        });
        withInput('an object', () => {
            const result = 'object';
            it(`returns "${result}"`, () => {
                expect(shapeOf({}, options)).toBe(result);
                expect(shapeOf({a: 1, b: 2}, options)).toBe(result);
                expect(shapeOf({a: 1, b: 'hello'}, options)).toBe(result);
            });
        });
    });
    given('options contains useFullObjectShapes as true', () => {
        const options: Partial<ShapeOfOptions> = { useFullObjectShapes: true };
        withInput('an empty array', () => {
            const result = 'any';
            it(`returns "[${result}"]`, () => {
                expect(shapeOf([], options)).toStrictEqual([result]);
            });
        });
        withInput('a base shape array', () => {
            when('all elements have the same shape', () => {
                it('returns "[<baseShape>]"', () => {
                    expect(shapeOf(['A', 'B', 'C'], options)).toStrictEqual(['string']);
                    expect(shapeOf([/a/, /b/, /c/], options)).toStrictEqual(['regexp']);
                    expect(shapeOf([true, false], options)).toStrictEqual(['boolean']);
                    expect(shapeOf([Symbol('A'), Symbol('B'), Symbol('C')], options)).toStrictEqual(['symbol']);
                    expect(shapeOf([undefined, undefined], options)).toStrictEqual(['undefined']);
                    expect(shapeOf([null], options)).toStrictEqual(['null']);
                    expect(shapeOf([Buffer.from('abc'), Buffer.from('def')], options)).toStrictEqual(['buffer']);
                    expect(shapeOf([new Promise(() => {})], options)).toStrictEqual(['promise']);
                });
            });
            when('all elements have different shape', () => {
                const result = 'any';
                it(`returns "[${result}"]`, () => {
                    expect(shapeOf(['A', /b/, 'C'], options)).toStrictEqual([result]);
                    expect(shapeOf([/a/, true, false], options)).toStrictEqual([result]);
                    expect(shapeOf([true, null], options)).toStrictEqual([result]);
                    expect(shapeOf([undefined, Symbol('B'), Symbol('C')], options)).toStrictEqual([result]);
                    expect(shapeOf([undefined, null], options)).toStrictEqual([result]);
                });
            });
            when('all elements have different shape but all are objects', () => {
                const result = 'object';
                it(`returns "[${result}"]`, () => {
                    expect(shapeOf([Buffer.from('abc'), new Promise(() => {}), null], options)).toStrictEqual([result]);
                    expect(shapeOf([Buffer.from('abc'), null, Buffer.from('def')], options)).toStrictEqual([result]);
                    expect(shapeOf([new Promise(() => {}), null], options)).toStrictEqual([result]);
                });
            });
        });
        withInput('a numeric array', () => {
            when('all elements are ints', () => {
                const result = 'int';
                it(`returns "[${result}"]`, () => {
                    expect(shapeOf([1, 2, 3], options)).toStrictEqual([result]);
                    expect(shapeOf([1, 7.0, -3.0], options)).toStrictEqual([result]);
                });
            });
            when('all elements are floats', () => {
                const result = 'float';
                it(`returns "[${result}"]`, () => {
                    expect(shapeOf([1.1, 2.9, 3.4], options)).toStrictEqual([result]);
                    expect(shapeOf([1.1, 7.0001, -3.01], options)).toStrictEqual([result]);
                });
            });
            when('all elements are nan', () => {
                const result = 'nan';
                it(`returns "[${result}"]`, () => {
                    expect(shapeOf([Number.NaN], options)).toStrictEqual([result]);
                    expect(shapeOf([Number.NaN, Number.NaN], options)).toStrictEqual([result]);
                });
            });
            when('all elements are infinity', () => {
                const result = 'infinity';
                it(`returns "[${result}"]`, () => {
                    expect(shapeOf([Number.POSITIVE_INFINITY], options)).toStrictEqual([result]);
                    expect(shapeOf([Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY], options)).toStrictEqual([result]);
                });
            });
            when('all elements are mixed numbers', () => {
                const result = 'number';
                it(`returns "[${result}"]`, () => {
                    expect(shapeOf([Number.POSITIVE_INFINITY, 0, -43], options)).toStrictEqual([result]);
                    expect(shapeOf([1, 3.14], options)).toStrictEqual([result]);
                    expect(shapeOf([0, 1, Number.NaN], options)).toStrictEqual([result]);
                });
            });
        });
        withInput('an object', () => {
            it('returns the shape of the object with attributes with value shapes', () => {
                expect(shapeOf({}, options)).toStrictEqual({});
                expect(shapeOf({a: 1, b: 2}, options)).toStrictEqual({a: 'int', b: 'int'});
                expect(shapeOf({a: 1, b: 'hello'}, options)).toStrictEqual({a: 'int', b: 'string'});
            });
        });
        withInput('complex object shape', () => {
            it('returns the correct shape', () => {
                const obj = {
                    a1: [
                        {a1_1: 'A1_X', a1_2: /[a-z_X]/},
                        {a1_1: 'A1_Y', a1_2: /[a-z_Y]/}
                    ],
                    a2: [
                        {a2_1: 'A2_X', a2_2: 2},
                        {a2_1: 'A2_Y', a2_2: 3.14},
                        {a2_1: 'A2_Z', a2_2: Number.NaN}
                    ],
                    a3: [
                        {a3_1: 'A3_X', a3_2: 2},
                        {a3_1: 'A3_Y'},
                        {a3_1: 'A3_Z', a3_3: Number.NaN}
                    ],
                    a4: [0, Number(197), 8.0],
                    b1: 'B1',
                    b2: new Number(123.456),
                    b3: new CustomClass(5),
                    c1: {
                        c1_1: new String('C1_1_X'),
                        c1_2: 123.456,
                        c1_3: [
                            null,
                            {c1_3_1: 'C1_1_1_X'},
                            'C1_3_X'
                        ],
                    }
                };

                const shape = {
                    a1: [{a1_1: 'string', a1_2: 'regexp'}],
                    a2: [{a2_1: 'string', a2_2: 'number'}],
                    a3: [{a3_1: 'string'}],
                    a4: ['int'],
                    b1: 'string',
                    b2: 'float',
                    b3: 'instance',
                    c1: {
                        c1_1: 'string',
                        c1_2: 'float',
                        c1_3: ['any']
                    }
                }

                expect(shapeOf(obj, options)).toStrictEqual(shape);
            });
        });
    });
    given('options contains useFullObjectShapes as true and unwrapBaseShapes as false', () => {
        const options = { useFullObjectShapes: true, unwrapBaseShapes: false };

        withInput('complex object shape', () => {
            it('returns the correct shape', () => {
                const obj = {
                    a1: [
                        {a1_1: 'A1_X', a1_2: /[a-z_X]/},
                        {a1_1: 'A1_Y', a1_2: /[a-z_Y]/}
                    ],
                    a2: [
                        {a2_1: 'A2_X', a2_2: 2},
                        {a2_1: 'A2_Y', a2_2: 3.14},
                        {a2_1: 'A2_Z', a2_2: Number.NaN}
                    ],
                    a3: [
                        {a3_1: 'A3_X', a3_2: 2},
                        {a3_1: 'A3_Y'},
                        {a3_1: 'A3_Z', a3_3: Number.NaN}
                    ],
                    a4: [0, Number(197), 8.0],
                    b1: 'B1',
                    b2: new Number(123.456),
                    b3: new CustomClass(5),
                    c1: {
                        c1_1: new String('C1_1_X'),
                        c1_2: 123.456,
                        c1_3: [
                            null,
                            {c1_3_1: 'C1_1_1_X'},
                            'C1_3_X'
                        ],
                    }
                };

                const shape = {
                    a1: [{a1_1: 'string', a1_2: 'regexp'}],
                    a2: [{a2_1: 'string', a2_2: 'number'}],
                    a3: [{a3_1: 'string'}],
                    a4: ['int'],
                    b1: 'string',
                    b2: 'wrapper',
                    b3: 'instance',
                    c1: {
                        c1_1: 'wrapper',
                        c1_2: 'float',
                        c1_3: ['any']
                    }
                }

                expect(shapeOf(obj, options)).toStrictEqual(shape);
            });
        });
    });
    given('options contains useFullObjectShapes as true and unwrapBaseShapes as true', () => {
        const options = { useFullObjectShapes: true, unwrapBaseShapes: true };

        withInput('complex object shape', () => {
            it('returns the correct shape', () => {
                const obj = {
                    a1: [
                        {a1_1: 'A1_X', a1_2: /[a-z_X]/},
                        {a1_1: 'A1_Y', a1_2: /[a-z_Y]/}
                    ],
                    a2: [
                        {a2_1: 'A2_X', a2_2: 2},
                        {a2_1: 'A2_Y', a2_2: 3.14},
                        {a2_1: 'A2_Z', a2_2: Number.NaN}
                    ],
                    a3: [
                        {a3_1: 'A3_X', a3_2: 2},
                        {a3_1: 'A3_Y'},
                        {a3_1: 'A3_Z', a3_3: Number.NaN}
                    ],
                    a4: [0, Number(197), 8.0],
                    b1: 'B1',
                    b2: new Number(123.456),
                    b3: new CustomClass(5),
                    c1: {
                        c1_1: new String('C1_1_X'),
                        c1_2: 123.456,
                        c1_3: [
                            null,
                            {c1_3_1: 'C1_1_1_X'},
                            'C1_3_X'
                        ],
                    }
                };

                const shape = {
                    a1: [{a1_1: 'string', a1_2: 'regexp'}],
                    a2: [{a2_1: 'string', a2_2: 'number'}],
                    a3: [{a3_1: 'string'}],
                    a4: ['int'],
                    b1: 'string',
                    b2: 'float',
                    b3: 'instance',
                    c1: {
                        c1_1: 'string',
                        c1_2: 'float',
                        c1_3: ['any']
                    }
                }

                expect(shapeOf(obj, options)).toStrictEqual(shape);
            });
        });
    });
});
