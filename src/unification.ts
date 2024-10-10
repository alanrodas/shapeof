/**
 * @author Alan Rodas Bonjour <alanrodas@gmail.com>
 */

import { ArrayShape, BaseShape, ObjectShape, Shape } from './types';

/**
 * The base shape hierarchy.
 *
 * @private
 */
export const baseShapesHierarchy: Record<BaseShape, BaseShape> = {
    // any type (nothing above any)
    any: undefined,
    // base types of typeof
    boolean: 'any',
    number: 'any',
    bigint: 'any',
    string: 'any',
    symbol: 'any',
    object: 'any',
    undefined: 'any',
    // number hierarchy
    int: 'number',
    float: 'number',
    nan: 'number',
    infinity: 'number',
    // object hierarchy
    array: 'object',
    regexp: 'object',
    buffer: 'object',
    function: 'object',
    promise: 'object',
    null: 'object',
    wrapper: 'object',
    instance: 'object'
};

/**
 * Return the shape that can be used to unify the two given base shapes, or undefined
 * if the unification did not succeed.
 *
 * @param shapeA - The first shape to unify
 * @param shapeB - The second shape to unify
 *
 * @returns The shape that may be used to unify both given shapes.
 *
 * @private
 */
const unifyBaseShape = (shapeA: BaseShape, shapeB: BaseShape): BaseShape | undefined => {
    const visitedShapesA = new Set<BaseShape>();

    let currentShapeA: BaseShape | undefined = shapeA;
    while (currentShapeA) {
        visitedShapesA.add(currentShapeA);
        currentShapeA = baseShapesHierarchy[currentShapeA];
    }

    let currentShapeB: BaseShape | undefined = shapeB;
    while (currentShapeB) {
        if (visitedShapesA.has(currentShapeB)) {
            return currentShapeB;
        }
        currentShapeB = baseShapesHierarchy[currentShapeB];
    }

    return undefined;
};

/**
 * Return the shape that can be used to unify the two given array shapes, or undefined
 * if the unification did not succeed.
 *
 * @remarks
 * Two array shapes unify if their inner shape unifies. So the unified shape is
 * an array shape with the inner shape unified.
 *
 * @param shapeA - The first shape to unify
 * @param shapeB - The second shape to unify
 *
 * @returns The shape that may be used to unify both given shapes.
 *
 * @private
 */
const unifyArrays = (shapeA: ArrayShape, shapeB: ArrayShape): Shape | undefined => {
    const unifiedElement = unify(shapeA[0], shapeB[0]);
    return unifiedElement ? [unifiedElement] : undefined;
};

/**
 * Returns the shape that can be used to unify the two object shapes, or undefined
 * if the unification did not succeed.
 *
 * @remarks
 * Two object shapes unify if all their attributes also unify. So the returned
 * shape contains all the attributes that are present in both object, with
 * a value that is the unification of the shapes of such attribute values.
 * Note that the most general shape is the one used for unification.
 *
 * @param shapeA - The first shape to unify
 * @param shapeB - The second shape to unify
 *
 * @returns The shape that may be used to unify both given shapes.
 *
 * @private
 */
const unifyObjects = (shapeA: ObjectShape, shapeB: ObjectShape): Shape | undefined => {
    // We know they are not arrays, as we discarded the case earlier
    const unifiedObject: ObjectShape = {};
    const keys = new Set([...Object.keys(shapeA), ...Object.keys(shapeB)]);

    for (const key of keys) {
        const shapeAValue = shapeA[key];
        const shapeBValue = shapeB[key];

        if (shapeAValue && shapeBValue) {
            const unifiedValue = unify(shapeAValue, shapeBValue);
            // Could not unify the attribute, they cannot be unified
            if (unifiedValue === undefined) return undefined;

            unifiedObject[key] = unifiedValue;
        }
    }
    return unifiedObject;
};

/**
 * Unify two shapes, returning the common shape between the two, or undefined
 * if the unification did not succeed.
 *
 * @remarks
 * In the worst case scenario, 'any' can be used to unify any other shape, as
 * it's the common ancestor to all elements. So undefined is not rally ever returned.
 *
 * @param shapeA - The first shape to unify
 * @param shapeB - The second shape to unify
 *
 * @returns The shape that may be used to unify both given shapes.
 *
 * @private
 */
export const unify = (shapeA: Shape, shapeB: Shape): Shape | undefined => {
    // Base shape unification
    if (typeof shapeA === 'string' && typeof shapeB === 'string') {
        // It may be a union shape
        const shapesA = shapeA.split('|').map((e) => e.trim() as Shape);
        const shapesB = shapeB.split('|').map((e) => e.trim() as Shape);
        const shapes = [...shapesA, ...shapesB];

        if (shapes.length === 2) {
            return unifyBaseShape(shapes[0] as BaseShape, shapes[1] as BaseShape);
        } else {
            return unifyAll(shapes);
        }
    }

    // Array unification
    if (Array.isArray(shapeA) && shapeB === 'array') return 'array';
    if (Array.isArray(shapeB) && shapeA === 'array') return 'array';
    if (Array.isArray(shapeA) && Array.isArray(shapeB)) return unifyArrays(shapeA as ArrayShape, shapeB as ArrayShape);
    if (Array.isArray(shapeA) || Array.isArray(shapeB)) return undefined;

    // Object unification
    if (typeof shapeA === 'object' && shapeB === 'object') return 'object';
    if (shapeA === 'object' && typeof shapeB === 'object') return 'object';
    if (typeof shapeA === 'object' && typeof shapeB === 'object') return unifyObjects(shapeA, shapeB);

    // Could not unify, unify as any
    return 'any';
};

/**
 * Unify all the given shapes, returning the common shape between them, or undefined
 * if the unification did not succeed.
 *
 * @param shapes - The shapes to unify
 *
 * @returns The shape that may be used to unify all given shapes.
 *
 * @private
 */
export const unifyAll = (shapes: Shape[]): Shape | undefined => {
    if (shapes.length === 0) return undefined;
    return shapes.reduce((a, b) => unify(a, b));
};
