/**
 * @author Alan Rodas Bonjour <alanrodas@gmail.com>
 */

/**
 * The builtin types used by JavaScript. This are the ones returned when
 * using the "typeof" operator.
 * @private
 */
type BuiltinType = 'boolean' | 'number' | 'bigint' | 'string' | 'symbol' | 'object' | 'undefined' | 'function';

/**
 * This are extra shapes that represent numeric values, to distinguish them
 * one from each other. For all of this shapes, using "typeof" would return "number".
 * @private
 */
type NumericShape = 'int' | 'float' | 'nan' | 'infinity';

/**
 * This are extra shapes used to represent objects, to distinguish them from each
 * other. For all of this shapes, using "typeof" would return "object".
 * @private
 */
type BuiltinObjectShape = 'null' | 'array' | 'regexp' | 'buffer' | 'promise';

/**
 * This is the shape used to distinguish the builtin wrapper object elements.
 * When using "typeof" it returns "object", but this objects just wrap around
 * a builtin element such as numbers, strings or booleans, and are converted
 * automatically by the engine to their corresponding unwrapped types when needed.
 * This shape is used internally to distinguish such objects, but the recommendation
 * is not to rely on this shape.
 * @private
 */
type WrapperShape = 'wrapper';

/**
 * This is the shape used to distinguish the objects that have apparently been
 * created out of a custom class or function constructor, other than the builtin,
 * wrapper, and base objects. Note that some browser builtin classes, such as
 * HTMLNode, or XMLRequest, may also be interpreted as an instance.
 * When identifying an instance, nothing else is said, so you should check the
 * actual constructor in order to know the full shape of the object.
 * @private
 */
type InstanceShape = 'instance';

/**
 * This is the shape used as the base of the hierarchy. Any shape can be converted
 * to an "any" when unifying. This exists only in "shapeOf", as using the "typeof"
 * operator, may yield different results depending on the value itself.
 * @private
 */
type AnyShape = 'any';

/**
 * The base shape represents the basic shapes any value can take.
 */
export type BaseShape = BuiltinType | AnyShape | NumericShape | BuiltinObjectShape | WrapperShape | InstanceShape;

/**
 * An array shape represents the idea of a more complex, structured shape.
 * It consists of an array with a single element inside, that is, in itself,
 * a shape.
 */
export type ArrayShape = [Shape];

/**
 * This is a helper type to represent the recursiveness of an object shape.
 * @private
 */
type RecursiveObjShape<T> = Record<string, BaseShape | T>;

/**
 * An object shape represents the idea of a more complex, structured shape.
 * It consist of an object whose attributes represents attributes of the value
 * itself, and the values, represent shapes.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ObjectShape extends RecursiveObjShape<Shape> {}

/**
 * A helper type to join two types through a string
 *
 * @private
 */
type Join<K, P, S extends string> = K extends string | number
    ? P extends string | number
        ? `${K}${'' extends P ? '' : S}${P}`
        : never
    : never;

/**
 * A union shape of base shapes.
 * @private
 */
type BaseUnionShape = Join<BaseShape, BaseShape, ' | '> | Join<Join<BaseShape, BaseShape, ' | '>, BaseShape, ' | '>;

/**
 * A union shape expressed in an array
 * @private
 */
type ArrayUnionShape = Shape[];

/**
 * A union shape that represents a shape that may take any of the possibles
 */
export type UnionShape = BaseUnionShape | ArrayUnionShape;

/**
 * A shape may be a basic shape, an object shape, or an array shape.
 */
export type Shape = BaseShape | ArrayShape | ObjectShape | UnionShape;
