/**
 * This file is the one that runs when you perform a
 * npm start dev. It just imports some classes and prints
 * the result in console. If you are writing a library you
 * will probably just relay on a re-export in this file,
 * but being able to run it may be useful for debugging.
 *
 * @ignore
 * @author Alan Rodas Bonjour <alanrodas@gmail.com>
 */
export * from './shapeOf';
export * from './hasShape';
export { Shape } from './types';
