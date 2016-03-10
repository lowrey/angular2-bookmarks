//Shamelessly stolen from https://github.com/lodash/lodash/blob/4.3.0/lodash.js
module TuilConsts {
  "use strict";
  export var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|([""])((?:(?!\2)[^\\]|\\.)*?)\2)\]/g;
  export var INFINITY = 1 / 0;
  export var reEscapeChar = /\\(\\)?/g;
  export var reIsDeepProp = /\.|\[(?:[^[\]]*|([""])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
  export var reIsPlainProp = /^\w*$/;
  export var MAX_SAFE_INTEGER = 9007199254740991;
  export var MAX_INTEGER = 1.7976931348623157e+308;
  export var NAN = 0 / 0;
}

export class Tuil {
  private static toString(value): string {
    // Exit early for strings to avoid a performance hit in some environments.
    if (typeof value == "string") {
      return value;
    }
    if (value == null) {
      return "";
    }
    var result = (value + "");
    return (result == "0" && (1 / value) == -TuilConsts.INFINITY) ? "-0" : result;
  }

  private static stringToPath(str: string) {
    var result = [];
    Tuil.toString(str).replace(TuilConsts.rePropName, function(match, num, quote, str) {
      result.push(quote ? str.replace(TuilConsts.reEscapeChar, "$1") : (num || match));
      return str;
    });
    return result;
  }

  private static baseToPath(value): any[] {
    return Array.isArray(value) ? value : Tuil.stringToPath(value);
  }

  private static isKey(value, object): boolean {
    if (typeof value == "number") {
      return true;
    }
    return !Array.isArray(value) &&
      (TuilConsts.reIsPlainProp.test(value) || !TuilConsts.reIsDeepProp.test(value) ||
        (object != null && value in Object(object)));
  }

  private static baseGet(object, path): any {
    path = Tuil.isKey(path, object) ? [path + ""] : Tuil.baseToPath(path);
    var index = 0,
      length = path.length;

    while (object != null && index < length) {
      object = object[path[index++]];
    }
    return (index && index == length) ? object : undefined;
  }

  public static get(object, path, defaultValue): any {
    var result = object == null ? undefined : Tuil.baseGet(object, path);
    return result === undefined ? defaultValue : result;
  }
}
