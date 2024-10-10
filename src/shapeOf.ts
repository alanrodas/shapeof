/**
 * @author Alan Rodas Bonjour <alanrodas@gmail.com>
 */
import { Shape } from './types';
import { unifyAll } from './unification';

/**
 * This interface represent the options that can be given to the
 * {@link shapeOf} function.
 */
export interface ShapeOfOptions {
    useFullObjectShapes: boolean;
    unwrapBaseShapes: boolean;
}

/**
 * The default options to use when using {@link shapeOf} function.
 */
const defaultShapeOfOptions: ShapeOfOptions = {
    useFullObjectShapes: false,
    unwrapBaseShapes: true
};

/**
 * Return the shape of the given number value.
 *
 * @remarks
 * The shape of a number is always a numeric shape. It may be any of 'int', 'nan',
 * 'infinity' or 'float'. 'number' is never returned, although all of this shapes
 * do unify with 'number'.
 *
 * @param value - The value to obtain the shape of
 * @param _options - The options to use when obtaining the shape
 *
 * @returns The shape of the given value
 */
const shapeOfNumber = (value: number, _options: ShapeOfOptions): Shape => {
    if (Number.isInteger(value)) return 'int';
    if (Number.isNaN(value)) return 'nan';
    if (!Number.isFinite(value)) return 'infinity';
    return 'float';
};

/**
 * Return the shape of the given array value.
 *
 * @remarks
 * Note that the shape of an array value is just 'array', when the option
 * attribute `useFullObjectShapes` is `false` (default) but it's an array shape
 * that it's calculated by unifying all the values in the array to a particular
 * shape if `useFullObjectShapes` is `true`.
 * In this regard, bear in mind that traversing all the elements in the array
 * to obtains and unify their shapes is a costly operation. You should do that
 * only when needed.
 *
 * @param value - The value to obtain the shape of
 * @param options - The options to use when obtaining the shape
 *
 * @returns The shape of the given value
 */
const shapeOfArray = (value: unknown[], options: ShapeOfOptions): Shape => {
    if (options.useFullObjectShapes) {
        if (value.length === 0) return ['any'];
        if (value.length === 1) return [shapeOf(value[0])];
        const unified = unifyAll(value.map((e) => shapeOf(e, options)));
        return [unified];
    }
    return 'array';
};

/**
 * Return the shape of the given object value.
 *
 * @remarks
 * Note that the shape of an object value (that is not an array) depends on
 * multiple factors. `null` will be the sole value having the 'null' shape.
 *
 * For well known objects, such as regular expressions, buffers and promises,
 * there are built-in object shapes (arrays are also included, but treated
 * separately from this function).
 *
 * If the value is an instance of a wrapper type
 * then the option `unwrapBaseShapes` is checked. If `true` (the default), then
 * the shape of the wrapped value is used, if `false` the shape 'wrapper' is used.
 *
 * For instances of other classes or constructor functions, the 'instance' shape
 * is used.
 *
 * If any of the above is matched, then the `useFullObjectShapes` is checked.
 * When `false` (default) the 'object' shape is used. When `true` then a complex
 * object shape is returned. This shape will contain all attributes of the given
 * value, and in each of them, the expected shape of the value in that attribute.
 * This implies traversing the object, and recursively traversing all attributes
 * of the object, which may be really costly. Also, bear in mind that circular
 * references will cause this process to hang. You should only ask for full
 * object shapes then it's really needed, and rely on basic shapes whenever possible.
 *
 * @param value - The value to obtain the shape of
 * @param options - The options to use when obtaining the shape
 *
 * @returns The shape of the given value
 */
const shapeOfObject = (value: unknown, options: ShapeOfOptions): Shape => {
    // eslint-disable-next-line no-null/no-null
    if (value === null) return 'null';
    if (Buffer.isBuffer(value)) return 'buffer';
    if (value instanceof RegExp) return 'regexp';

    if (options.unwrapBaseShapes) {
        // wrapped objects are treated as primitives
        if (value instanceof Number) return shapeOfNumber(value.valueOf(), options);
        if (value instanceof Boolean) return 'boolean';
        if (value instanceof String) return 'string';
        if (value instanceof Symbol) return 'symbol';
        if (value instanceof BigInt) return 'bigint';
    }

    if (
        value !== undefined &&
        (value as { then?: unknown }).then !== undefined &&
        typeof (value as { then: unknown }).then === 'function' &&
        ((value as { then: unknown }).then as { length: number }).length === 2
    )
        return 'promise';

    if (
        value?.constructor?.name !== undefined &&
        ['Number', 'Boolean', 'String', 'Symbol', 'BigInt'].includes(value.constructor.name)
    )
        return 'wrapper';

    if (value?.constructor?.name !== undefined && !['Object', 'Array'].includes(value.constructor.name))
        return 'instance';

    if (options.useFullObjectShapes) {
        const shape: unknown = {};
        for (const key of Object.keys(value)) {
            shape[key] = shapeOf(value[key], options);
        }
        return shape as Shape;
    }

    return 'object';
};

/**
 *  Return the shape of the given value
 *
 * @remarks
 * The way in which a the shape of an object is calculated and returned may vary
 * according to different options. Read more about shapeOf and when to use it
 * in the README file.
 *
 * @param value - The value to obtain the shape of
 * @param options - The options to use when obtaining the shape
 *
 * @returns The shape of the given value
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const shapeOf = (value: any, options?: Partial<ShapeOfOptions>): Shape => {
    const opts = Object.assign(defaultShapeOfOptions, options);

    if (typeof value === 'number') return shapeOfNumber(value, opts);
    if (Array.isArray(value)) return shapeOfArray(value, opts);
    if (typeof value === 'object') return shapeOfObject(value, opts);
    return typeof value;
};
