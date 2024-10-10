/**
 * @author Alan Rodas Bonjour <alanrodas@gmail.com>
 */

import { describe, expect, describe as given, it, describe as when, describe as withInput } from '@jest/globals';
import { hasShape, HasShapeOptions, Shape } from '../src/index';

class CustomClass {
    a: number;
    constructor(a: number) {
        this.a = a;
    }
}

const testBasicShapesWithOptions = (options: Partial<HasShapeOptions>) => {
    withInput('bigint as shape', () => {
        const shape = 'bigint';
        it(`returns true for ${shape} element`, () => {
            const result = true;
            expect(hasShape(0n, shape, options)).toBe(result);
            expect(hasShape(10n, shape, options)).toBe(result);
            expect(hasShape(BigInt(0), shape, options)).toBe(result);
            expect(hasShape(BigInt(10), shape, options)).toBe(result);
        });
        it(`returns false for non ${shape} element`, () => {
            const result = false;
            expect(hasShape({a: 0n}, shape, options)).toBe(result);
            expect(hasShape([0], shape, options)).toBe(result);
            expect(hasShape(undefined, shape, options)).toBe(result);
            expect(hasShape(10, shape, options)).toBe(result);
            expect(hasShape(false, shape, options)).toBe(result);
            expect(hasShape('hello', shape, options)).toBe(result);
            expect(hasShape(null, shape, options)).toBe(result);
            expect(hasShape(/abc/, shape, options)).toBe(result);
            expect(hasShape(() => {}, shape, options)).toBe(result);
            expect(hasShape(Symbol('symbol'), shape, options)).toBe(result);
            expect(hasShape(Buffer.from('abc'), shape, options)).toBe(result);
            expect(hasShape(new Promise((a,b) => {}), shape, options)).toBe(result);
            expect(hasShape(new Number(5), shape, options)).toBe(result);
            expect(hasShape(new String('hello'), shape, options)).toBe(result);
            expect(hasShape(new Boolean(false), shape, options)).toBe(result);
            expect(hasShape(new CustomClass(5), shape, options)).toBe(result);
            expect(hasShape([1, 2, 3], shape, options)).toBe(result);
            expect(hasShape({a: 23, b: 'hello'}, shape, options)).toBe(result);
        });
    });
    withInput('boolean as shape', () => {
        const shape = 'boolean';
        it(`returns true for ${shape} element`, () => {
            const result = true;
            expect(hasShape(true, shape, options)).toBe(result);
            expect(hasShape(false, shape, options)).toBe(result);
            expect(hasShape(Boolean(true), shape, options)).toBe(result);
            expect(hasShape(Boolean(false), shape, options)).toBe(result);
        });
        it(`returns false for non ${shape} element`, () => {
            const result = false;
            expect(hasShape({a: true}, shape, options)).toBe(result);
            expect(hasShape([false, true], shape, options)).toBe(result);
            expect(hasShape(undefined, shape, options)).toBe(result);
            expect(hasShape(10, shape, options)).toBe(result);
            expect(hasShape(100n, shape, options)).toBe(result);
            expect(hasShape('hello', shape, options)).toBe(result);
            expect(hasShape(null, shape, options)).toBe(result);
            expect(hasShape(/abc/, shape, options)).toBe(result);
            expect(hasShape(() => {}, shape, options)).toBe(result);
            expect(hasShape(Symbol('symbol'), shape, options)).toBe(result);
            expect(hasShape(Buffer.from('abc'), shape, options)).toBe(result);
            expect(hasShape(new Promise((a,b) => {}), shape, options)).toBe(result);
            expect(hasShape(new Number(5), shape, options)).toBe(result);
            expect(hasShape(new String('hello'), shape, options)).toBe(result);
            expect(hasShape(new CustomClass(5), shape, options)).toBe(result);
            expect(hasShape([1, 2, 3], shape, options)).toBe(result);
            expect(hasShape({a: 23, b: 'hello'}, shape, options)).toBe(result);
        });
    });
    withInput('undefined as shape', () => {
        const shape = 'undefined';
        it(`returns true for ${shape} element`, () => {
            const result = true;
            expect(hasShape(undefined, shape, options)).toBe(result);
        });
        it(`returns false for non ${shape} element`, () => {
            const result = false;
            expect(hasShape({a: undefined}, shape, options)).toBe(result);
            expect(hasShape([undefined], shape, options)).toBe(result);
            expect(hasShape(10, shape, options)).toBe(result);
            expect(hasShape(100n, shape, options)).toBe(result);
            expect(hasShape(false, shape, options)).toBe(result);
            expect(hasShape('hello', shape, options)).toBe(result);
            expect(hasShape(null, shape, options)).toBe(result);
            expect(hasShape(/abc/, shape, options)).toBe(result);
            expect(hasShape(() => {}, shape, options)).toBe(result);
            expect(hasShape(Symbol('symbol'), shape, options)).toBe(result);
            expect(hasShape(Buffer.from('abc'), shape, options)).toBe(result);
            expect(hasShape(new Promise((a,b) => {}), shape, options)).toBe(result);
            expect(hasShape(new Number(5), shape, options)).toBe(result);
            expect(hasShape(new String('hello'), shape, options)).toBe(result);
            expect(hasShape(new Boolean(false), shape, options)).toBe(result);
            expect(hasShape(new CustomClass(5), shape, options)).toBe(result);
            expect(hasShape([1, 2, 3], shape, options)).toBe(result);
            expect(hasShape({a: 23, b: 'hello'}, shape, options)).toBe(result);
        });
    });
    withInput('symbol as shape', () => {
        const shape = 'symbol';
        it(`returns true for ${shape} element`, () => {
            const result = true;
            expect(hasShape(Symbol('hello'), shape, options)).toBe(result);
            expect(hasShape(Symbol('bye'), shape, options)).toBe(result);
            expect(hasShape(Symbol(''), shape, options)).toBe(result);
        });
        it(`returns false for non ${shape} element`, () => {
            const result = false;
            expect(hasShape({a: Symbol('b')}, shape, options)).toBe(result);
            expect(hasShape([Symbol('a')], shape, options)).toBe(result);
            expect(hasShape(undefined, shape, options)).toBe(result);
            expect(hasShape(10, shape, options)).toBe(result);
            expect(hasShape(100n, shape, options)).toBe(result);
            expect(hasShape(false, shape, options)).toBe(result);
            expect(hasShape('hello', shape, options)).toBe(result);
            expect(hasShape(null, shape, options)).toBe(result);
            expect(hasShape(/abc/, shape, options)).toBe(result);
            expect(hasShape(() => {}, shape, options)).toBe(result);
            expect(hasShape(Buffer.from('abc'), shape, options)).toBe(result);
            expect(hasShape(new Promise((a,b) => {}), shape, options)).toBe(result);
            expect(hasShape(new Number(5), shape, options)).toBe(result);
            expect(hasShape(new String('hello'), shape, options)).toBe(result);
            expect(hasShape(new Boolean(false), shape, options)).toBe(result);
            expect(hasShape(new CustomClass(5), shape, options)).toBe(result);
            expect(hasShape([1, 2, 3], shape, options)).toBe(result);
            expect(hasShape({a: 23, b: 'hello'}, shape, options)).toBe(result);
        });
    });
    withInput('string as shape', () => {
        const shape = 'string';
        it(`returns true for ${shape} element`, () => {
            const result = true;
            expect(hasShape('hello', shape, options)).toBe(result);
            expect(hasShape('bye', shape, options)).toBe(result);
            expect(hasShape('', shape, options)).toBe(result);
            expect(hasShape(String('hello'), shape, options)).toBe(result);
            expect(hasShape(String('bye'), shape, options)).toBe(result);
            expect(hasShape(String(''), shape, options)).toBe(result);
        });
        it(`returns false for non ${shape} element`, () => {
            const result = false;
            expect(hasShape({a: 'b'}, shape, options)).toBe(result);
            expect(hasShape(['a'], shape, options)).toBe(result);
            expect(hasShape(undefined, shape, options)).toBe(result);
            expect(hasShape(10, shape, options)).toBe(result);
            expect(hasShape(100n, shape, options)).toBe(result);
            expect(hasShape(false, shape, options)).toBe(result);
            expect(hasShape(null, shape, options)).toBe(result);
            expect(hasShape(/abc/, shape, options)).toBe(result);
            expect(hasShape(() => {}, shape, options)).toBe(result);
            expect(hasShape(Symbol('symbol'), shape, options)).toBe(result);
            expect(hasShape(Buffer.from('abc'), shape, options)).toBe(result);
            expect(hasShape(new Promise((a,b) => {}), shape, options)).toBe(result);
            expect(hasShape(new Number(5), shape, options)).toBe(result);
            expect(hasShape(new Boolean(false), shape, options)).toBe(result);
            expect(hasShape(new CustomClass(5), shape, options)).toBe(result);
            expect(hasShape([1, 2, 3], shape, options)).toBe(result);
            expect(hasShape({a: 23, b: 'hello'}, shape, options)).toBe(result);
        });
    });
    withInput('function as shape', () => {
        const shape = 'function';
        it(`returns true for ${shape} element`, () => {
            const result = true;
            expect(hasShape(() => {}, shape, options)).toBe(result);
            expect(hasShape(function() {}, shape, options)).toBe(result);
            expect(hasShape((a: number, b: number) => a + b, shape, options)).toBe(result);
            expect(hasShape(function(a: number, b: number) { return a + b; }, shape, options)).toBe(result);
        });
        it(`returns false for non ${shape} element`, () => {
            const result = false;
            expect(hasShape({a: () => {}}, shape, options)).toBe(result);
            expect(hasShape([() => {}], shape, options)).toBe(result);
            expect(hasShape(undefined, shape, options)).toBe(result);
            expect(hasShape(10, shape, options)).toBe(result);
            expect(hasShape(100n, shape, options)).toBe(result);
            expect(hasShape(false, shape, options)).toBe(result);
            expect(hasShape('hello', shape, options)).toBe(result);
            expect(hasShape(null, shape, options)).toBe(result);
            expect(hasShape(/abc/, shape, options)).toBe(result);
            expect(hasShape(Symbol('symbol'), shape, options)).toBe(result);
            expect(hasShape(Buffer.from('abc'), shape, options)).toBe(result);
            expect(hasShape(new Promise((a,b) => {}), shape, options)).toBe(result);
            expect(hasShape(new Number(5), shape, options)).toBe(result);
            expect(hasShape(new String('hello'), shape, options)).toBe(result);
            expect(hasShape(new Boolean(false), shape, options)).toBe(result);
            expect(hasShape(new CustomClass(5), shape, options)).toBe(result);
            expect(hasShape([1, 2, 3], shape, options)).toBe(result);
            expect(hasShape({a: 23, b: 'hello'}, shape, options)).toBe(result);
        });
    });
    withInput('int as shape', () => {
        const shape = 'int';
        it(`returns true for ${shape} element`, () => {
            const result = true;
            expect(hasShape(0, shape, options)).toBe(result);
            expect(hasShape(1, shape, options)).toBe(result);
            expect(hasShape(1.00, shape, options)).toBe(result);
            expect(hasShape(100000000, shape, options)).toBe(result);
            expect(hasShape(-100000000, shape, options)).toBe(result);
            expect(hasShape(Number.MAX_SAFE_INTEGER, shape, options)).toBe(result);
            expect(hasShape(Number.MIN_SAFE_INTEGER, shape, options)).toBe(result);
            expect(hasShape(Number(0), shape, options)).toBe(result);
            expect(hasShape(Number(1), shape, options)).toBe(result);
            expect(hasShape(Number(1.00), shape, options)).toBe(result);
            expect(hasShape(Number(100000000), shape, options)).toBe(result);
            expect(hasShape(Number(-100000000), shape, options)).toBe(result);
            expect(hasShape(Number(Number.MAX_SAFE_INTEGER), shape, options)).toBe(result);
            expect(hasShape(Number(Number.MIN_SAFE_INTEGER), shape, options)).toBe(result);
        });
        it(`returns false for non ${shape} element`, () => {
            const result = false;
            expect(hasShape({a: 10}, shape, options)).toBe(result);
            expect(hasShape([10], shape, options)).toBe(result);
            expect(hasShape(undefined, shape, options)).toBe(result);
            expect(hasShape(100n, shape, options)).toBe(result);
            expect(hasShape(false, shape, options)).toBe(result);
            expect(hasShape('hello', shape, options)).toBe(result);
            expect(hasShape(null, shape, options)).toBe(result);
            expect(hasShape(/abc/, shape, options)).toBe(result);
            expect(hasShape(() => {}, shape, options)).toBe(result);
            expect(hasShape(Symbol('symbol'), shape, options)).toBe(result);
            expect(hasShape(Buffer.from('abc'), shape, options)).toBe(result);
            expect(hasShape(new Promise((a,b) => {}), shape, options)).toBe(result);
            expect(hasShape(new String('hello'), shape, options)).toBe(result);
            expect(hasShape(new Boolean(false), shape, options)).toBe(result);
            expect(hasShape(new CustomClass(5), shape, options)).toBe(result);
            expect(hasShape([1, 2, 3], shape, options)).toBe(result);
            expect(hasShape({a: 23, b: 'hello'}, shape, options)).toBe(result);
        });
        it(`returns false for other numbers`, () => {
            const result = false;
            expect(hasShape(0.1, shape, options)).toBe(result);
            expect(hasShape(1.00001, shape, options)).toBe(result);
            expect(hasShape(Number.NaN, shape, options)).toBe(result);
            expect(hasShape(Number.POSITIVE_INFINITY, shape, options)).toBe(result);
            expect(hasShape(Number.NEGATIVE_INFINITY, shape, options)).toBe(result);
            expect(hasShape(Number(0.1), shape, options)).toBe(result);
            expect(hasShape(Number(1.00001), shape, options)).toBe(result);
            expect(hasShape(Number(Number.NaN), shape, options)).toBe(result);
            expect(hasShape(Number(Number.POSITIVE_INFINITY), shape, options)).toBe(result);
            expect(hasShape(Number(Number.NEGATIVE_INFINITY), shape, options)).toBe(result);
        });
    });
    withInput('float as shape', () => {
        const shape = 'float';
        it(`returns true for ${shape} element`, () => {
            const result = true;
            expect(hasShape(0.1, shape, options)).toBe(result);
            expect(hasShape(1.00001, shape, options)).toBe(result);
            expect(hasShape(3.1416, shape, options)).toBe(result);
            expect(hasShape(Number(0.1), shape, options)).toBe(result);
            expect(hasShape(Number(1.00001), shape, options)).toBe(result);
            expect(hasShape(Number(3.1416), shape, options)).toBe(result);
        });
        it(`returns false for non ${shape} element`, () => {
            const result = false;
            expect(hasShape({a: 10.01}, shape, options)).toBe(result);
            expect(hasShape([10.10], shape, options)).toBe(result);
            expect(hasShape(undefined, shape, options)).toBe(result);
            expect(hasShape(100n, shape, options)).toBe(result);
            expect(hasShape(false, shape, options)).toBe(result);
            expect(hasShape('hello', shape, options)).toBe(result);
            expect(hasShape(null, shape, options)).toBe(result);
            expect(hasShape(/abc/, shape, options)).toBe(result);
            expect(hasShape(() => {}, shape, options)).toBe(result);
            expect(hasShape(Symbol('symbol'), shape, options)).toBe(result);
            expect(hasShape(Buffer.from('abc'), shape, options)).toBe(result);
            expect(hasShape(new Promise((a,b) => {}), shape, options)).toBe(result);
            expect(hasShape(new String('hello'), shape, options)).toBe(result);
            expect(hasShape(new Boolean(false), shape, options)).toBe(result);
            expect(hasShape(new CustomClass(5), shape, options)).toBe(result);
            expect(hasShape([1, 2, 3], shape, options)).toBe(result);
            expect(hasShape({a: 23, b: 'hello'}, shape, options)).toBe(result);
        });
        it(`returns false for other numbers`, () => {
            const result = false;
            expect(hasShape(0, shape, options)).toBe(result);
            expect(hasShape(1.0000, shape, options)).toBe(result);
            expect(hasShape(Number.NaN, shape, options)).toBe(result);
            expect(hasShape(Number.POSITIVE_INFINITY, shape, options)).toBe(result);
            expect(hasShape(Number.NEGATIVE_INFINITY, shape, options)).toBe(result);
            expect(hasShape(Number(0), shape, options)).toBe(result);
            expect(hasShape(Number(1.0000), shape, options)).toBe(result);
            expect(hasShape(Number(Number.NaN), shape, options)).toBe(result);
            expect(hasShape(Number(Number.POSITIVE_INFINITY), shape, options)).toBe(result);
            expect(hasShape(Number(Number.NEGATIVE_INFINITY), shape, options)).toBe(result);
        });
    });
    withInput('nan as shape', () => {
        const shape = 'nan';
        it(`returns true for ${shape} element`, () => {
            const result = true;
            expect(hasShape(Number.NaN, shape, options)).toBe(result);
        });
        it(`returns false for non ${shape} element`, () => {
            const result = false;
            expect(hasShape({a: Number.NaN}, shape, options)).toBe(result);
            expect(hasShape([Number.NaN], shape, options)).toBe(result);
            expect(hasShape(undefined, shape, options)).toBe(result);
            expect(hasShape(100n, shape, options)).toBe(result);
            expect(hasShape(false, shape, options)).toBe(result);
            expect(hasShape('hello', shape, options)).toBe(result);
            expect(hasShape(null, shape, options)).toBe(result);
            expect(hasShape(/abc/, shape, options)).toBe(result);
            expect(hasShape(() => {}, shape, options)).toBe(result);
            expect(hasShape(Symbol('symbol'), shape, options)).toBe(result);
            expect(hasShape(Buffer.from('abc'), shape, options)).toBe(result);
            expect(hasShape(new Promise((a,b) => {}), shape, options)).toBe(result);
            expect(hasShape(new Number(5), shape, options)).toBe(result);
            expect(hasShape(new String('hello'), shape, options)).toBe(result);
            expect(hasShape(new Boolean(false), shape, options)).toBe(result);
            expect(hasShape(new CustomClass(5), shape, options)).toBe(result);
            expect(hasShape([1, 2, 3], shape, options)).toBe(result);
            expect(hasShape({a: 23, b: 'hello'}, shape, options)).toBe(result);
        });
        it(`returns false for other numbers`, () => {
            const result = false;
            expect(hasShape(0, shape, options)).toBe(result);
            expect(hasShape(1.0000, shape, options)).toBe(result);
            expect(hasShape(0.1, shape, options)).toBe(result);
            expect(hasShape(1.0003, shape, options)).toBe(result);
            expect(hasShape(Number.POSITIVE_INFINITY, shape, options)).toBe(result);
            expect(hasShape(Number.NEGATIVE_INFINITY, shape, options)).toBe(result);
            expect(hasShape(Number(0), shape, options)).toBe(result);
            expect(hasShape(Number(1.0000), shape, options)).toBe(result);
            expect(hasShape(Number(0.1), shape, options)).toBe(result);
            expect(hasShape(Number(1.0003), shape, options)).toBe(result);
            expect(hasShape(Number(Number.POSITIVE_INFINITY), shape, options)).toBe(result);
            expect(hasShape(Number(Number.NEGATIVE_INFINITY), shape, options)).toBe(result);
        });
    });
    withInput('infinity as shape', () => {
        const shape = 'infinity';
        it(`returns true for ${shape} element`, () => {
            const result = true;
            expect(hasShape(Number.POSITIVE_INFINITY, shape, options)).toBe(result);
            expect(hasShape(Number.NEGATIVE_INFINITY, shape, options)).toBe(result);
            expect(hasShape(Number(Number.POSITIVE_INFINITY), shape, options)).toBe(result);
            expect(hasShape(Number(Number.NEGATIVE_INFINITY), shape, options)).toBe(result);
        });
        it(`returns false for non ${shape} element`, () => {
            const result = false;
            expect(hasShape({a: Number.POSITIVE_INFINITY}, shape, options)).toBe(result);
            expect(hasShape([Number.POSITIVE_INFINITY], shape, options)).toBe(result);
            expect(hasShape(undefined, shape, options)).toBe(result);
            expect(hasShape(100n, shape, options)).toBe(result);
            expect(hasShape(false, shape, options)).toBe(result);
            expect(hasShape('hello', shape, options)).toBe(result);
            expect(hasShape(null, shape, options)).toBe(result);
            expect(hasShape(/abc/, shape, options)).toBe(result);
            expect(hasShape(() => {}, shape, options)).toBe(result);
            expect(hasShape(Symbol('symbol'), shape, options)).toBe(result);
            expect(hasShape(Buffer.from('abc'), shape, options)).toBe(result);
            expect(hasShape(new Promise((a,b) => {}), shape, options)).toBe(result);
            expect(hasShape(new Number(5), shape, options)).toBe(result);
            expect(hasShape(new String('hello'), shape, options)).toBe(result);
            expect(hasShape(new Boolean(false), shape, options)).toBe(result);
            expect(hasShape(new CustomClass(5), shape, options)).toBe(result);
            expect(hasShape([1, 2, 3], shape, options)).toBe(result);
            expect(hasShape({a: 23, b: 'hello'}, shape, options)).toBe(result);
        });
        it(`returns false for other numbers`, () => {
            const result = false;
            expect(hasShape(0, shape, options)).toBe(result);
            expect(hasShape(1.0000, shape, options)).toBe(result);
            expect(hasShape(0.1, shape, options)).toBe(result);
            expect(hasShape(1.0003, shape, options)).toBe(result);
            expect(hasShape(Number.NaN, shape, options)).toBe(result);
            expect(hasShape(Number(0), shape, options)).toBe(result);
            expect(hasShape(Number(1.0000), shape, options)).toBe(result);
            expect(hasShape(Number(0.1), shape, options)).toBe(result);
            expect(hasShape(Number(1.0003), shape, options)).toBe(result);
            expect(hasShape(Number(Number.NaN), shape, options)).toBe(result);
        });
    });
    withInput('number as shape', () => {
        const shape = 'number';
        it(`returns true for any number`, () => {
            const result = true;
            expect(hasShape(0, shape, options)).toBe(result);
            expect(hasShape(1.0000, shape, options)).toBe(result);
            expect(hasShape(0.1, shape, options)).toBe(result);
            expect(hasShape(1.0003, shape, options)).toBe(result);
            expect(hasShape(Number.NaN, shape, options)).toBe(result);
            expect(hasShape(Number.POSITIVE_INFINITY, shape, options)).toBe(result);
            expect(hasShape(Number.NEGATIVE_INFINITY, shape, options)).toBe(result);
            expect(hasShape(Number(0), shape, options)).toBe(result);
            expect(hasShape(Number(1.0000), shape, options)).toBe(result);
            expect(hasShape(Number(0.1), shape, options)).toBe(result);
            expect(hasShape(Number(1.0003), shape, options)).toBe(result);
            expect(hasShape(Number(Number.NaN), shape, options)).toBe(result);
            expect(hasShape(Number(Number.POSITIVE_INFINITY), shape, options)).toBe(result);
            expect(hasShape(Number(Number.NEGATIVE_INFINITY), shape, options)).toBe(result);
        });
        it(`returns false for non ${shape} element`, () => {
            const result = false;
            expect(hasShape({a: 10}, shape, options)).toBe(result);
            expect(hasShape([10], shape, options)).toBe(result);
            expect(hasShape({a: 0.10}, shape, options)).toBe(result);
            expect(hasShape([10.2], shape, options)).toBe(result);
            expect(hasShape({a: Number.NaN}, shape, options)).toBe(result);
            expect(hasShape([Number.NaN], shape, options)).toBe(result);
            expect(hasShape({a: Number.POSITIVE_INFINITY}, shape, options)).toBe(result);
            expect(hasShape([Number.POSITIVE_INFINITY], shape, options)).toBe(result);
            expect(hasShape(undefined, shape, options)).toBe(result);
            expect(hasShape(100n, shape, options)).toBe(result);
            expect(hasShape(false, shape, options)).toBe(result);
            expect(hasShape('hello', shape, options)).toBe(result);
            expect(hasShape(null, shape, options)).toBe(result);
            expect(hasShape(/abc/, shape, options)).toBe(result);
            expect(hasShape(() => {}, shape, options)).toBe(result);
            expect(hasShape(Symbol('symbol'), shape, options)).toBe(result);
            expect(hasShape(Buffer.from('abc'), shape, options)).toBe(result);
            expect(hasShape(new Promise((a,b) => {}), shape, options)).toBe(result);
            expect(hasShape(new String('hello'), shape, options)).toBe(result);
            expect(hasShape(new Boolean(false), shape, options)).toBe(result);
            expect(hasShape(new CustomClass(5), shape, options)).toBe(result);
            expect(hasShape([1, 2, 3], shape, options)).toBe(result);
            expect(hasShape({a: 23, b: 'hello'}, shape, options)).toBe(result);
        });
    });

    // Wrapped
    withInput('boolean as shape', () => {
        const shape = 'boolean';
        it(`returns ${options.unwrapBaseShapes ? 'true' : 'false'} for wrapped ${shape} element`, () => {
            const result = options.unwrapBaseShapes;
            expect(hasShape(new Boolean(true), shape, options)).toBe(result);
            expect(hasShape(new Boolean(false), shape, options)).toBe(result);
        });
    });
    withInput('string as shape', () => {
        const shape = 'string';
        it(`returns ${options.unwrapBaseShapes ? 'true' : 'false'} for wrapped ${shape} element`, () => {
            const result = options.unwrapBaseShapes;
            expect(hasShape(new String('hello'), shape, options)).toBe(result);
            expect(hasShape(new String('bye'), shape, options)).toBe(result);
            expect(hasShape(new String(''), shape, options)).toBe(result);
        });
    });
    withInput('int as shape', () => {
        const shape = 'int';
        it(`returns ${options.unwrapBaseShapes ? 'true' : 'false'} for wrapped ${shape} element`, () => {
            const result = options.unwrapBaseShapes;
            expect(hasShape(new Number(0), shape, options)).toBe(result);
            expect(hasShape(new Number(1.0000), shape, options)).toBe(result);
        });
    });
    withInput('float as shape', () => {
        const shape = 'float';
        it(`returns ${options.unwrapBaseShapes ? 'true' : 'false'} for wrapped ${shape} element`, () => {
            const result = options.unwrapBaseShapes;
            expect(hasShape(new Number(0.1), shape, options)).toBe(result);
            expect(hasShape(new Number(1.0001), shape, options)).toBe(result);
        });
    });
    withInput('nan as shape', () => {
        const shape = 'nan';
        it(`returns ${options.unwrapBaseShapes ? 'true' : 'false'} for wrapped ${shape} element`, () => {
            const result = options.unwrapBaseShapes;
            expect(hasShape(new Number(Number.NaN), shape, options)).toBe(result);
        });
    });
    withInput('infinity as shape', () => {
        const shape = 'infinity';
        it(`returns ${options.unwrapBaseShapes ? 'true' : 'false'} for wrapped ${shape} element`, () => {
            const result = options.unwrapBaseShapes;
            expect(hasShape(new Number(Number.POSITIVE_INFINITY), shape, options)).toBe(result);
            expect(hasShape(new Number(Number.NEGATIVE_INFINITY), shape, options)).toBe(result);
        });
    });
    withInput('number as shape', () => {
        const shape = 'number';
        it(`returns ${options.unwrapBaseShapes ? 'true' : 'false'} for wrapped ${shape} element`, () => {
            const result = options.unwrapBaseShapes;
            expect(hasShape(new Number(0), shape, options)).toBe(result);
            expect(hasShape(new Number(1.0000), shape, options)).toBe(result);
            expect(hasShape(new Number(0.1), shape, options)).toBe(result);
            expect(hasShape(new Number(1.0001), shape, options)).toBe(result);
            expect(hasShape(new Number(Number.NaN), shape, options)).toBe(result);
            expect(hasShape(new Number(Number.POSITIVE_INFINITY), shape, options)).toBe(result);
            expect(hasShape(new Number(Number.NEGATIVE_INFINITY), shape, options)).toBe(result);
        });
    });

    // Arrays
    withInput('array as shape', () => {
        const shape = 'array';
        it(`returns true for ${shape} element`, () => {
            const result = true;
            expect(hasShape([], shape, options)).toBe(result);
            expect(hasShape([1, 2, 3], shape, options)).toBe(result);
            expect(hasShape(['a', 'b', 'c'], shape, options)).toBe(result);
            expect(hasShape(['a', 2, 'c'], shape, options)).toBe(result);
            expect(hasShape([1, 1.5, new Number(2.005)], shape, options)).toBe(result);
        });
        it(`returns false for non ${shape} element`, () => {
            const result = false;
            expect(hasShape(undefined, shape, options)).toBe(result);
            expect(hasShape(10, shape, options)).toBe(result);
            expect(hasShape(100n, shape, options)).toBe(result);
            expect(hasShape(false, shape, options)).toBe(result);
            expect(hasShape('hello', shape, options)).toBe(result);
            expect(hasShape(null, shape, options)).toBe(result);
            expect(hasShape(/abc/, shape, options)).toBe(result);
            expect(hasShape(() => {}, shape, options)).toBe(result);
            expect(hasShape(Symbol('symbol'), shape, options)).toBe(result);
            expect(hasShape(Buffer.from('abc'), shape, options)).toBe(result);
            expect(hasShape(new Promise((a,b) => {}), shape, options)).toBe(result);
            expect(hasShape(new Number(5), shape, options)).toBe(result);
            expect(hasShape(new String('hello'), shape, options)).toBe(result);
            expect(hasShape(new Boolean(false), shape, options)).toBe(result);
            expect(hasShape(new CustomClass(5), shape, options)).toBe(result);
            expect(hasShape({a: 23, b: 'hello'}, shape, options)).toBe(result);
        });
    });

    // Object
    withInput('null as shape', () => {
        const shape = 'null';
        it(`returns true for ${shape} element`, () => {
            const result = true;
            expect(hasShape(null, shape, options)).toBe(result);
        });
        it(`returns false for non ${shape} element`, () => {
            const result = false;
            expect(hasShape(undefined, shape, options)).toBe(result);
            expect(hasShape(10, shape, options)).toBe(result);
            expect(hasShape(100n, shape, options)).toBe(result);
            expect(hasShape(false, shape, options)).toBe(result);
            expect(hasShape('hello', shape, options)).toBe(result);
            expect(hasShape(/abc/, shape, options)).toBe(result);
            expect(hasShape(() => {}, shape, options)).toBe(result);
            expect(hasShape(Symbol('symbol'), shape, options)).toBe(result);
            expect(hasShape(Buffer.from('abc'), shape, options)).toBe(result);
            expect(hasShape(new Promise((a,b) => {}), shape, options)).toBe(result);
            expect(hasShape(new Number(5), shape, options)).toBe(result);
            expect(hasShape(new String('hello'), shape, options)).toBe(result);
            expect(hasShape(new Boolean(false), shape, options)).toBe(result);
            expect(hasShape(new CustomClass(5), shape, options)).toBe(result);
            expect(hasShape([1, 2, 3], shape, options)).toBe(result);
            expect(hasShape({a: 23, b: 'hello'}, shape, options)).toBe(result);
        });
    });
    withInput('regexp as shape', () => {
        const shape = 'regexp';
        it(`returns true for ${shape} element`, () => {
            const result = true;
            expect(hasShape(/a/, shape, options)).toBe(result);
            expect(hasShape(/abc/g, shape, options)).toBe(result);
            expect(hasShape(RegExp('a'), shape, options)).toBe(result);
            expect(hasShape(RegExp('abc', 'g'), shape, options)).toBe(result);
            expect(hasShape(new RegExp('a'), shape, options)).toBe(result);
            expect(hasShape(new RegExp('abc', 'g'), shape, options)).toBe(result);
        });
        it(`returns false for non ${shape} element`, () => {
            const result = false;
            expect(hasShape(undefined, shape, options)).toBe(result);
            expect(hasShape(10, shape, options)).toBe(result);
            expect(hasShape(100n, shape, options)).toBe(result);
            expect(hasShape(false, shape, options)).toBe(result);
            expect(hasShape('hello', shape, options)).toBe(result);
            expect(hasShape(null, shape, options)).toBe(result);
            expect(hasShape(() => {}, shape, options)).toBe(result);
            expect(hasShape(Symbol('symbol'), shape, options)).toBe(result);
            expect(hasShape(Buffer.from('abc'), shape, options)).toBe(result);
            expect(hasShape(new Promise((a,b) => {}), shape, options)).toBe(result);
            expect(hasShape(new Number(5), shape, options)).toBe(result);
            expect(hasShape(new String('hello'), shape, options)).toBe(result);
            expect(hasShape(new Boolean(false), shape, options)).toBe(result);
            expect(hasShape(new CustomClass(5), shape, options)).toBe(result);
            expect(hasShape([1, 2, 3], shape, options)).toBe(result);
            expect(hasShape({a: 23, b: 'hello'}, shape, options)).toBe(result);
        });
    });
    withInput('buffer as shape', () => {
        const shape = 'buffer';
        it(`returns true for ${shape} element`, () => {
            const result = true;
            expect(hasShape(Buffer.from('abc', 'utf-8'), shape, options)).toBe(result);
            expect(hasShape(Buffer.from(''), shape, options)).toBe(result);
        });
        it(`returns false for non ${shape} element`, () => {
            const result = false;
            expect(hasShape(undefined, shape, options)).toBe(result);
            expect(hasShape(10, shape, options)).toBe(result);
            expect(hasShape(100n, shape, options)).toBe(result);
            expect(hasShape(false, shape, options)).toBe(result);
            expect(hasShape('hello', shape, options)).toBe(result);
            expect(hasShape(null, shape, options)).toBe(result);
            expect(hasShape(/abc/, shape, options)).toBe(result);
            expect(hasShape(() => {}, shape, options)).toBe(result);
            expect(hasShape(Symbol('symbol'), shape, options)).toBe(result);
            expect(hasShape(new Promise((a,b) => {}), shape, options)).toBe(result);
            expect(hasShape(new Number(5), shape, options)).toBe(result);
            expect(hasShape(new String('hello'), shape, options)).toBe(result);
            expect(hasShape(new Boolean(false), shape, options)).toBe(result);
            expect(hasShape(new CustomClass(5), shape, options)).toBe(result);
            expect(hasShape([1, 2, 3], shape, options)).toBe(result);
            expect(hasShape({a: 23, b: 'hello'}, shape, options)).toBe(result);
        });
    });
    withInput('promise as shape', () => {
        const shape = 'promise';
        it(`returns true for ${shape} element`, () => {
            const result = true;
            expect(hasShape(new Promise(() => {}), shape, options)).toBe(result);
            expect(hasShape(new Promise((accept, reject) => {}), shape, options)).toBe(result);
        });
        it(`returns false for non ${shape} element`, () => {
            const result = false;
            expect(hasShape(undefined, shape, options)).toBe(result);
            expect(hasShape(10, shape, options)).toBe(result);
            expect(hasShape(100n, shape, options)).toBe(result);
            expect(hasShape(false, shape, options)).toBe(result);
            expect(hasShape('hello', shape, options)).toBe(result);
            expect(hasShape(null, shape, options)).toBe(result);
            expect(hasShape(/abc/, shape, options)).toBe(result);
            expect(hasShape(() => {}, shape, options)).toBe(result);
            expect(hasShape(Symbol('symbol'), shape, options)).toBe(result);
            expect(hasShape(Buffer.from('abc'), shape, options)).toBe(result);
            expect(hasShape(new Number(5), shape, options)).toBe(result);
            expect(hasShape(new String('hello'), shape, options)).toBe(result);
            expect(hasShape(new Boolean(false), shape, options)).toBe(result);
            expect(hasShape(new CustomClass(5), shape, options)).toBe(result);
            expect(hasShape([1, 2, 3], shape, options)).toBe(result);
            expect(hasShape({a: 23, b: 'hello'}, shape, options)).toBe(result);
        });
    });

    withInput('wrapper as shape', () => {
        const shape = 'wrapper';
        it(`returns ${!options.unwrapBaseShapes ? 'true' : 'false'} for any wrapped shape`, () => {
            const result = !options.unwrapBaseShapes;
            expect(hasShape(new Boolean(true), shape, options)).toBe(result);
            expect(hasShape(new Number(3), shape, options)).toBe(result);
            expect(hasShape(new String(3), shape, options)).toBe(result);
        });
        it(`returns false for non ${shape} element`, () => {
            const result = false;
            expect(hasShape(undefined, shape, options)).toBe(result);
            expect(hasShape(10, shape, options)).toBe(result);
            expect(hasShape(100n, shape, options)).toBe(result);
            expect(hasShape(false, shape, options)).toBe(result);
            expect(hasShape('hello', shape, options)).toBe(result);
            expect(hasShape(null, shape, options)).toBe(result);
            expect(hasShape(/abc/, shape, options)).toBe(result);
            expect(hasShape(() => {}, shape, options)).toBe(result);
            expect(hasShape(Symbol('symbol'), shape, options)).toBe(result);
            expect(hasShape(Buffer.from('abc'), shape, options)).toBe(result);
            expect(hasShape(new Promise((a,b) => {}), shape, options)).toBe(result);
            expect(hasShape([1, 2, 3], shape, options)).toBe(result);
            expect(hasShape({a: 23, b: 'hello'}, shape, options)).toBe(result);
        });
    });

    withInput('instance as shape', () => {
        const shape = 'instance';
        it(`returns true for any custom class element`, () => {
            const result = true;
            expect(hasShape(new CustomClass(5), shape, options)).toBe(result);
        });
        it(`returns false for non ${shape} element`, () => {
            const result = false;
            expect(hasShape(undefined, shape, options)).toBe(result);
            expect(hasShape(10, shape, options)).toBe(result);
            expect(hasShape(100n, shape, options)).toBe(result);
            expect(hasShape(false, shape, options)).toBe(result);
            expect(hasShape('hello', shape, options)).toBe(result);
            expect(hasShape(null, shape, options)).toBe(result);
            expect(hasShape(/abc/, shape, options)).toBe(result);
            expect(hasShape(() => {}, shape, options)).toBe(result);
            expect(hasShape(Symbol('symbol'), shape, options)).toBe(result);
            expect(hasShape(Buffer.from('abc'), shape, options)).toBe(result);
            expect(hasShape(new Promise((a,b) => {}), shape, options)).toBe(result);
            expect(hasShape(new Number(5), shape, options)).toBe(result);
            expect(hasShape(new String('hello'), shape, options)).toBe(result);
            expect(hasShape(new Boolean(false), shape, options)).toBe(result);
            expect(hasShape([1, 2, 3], shape, options)).toBe(result);
            expect(hasShape({a: 23, b: 'hello'}, shape, options)).toBe(result);
        });
    });

    withInput('array as shape', () => {
        const shape = 'array';
        it(`returns true for any array element`, () => {
            const result = true;
            expect(hasShape([], shape, options)).toBe(result);
            expect(hasShape([1, 2, 3], shape, options)).toBe(result);
            expect(hasShape(['A', 'B'], shape, options)).toBe(result);
            expect(hasShape(['A', 3, 9n], shape, options)).toBe(result);
            expect(hasShape([{a: 1}, { b: 'hello'}], shape, options)).toBe(result);
        });
        it(`returns false for non ${shape} element`, () => {
            const result = false;
            expect(hasShape(undefined, shape, options)).toBe(result);
            expect(hasShape(10, shape, options)).toBe(result);
            expect(hasShape(100n, shape, options)).toBe(result);
            expect(hasShape(false, shape, options)).toBe(result);
            expect(hasShape('hello', shape, options)).toBe(result);
            expect(hasShape(null, shape, options)).toBe(result);
            expect(hasShape(/abc/, shape, options)).toBe(result);
            expect(hasShape(() => {}, shape, options)).toBe(result);
            expect(hasShape(Symbol('symbol'), shape, options)).toBe(result);
            expect(hasShape(Buffer.from('abc'), shape, options)).toBe(result);
            expect(hasShape(new Promise((a,b) => {}), shape, options)).toBe(result);
            expect(hasShape(new CustomClass(5), shape, options)).toBe(result);
            expect(hasShape(new Number(5), shape, options)).toBe(result);
            expect(hasShape(new String('hello'), shape, options)).toBe(result);
            expect(hasShape(new Boolean(false), shape, options)).toBe(result);
            expect(hasShape({a: 23, b: 'hello'}, shape, options)).toBe(result);
        });
    });

    withInput('object as shape', () => {
        const shape = 'object';
        it(`returns true for any ${shape} element`, () => {
            const result = true;
            expect(hasShape({}, shape, options)).toBe(result);
            expect(hasShape({a: 23, b: 'hello'}, shape, options)).toBe(result);
        });
        it(`returns true for null element`, () => {
            const result = true;
            expect(hasShape(null, shape, options)).toBe(result);
        });
        it(`returns true for regexp element`, () => {
            const result = true;
            expect(hasShape(/a/, shape, options)).toBe(result);
            expect(hasShape(/abc/g, shape, options)).toBe(result);
            expect(hasShape(RegExp('a'), shape, options)).toBe(result);
            expect(hasShape(RegExp('abc', 'g'), shape, options)).toBe(result);
            expect(hasShape(new RegExp('a'), shape, options)).toBe(result);
            expect(hasShape(new RegExp('abc', 'g'), shape, options)).toBe(result);
        });
        it(`returns true for buffer element`, () => {
            const result = true;
            expect(hasShape(Buffer.from('abc', 'utf-8'), shape, options)).toBe(result);
            expect(hasShape(Buffer.from(''), shape, options)).toBe(result);
        });
        it(`returns true for promise element`, () => {
            const result = true;
            expect(hasShape(new Promise(() => {}), shape, options)).toBe(result);
            expect(hasShape(new Promise((accept, reject) => {}), shape, options)).toBe(result);
        });
        it(`returns true for any custom class element`, () => {
            const result = true;
            expect(hasShape(new CustomClass(5), shape, options)).toBe(result);
        });
        it(`returns ${!options.unwrapBaseShapes ? 'true' : 'false'} for any wrapped element`, () => {
            const result = !options.unwrapBaseShapes;
            expect(hasShape(new Number(5), shape, options)).toBe(result);
            expect(hasShape(new String('hello'), shape, options)).toBe(result);
            expect(hasShape(new Boolean(false), shape, options)).toBe(result);
        });
        it(`returns true for any array element`, () => {
            const result = true;
            expect(hasShape([], shape, options)).toBe(result);
            expect(hasShape([1, 2, 3], shape, options)).toBe(result);
            expect(hasShape(['A', 'B'], shape, options)).toBe(result);
            expect(hasShape(['A', 3, 9n], shape, options)).toBe(result);
            expect(hasShape([{a: 1}, { b: 'hello'}], shape, options)).toBe(result);
        });
        it(`returns true for any function element`, () => {
            const result = true;
            expect(hasShape(() => {}, shape, options)).toBe(result);
            expect(hasShape(function() {}, shape, options)).toBe(result);
            expect(hasShape((a: number, b: number) => a + b, shape, options)).toBe(result);
            expect(hasShape((a: number, b: number) => {return a + b}, shape, options)).toBe(result);
        });
        it(`returns false for non ${shape} element`, () => {
            const result = false;
            expect(hasShape(undefined, shape, options)).toBe(result);
            expect(hasShape(10, shape, options)).toBe(result);
            expect(hasShape(100n, shape, options)).toBe(result);
            expect(hasShape(false, shape, options)).toBe(result);
            expect(hasShape('hello', shape, options)).toBe(result);
            expect(hasShape(Symbol('symbol'), shape, options)).toBe(result);
        });
    });

    withInput('any as shape', () => {
        const shape = 'any';
        it(`returns true for any element`, () => {
            const result = true
            expect(hasShape(undefined, shape, options)).toBe(result);
            expect(hasShape(10, shape, options)).toBe(result);
            expect(hasShape(100n, shape, options)).toBe(result);
            expect(hasShape(false, shape, options)).toBe(result);
            expect(hasShape('hello', shape, options)).toBe(result);
            expect(hasShape(null, shape, options)).toBe(result);
            expect(hasShape(/abc/, shape, options)).toBe(result);
            expect(hasShape(() => {}, shape, options)).toBe(result);
            expect(hasShape(Symbol('symbol'), shape, options)).toBe(result);
            expect(hasShape(Buffer.from('abc'), shape, options)).toBe(result);
            expect(hasShape(new Promise((a,b) => {}), shape, options)).toBe(result);
            expect(hasShape(new CustomClass(5), shape, options)).toBe(result);
            expect(hasShape(new Number(5), shape, options)).toBe(result);
            expect(hasShape(new String('hello'), shape, options)).toBe(result);
            expect(hasShape(new Boolean(false), shape, options)).toBe(result);
            expect(hasShape([1, 2, 3], shape, options)).toBe(result);
            expect(hasShape({a: 23, b: 'hello'}, shape, options)).toBe(result);
        });
    });

    // Array as shapes
    withInput('an array of any as shape', () => {
        const shape: Shape = ['any'];
        it(`returns true for array elements`, () => {
            const result = true
            expect(hasShape([], shape, options)).toBe(result);
            expect(hasShape([1, 2, 3], shape, options)).toBe(result);
            expect(hasShape(['A', 'B'], shape, options)).toBe(result);
            expect(hasShape(['A', 3, 9n], shape, options)).toBe(result);
            expect(hasShape([{a: 1}, { b: 'hello'}], shape, options)).toBe(result);
        });
        it(`returns false for non array elements`, () => {
            const result = false
            expect(hasShape(undefined, shape, options)).toBe(result);
            expect(hasShape(10, shape, options)).toBe(result);
            expect(hasShape(100n, shape, options)).toBe(result);
            expect(hasShape(false, shape, options)).toBe(result);
            expect(hasShape('hello', shape, options)).toBe(result);
            expect(hasShape(null, shape, options)).toBe(result);
            expect(hasShape(/abc/, shape, options)).toBe(result);
            expect(hasShape(() => {}, shape, options)).toBe(result);
            expect(hasShape(Symbol('symbol'), shape, options)).toBe(result);
            expect(hasShape(Buffer.from('abc'), shape, options)).toBe(result);
            expect(hasShape(new Promise((a,b) => {}), shape, options)).toBe(result);
            expect(hasShape(new CustomClass(5), shape, options)).toBe(result);
            expect(hasShape(new Number(5), shape, options)).toBe(result);
            expect(hasShape(new String('hello'), shape, options)).toBe(result);
            expect(hasShape(new Boolean(false), shape, options)).toBe(result);
            expect(hasShape({a: 23, b: 'hello'}, shape, options)).toBe(result);
        });
    });
    withInput('a specific array as shape', () => {
        it(`returns true for array elements whose inner type matches the inner shape`, () => {
            const result = true;
            expect(hasShape([], ['any'], options)).toBe(result);
            expect(hasShape([1, 2, 3, 4.0], ['int'], options)).toBe(result);
            expect(hasShape(['A', 'B'], ['string'], options)).toBe(result);
            expect(hasShape([3.1, 3, Number.NaN], ['number'], options)).toBe(result);
            expect(hasShape([{a: 1}, { b: 'hello'}], ['object'], options)).toBe(result);
            expect(hasShape([3.5, 9.123], ['float'], options)).toBe(result);
            expect(hasShape([/as/, /sd/], ['regexp'], options)).toBe(result);
            expect(hasShape([Symbol('A'), Symbol('B')], ['symbol'], options)).toBe(result);
            expect(hasShape([/as/, /sd/], ['object'], options)).toBe(result);
            expect(hasShape([/as/, () => {}, {}], ['object'], options)).toBe(result);
        });
        it(`returns false for arrays that do not match the type`, () => {
            const result = false
            expect(hasShape([1, 2, 3, 4.0], ['float'], options)).toBe(result);
            expect(hasShape(['A', 'B'], ['object'], options)).toBe(result);
            expect(hasShape([3.1, 3, 9n], ['object'], options)).toBe(result);
            expect(hasShape([{a: 1}, { b: 'hello'}], ['array'], options)).toBe(result);
            expect(hasShape([3.5, 9.123], ['string'], options)).toBe(result);
            expect(hasShape([/as/, /sd/], ['string'], options)).toBe(result);
            expect(hasShape([Symbol('A'), Symbol('B')], ['number'], options)).toBe(result);
        });
    });

    // Objects
    withInput('an object as shape', () => {
        it(`returns true for array elements whose inner type matches the inner shape`, () => {
            const result = true;
            expect(hasShape([], ['any'], options)).toBe(result);
            expect(hasShape([1, 2, 3, 4.0], ['int'], options)).toBe(result);
            expect(hasShape(['A', 'B'], ['string'], options)).toBe(result);
            expect(hasShape([3.1, 3, Number.NaN], ['number'], options)).toBe(result);
            expect(hasShape([{a: 1}, { b: 'hello'}], ['object'], options)).toBe(result);
            expect(hasShape([3.5, 9.123], ['float'], options)).toBe(result);
            expect(hasShape([/as/, /sd/], ['regexp'], options)).toBe(result);
            expect(hasShape([Symbol('A'), Symbol('B')], ['symbol'], options)).toBe(result);
            expect(hasShape([/as/, /sd/], ['object'], options)).toBe(result);
            expect(hasShape([/as/, () => {}, {}], ['object'], options)).toBe(result);
        });
        it(`returns false for arrays that do not match the type`, () => {
            const result = false
            expect(hasShape([1, 2, 3, 4.0], ['float'], options)).toBe(result);
            expect(hasShape(['A', 'B'], ['object'], options)).toBe(result);
            expect(hasShape([3.1, 3, 9n], ['object'], options)).toBe(result);
            expect(hasShape([{a: 1}, { b: 'hello'}], ['array'], options)).toBe(result);
            expect(hasShape([3.5, 9.123], ['string'], options)).toBe(result);
            expect(hasShape([/as/, /sd/], ['string'], options)).toBe(result);
            expect(hasShape([Symbol('A'), Symbol('B')], ['number'], options)).toBe(result);
        });
    });
    withInput('union shape "number | string" as string', () => {
        const shape = 'number | string'
        it(`returns true for values that are either number or string`, () => {
            const result = true;
            expect(hasShape(1, shape, options)).toBe(result);
            expect(hasShape('hello', shape, options)).toBe(result);
            expect(hasShape(Number(1), shape, options)).toBe(result);
            expect(hasShape(String('hello'), shape, options)).toBe(result);
        });
        it(`returns ${options.unwrapBaseShapes} for values that are wrapped number or string`, () => {
            const result = options.unwrapBaseShapes;
            expect(hasShape(new Number(1), shape, options)).toBe(result);
            expect(hasShape(new String('hello'), shape, options)).toBe(result);
        });
        it(`returns false for values that are not either number or string`, () => {
            const result = false;
            expect(hasShape(1n, shape, options)).toBe(result);
            expect(hasShape(/hello/, shape, options)).toBe(result);
            expect(hasShape(Symbol('hello'), shape, options)).toBe(result);
            expect(hasShape(Buffer.from('hello'), shape, options)).toBe(result);
            expect(hasShape(() => {}, shape, options)).toBe(result);
            expect(hasShape(new Promise(() => {}), shape, options)).toBe(result);
            expect(hasShape(false, shape, options)).toBe(result);
            expect(hasShape(new Boolean(false), shape, options)).toBe(result);
            expect(hasShape(new CustomClass(5), shape, options)).toBe(result);
        });
    });
    withInput('union shape "bigint | regexp" as string', () => {
        const shape = 'bigint | regexp'
        it(`returns true for values that are either bigint or regexp`, () => {
            const result = true;
            expect(hasShape(1n, shape, options)).toBe(result);
            expect(hasShape(/hello/, shape, options)).toBe(result);
            expect(hasShape(BigInt(1), shape, options)).toBe(result);
            expect(hasShape(RegExp('hello'), shape, options)).toBe(result);
        });
        it(`returns false for values that are either number or string`, () => {
            const result = false;
            expect(hasShape(1, shape, options)).toBe(result);
            expect(hasShape('hello', shape, options)).toBe(result);
            expect(hasShape(Buffer.from('hello'), shape, options)).toBe(result);
            expect(hasShape(Symbol('hello'), shape, options)).toBe(result);
            expect(hasShape(() => {}, shape, options)).toBe(result);
            expect(hasShape(new Promise(() => {}), shape, options)).toBe(result);
            expect(hasShape(false, shape, options)).toBe(result);
            expect(hasShape(new Number(1), shape, options)).toBe(result);
            expect(hasShape(new String('hello'), shape, options)).toBe(result);
            expect(hasShape(new Boolean(false), shape, options)).toBe(result);
            expect(hasShape(new CustomClass(5), shape, options)).toBe(result);
        });
    });
    withInput('union shape "bigint | regexp" as string', () => {
        const shape = 'number | string | bigint';
        it(`returns true for values that are either number or string or bigint`, () => {
            const result = true;
            expect(hasShape(1, shape, options)).toBe(result);
            expect(hasShape('hello', shape, options)).toBe(result);
            expect(hasShape(1n, shape, options)).toBe(result);
            expect(hasShape(Number(1), shape, options)).toBe(result);
            expect(hasShape(String('hello'), shape, options)).toBe(result);
            expect(hasShape(BigInt(1), shape, options)).toBe(result);
        });
        it(`returns false for values that are not either number or string or bigint`, () => {
            const result = false;
            expect(hasShape(Buffer.from('hello'), shape, options)).toBe(result);
            expect(hasShape(() => {}, shape, options)).toBe(result);
            expect(hasShape(new Promise(() => {}), shape, options)).toBe(result);
            expect(hasShape(false, shape, options)).toBe(result);
            expect(hasShape(new Boolean(false), shape, options)).toBe(result);
            expect(hasShape(new CustomClass(5), shape, options)).toBe(result);
        });
    });
    withInput('union shapes as arrays', () => {
        withInput('union shape [number, string] as string', () => {
            const shape = ['number', 'string'] as Shape;
            it(`returns true for values that are either number or string`, () => {
                const result = true;
                expect(hasShape(1, shape, options)).toBe(result);
                expect(hasShape('hello', shape, options)).toBe(result);
                expect(hasShape(Number(1), shape, options)).toBe(result);
                expect(hasShape(String('hello'), shape, options)).toBe(result);
            });
            it(`returns ${options.unwrapBaseShapes} for values that are wrapped number or string`, () => {
                const result = options.unwrapBaseShapes;
                expect(hasShape(new Number(1), shape, options)).toBe(result);
                expect(hasShape(new String('hello'), shape, options)).toBe(result);
            });
            it(`returns false for values that are not either number or string`, () => {
                const result = false;
                expect(hasShape(1n, shape, options)).toBe(result);
                expect(hasShape(/hello/, shape, options)).toBe(result);
                expect(hasShape(Symbol('hello'), shape, options)).toBe(result);
                expect(hasShape(Buffer.from('hello'), shape, options)).toBe(result);
                expect(hasShape(() => {}, shape, options)).toBe(result);
                expect(hasShape(new Promise(() => {}), shape, options)).toBe(result);
                expect(hasShape(false, shape, options)).toBe(result);
                expect(hasShape(new Boolean(false), shape, options)).toBe(result);
                expect(hasShape(new CustomClass(5), shape, options)).toBe(result);
            });
        });
        withInput('union shape [bigint | regexp] as string', () => {
            const shape: Shape = ['bigint', 'regexp'];
            it(`returns true for values that are either bigint or regexp`, () => {
                const result = true;
                expect(hasShape(1n, shape, options)).toBe(result);
                expect(hasShape(/hello/, shape, options)).toBe(result);
                expect(hasShape(BigInt(1), shape, options)).toBe(result);
                expect(hasShape(RegExp('hello'), shape, options)).toBe(result);
            });
            it(`returns false for values that are either number or string`, () => {
                const result = false;
                expect(hasShape(1, shape, options)).toBe(result);
                expect(hasShape('hello', shape, options)).toBe(result);
                expect(hasShape(Buffer.from('hello'), shape, options)).toBe(result);
                expect(hasShape(Symbol('hello'), shape, options)).toBe(result);
                expect(hasShape(() => {}, shape, options)).toBe(result);
                expect(hasShape(new Promise(() => {}), shape, options)).toBe(result);
                expect(hasShape(false, shape, options)).toBe(result);
                expect(hasShape(new Number(1), shape, options)).toBe(result);
                expect(hasShape(new String('hello'), shape, options)).toBe(result);
                expect(hasShape(new Boolean(false), shape, options)).toBe(result);
                expect(hasShape(new CustomClass(5), shape, options)).toBe(result);
            });
        });
        withInput('union shape [number, string, bigint] as string', () => {
            const shape = ['number', 'string', 'bigint'] as Shape;
            it(`returns true for values that are either number or string or bigint`, () => {
                const result = true;
                expect(hasShape(1, shape, options)).toBe(result);
                expect(hasShape('hello', shape, options)).toBe(result);
                expect(hasShape(1n, shape, options)).toBe(result);
                expect(hasShape(Number(1), shape, options)).toBe(result);
                expect(hasShape(String('hello'), shape, options)).toBe(result);
                expect(hasShape(BigInt(1), shape, options)).toBe(result);
            });
            it(`returns false for values that are not either number or string or bigint`, () => {
                const result = false;
                expect(hasShape(Buffer.from('hello'), shape, options)).toBe(result);
                expect(hasShape(() => {}, shape, options)).toBe(result);
                expect(hasShape(new Promise(() => {}), shape, options)).toBe(result);
                expect(hasShape(false, shape, options)).toBe(result);
                expect(hasShape(new Boolean(false), shape, options)).toBe(result);
                expect(hasShape(new CustomClass(5), shape, options)).toBe(result);
            });
        });
    });
};


