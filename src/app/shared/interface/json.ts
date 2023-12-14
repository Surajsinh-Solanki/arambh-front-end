// Define a recursive interface for JSON objects
export interface Json {
  [x: string]: Type; // A JSON object can have values of various types
}

// Define a type for JSON arrays
export type JsonArray = Array<Type>;

// Define a type that can be any of the specified types in JSON

export type Type =
  | string
  | number
  | boolean
  | Date
  | Json
  | null
  | symbol
  | JsonArray;

export type AllType =
  | string
  | number
  | boolean
  | Date
  | Json
  | null
  | symbol
  | bigint
  | RegExp
  | Function
  | object
  | void
  | JsonArray;
