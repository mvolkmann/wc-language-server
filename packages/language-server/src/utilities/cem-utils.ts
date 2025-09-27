/* eslint-disable @typescript-eslint/no-explicit-any */
import type * as cem from "custom-elements-manifest/schema.js";
import { removeQuotes } from "@wc-toolkit/cem-utilities";
// import * as fs from 'fs';

export const EXCLUDED_TYPES = [
  "any",
  "bigint",
  "boolean",
  "never",
  "null",
  "number",
  "string",
  "Symbol",
  "undefined",
  "unknown",
  "object",
  "void",
  "Function",
  "Date",
  "Array",
  "RegExp",
  "Error",
  "Promise",
  "Map",
  "Set",
  "WeakMap",
  "WeakSet",
  "ArrayBuffer",
  "DataView",
  "Int8Array",
  "Uint8Array",
  "Uint8ClampedArray",
  "Int16Array",
  "Uint16Array",
  "Int32Array",
  "Uint32Array",
  "Float32Array",
  "Float64Array",
  "BigInt64Array",
  "BigUint64Array",
];

/**
 * Extracts attribute value options from a CEM attribute definition.
 * Returns primitive type names for simple types or arrays of literal values for union types.
 * @param attr - CEM attribute object
 * @param typeSrc - Property name of the type source (defaults to "parsedType")
 * @returns Primitive type name or array of literal values
 */
export function parseAttributeValueOptions(
  attr: cem.Attribute,
  typeSrc: string = "parsedType",
): string[] | string {
  const value: string = (attr as any)[`${typeSrc}`]?.text || attr.type?.text;

  // Handle primitive types
  if (value === "boolean" || value === "string" || value === "number") {
    return value;
  }

  // Handle non-union types
  if (!value?.includes("|")) {
    return "string";
  }

  // Handle union types
  const splitValues = value.split("|").map((v) => v.trim());

  // If union contains boolean or string, return that primitive type
  if (splitValues.includes("boolean")) {
    return "boolean";
  }

  if (splitValues.includes("string")) {
    return "string";
  }

  if (splitValues.includes("number")) {
    return "number";
  }

  // Extract literal values (excluding JS primitives)
  const literalValues = splitValues
    .filter((type) => !EXCLUDED_TYPES.includes(type))
    .map((type) => removeQuotes(type))
    .filter(Boolean);

  return literalValues.length ? literalValues : "string";
}