describe('hasShape', () => {
    given('options contains unwrapBaseShapes as false', () => {
        testBasicShapesWithOptions({ unwrapBaseShapes: false })
    });
    given('options contains unwrapBaseShapes as false', () => {
        testBasicShapesWithOptions({ unwrapBaseShapes: true })
    });
    given('options contains exactShape as false', () => {
        const options = { exactShape: false };
        withInput('complex object shape', () => {
            it('returns true for object of exact same shape', () => {
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

                const shape: Shape = {
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

                expect(hasShape(obj, shape, options)).toBe(true);
            });
            it('returns true for object of bigger shape', () => {
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
                    },
                    c2: {
                        a: 'extra object'
                    }
                };

                const shape: Shape = {
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

                expect(hasShape(obj, shape, options)).toBe(true);
            });
            it('returns false for object of smaller shape', () => {
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
                    b1: 'B1',
                    b2: new Number(123.456),
                    b3: new CustomClass(5),
                    c1: {
                        c1_1: new String('C1_1_X'),
                        c1_3: [
                            null,
                            {c1_3_1: 'C1_1_1_X'},
                            'C1_3_X'
                        ],
                    }
                };

                const shape: Shape = {
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

                expect(hasShape(obj, shape, options)).toBe(false);
            });
        });
    });
    given('options contains exactShape as true', () => {
        const options = { exactShape: true };
        withInput('complex object shape', () => {
            it('returns true for object of exact same shape', () => {
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
                        {a3_1: 'A3_X'},
                        {a3_1: 'A3_Y'},
                        {a3_1: 'A3_Z'}
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

                const shape: Shape = {
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

                expect(hasShape(obj, shape, options)).toBe(true);
            });
            it('returns true for object of bigger shape', () => {
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
                    },
                    c2: {
                        a: 'extra object'
                    }
                };

                const shape: Shape = {
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

                expect(hasShape(obj, shape, options)).toBe(false);
            });
            it('returns false for object of smaller shape', () => {
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
                    b1: 'B1',
                    b2: new Number(123.456),
                    b3: new CustomClass(5),
                    c1: {
                        c1_1: new String('C1_1_X'),
                        c1_3: [
                            null,
                            {c1_3_1: 'C1_1_1_X'},
                            'C1_3_X'
                        ],
                    }
                };

                const shape: Shape = {
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

                expect(hasShape(obj, shape, options)).toBe(false);
            });
        });
    });
});
