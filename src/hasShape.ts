/**
 * @author Alan Rodas Bonjour <alanrodas@gmail.com>
 */
import { shapeOf } from './shapeOf';
import { ArrayShape, BaseShape, ObjectShape, Shape } from './types';
import { baseShapesHierarchy } from './unification';

/**
 * This interface represent the options that can be given to the
 * {@link hasShape} function.
 */
export interface HasShapeOptions {
    unwrapBaseShapes: boolean;
    exactShape: boolean;
}

/**
 * The default options to use when using {@link hasShape} function.
 */
const defaultHasShapeOptions: HasShapeOptions = {
    unwrapBaseShapes: true,
    exactShape: false
};

/**
 * Answers if the given value has the particular base shape.
 *
 * @remarks
 * Any value may have a base shape. The way to check if it has a base shape
 * is by obtaining the base shape of the value, and then attempting to check
 * if such shape unifies with the given one by traversing the base hierarchy
 * tree.
 *
 * @param value - The value to check if it has the base shape.
 * @param shape - The base shape to check for matching.
 * @param options - The options to use when attempting to match.
 *
 * @returns `true` if it has the shape, `false` otherwise.
 */
const hasBaseShape = (value: unknown, shape: BaseShape, options: HasShapeOptions): boolean => {
    const baseShapeOfObj = shapeOf(value, {
        useFullObjectShapes: false,
        unwrapBaseShapes: options.unwrapBaseShapes
    }) as BaseShape;
    let currentShape = baseShapeOfObj;
    while (currentShape) {
        if (currentShape === shape) return true;
        currentShape = baseShapesHierarchy[currentShape];
    }
    return false;
};

/**
 * Answers if the given value has the particular array shape.
 *
 * @remarks
 * An array shape is an array containing a sole value, that is a shape.
 * Only array values may have an array shape, which happens if all values
 * in the array value have the array shape's inner shape.
 *
 * @param value - The value to check if it has the array shape.
 * @param shape - The array shape to check for matching.
 * @param options - The options to use when attempting to match.
 *
 * @returns `true` if it has the shape, `false` otherwise.
 */
const hasArrayShape = (value: unknown, shape: ArrayShape, options: HasShapeOptions): boolean => {
    if (!Array.isArray(value)) return false;
    if (value.length === 0) return true;
    const innerShape = shape[0];
    if (innerShape === 'any') return true;
    for (const each of value) {
        if (!hasShape(each, innerShape, options)) return false;
    }
    return true;
};

/**
 * Answers if the given value has the particular object shape.
 *
 * @remarks
 * Only object may have an object shape. Objects must, by default, have
 * at least the given shape.
 *
 * If the options contains the `exactShape` attribute as `false`, then
 * we attempt to check if the value has at least the attributes in the
 * shape (although it may have more). If `true` is used, then exactly the
 * attributes in the shape, and no more are expected.
 *
 * @param value - The value to check if it has the object shape.
 * @param shape - The object shape to check for matching.
 * @param options - The options to use when attempting to match.
 *
 * @returns `true` if it has the shape, `false` otherwise.
 */
const hasObjectShape = (value: unknown, shape: ObjectShape, options: HasShapeOptions): boolean => {
    // If the value is not an object, returns false
    if (typeof value !== 'object') return false;
    if (options.exactShape) {
        // If the exactShape used, then the same number of keys must be present
        if (Object.keys(value).length !== Object.keys(shape).length) return false;
    } else {
        // If the exactShape is false, then more or the same number of keys must be present
        if (Object.keys(value).length < Object.keys(shape).length) return false;
    }
    // Check that each key in the shape is present in the value
    for (const attrKey of Object.keys(shape)) {
        const attrValue = shape[attrKey] as Shape;
        if (!Object.prototype.hasOwnProperty.call(value, attrKey)) return false;
        if (attrValue === 'any') return true;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const objValue = value[attrKey];
        if (!hasShape(objValue, attrValue, options)) {
            return false;
        }
    }
    // All keys matched
    return true;
};

/**
 * Answers if the given value has any of the shapes given.
 *
 * @param value - The value to check if it has any of the given shapes.
 * @param shapes - The shapes to check for matching.
 * @param options - The options to use when attempting to match.
 *
 * @returns `true` if it has any of the shapes, `false` otherwise.
 */
const hasAnyShape = (value: unknown, shapes: Shape[], options?: Partial<HasShapeOptions>): boolean => {
    for (const shape of shapes) {
        if (hasShape(value, shape, options)) {
            return true;
        }
    }
    return false;
};

/**
 * Answer if the given value has the given shape.
 *
 * @remarks
 * The way in which an value is checked against the shape involves
 * multiple steps of following the unification process. Simple matching the
 * shape of the value with the given shape does not suffice. Read more
 * about hasShape and when to use it in the README file.
 *
 * @param value - The value to check if it has the given shapes.
 * @param shape - The shape to check for matching.
 * @param options - The options to use when attempting to match.
 *
 * @returns `true` if it has the given shape, `false` otherwise.
 */
export const hasShape = (value: unknown, shape: Shape, options?: Partial<HasShapeOptions>): boolean => {
    // Use default options overwritten with the given ones
    const opts = Object.assign(defaultHasShapeOptions, options);

    if (typeof shape === 'string') {
        // Using a string as a shape
        if (shape.includes('|')) {
            // It contains a | character, so it represents a union shape
            const shapes = shape.split('|').map((e) => e.trim() as Shape);
            return hasAnyShape(value, shapes, opts);
        } else {
            // Using a base shape
            return hasBaseShape(value, shape as BaseShape, opts);
        }
    }
    if (Array.isArray(shape)) {
        // Using an array as a shape
        if (shape.length > 1) {
            // If the array has more than one value, then it represents a union shape
            return hasAnyShape(value, shape, opts);
        } else {
            // If not, it's a simple array
            return hasArrayShape(value, shape as ArrayShape, opts);
        }
    }
    if (typeof shape === 'object') {
        // Using an object as a shape
        return hasObjectShape(value, shape, opts);
    }
    // The shape is not valid, returns false
    return false;
};
