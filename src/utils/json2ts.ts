import every from "lodash/every";
import includes from "lodash/includes";
import isArray from "lodash/isArray";
import isBoolean from "lodash/isBoolean";
import isDate from "lodash/isDate";
import isEqual from "lodash/isEqual";
import isNumber from "lodash/isNumber";
import isObject from "lodash/isObject";
import isString from "lodash/isString";
import keysIn from "lodash/keysIn";
import last from "lodash/last";
import partial from "lodash/partial";

function convertObjectToTsInterfaces(
  jsonContent: any,
  objectName = "RootObject"
): string {
  const optionalKeys: string[] = [];
  const objectResult: string[] = [];

  for (const key in jsonContent) {
    const value = jsonContent[key];

    if (isObject(value) && !isArray(value)) {
      const childObjectName = toUpperFirstLetter(key);
      objectResult.push(convertObjectToTsInterfaces(value, childObjectName));
      jsonContent[key] = removeMajority(childObjectName) + ";";
    } else if (isArray(value)) {
      const arrayTypes: any = detectMultiArrayTypes(value);

      if (isMultiArray(arrayTypes)) {
        const multiArrayBrackets = getMultiArrayBrackets(value);

        jsonContent[key] = isAllEqual(arrayTypes)
          ? arrayTypes[0].replace("[]", multiArrayBrackets)
          : "any" + multiArrayBrackets + ";";
      } else if (value.length > 0 && isObject(value[0])) {
        const childObjectName = toUpperFirstLetter(key);
        objectResult.push(
          convertObjectToTsInterfaces(value[0], childObjectName)
        );
        jsonContent[key] = removeMajority(childObjectName) + "[];";
      } else {
        jsonContent[key] = arrayTypes[0];
      }
    } else if (isDate(value)) {
      jsonContent[key] = "Date;";
    } else if (isString(value)) {
      jsonContent[key] = "string;";
    } else if (isBoolean(value)) {
      jsonContent[key] = "boolean;";
    } else if (isNumber(value)) {
      jsonContent[key] = "number;";
    } else {
      jsonContent[key] = "any;";
      optionalKeys.push(key);
    }
  }

  const result = formatCharsToTypeScript(jsonContent, objectName, optionalKeys);
  objectResult.push(result);

  return objectResult.join("\n\n");
}

function detectMultiArrayTypes(value: any, valueType: string[] = []): string[] {
  if (isArray(value)) {
    if (value.length === 0) {
      valueType.push("any[];");
    } else if (isArray(value[0])) {
      for (let index = 0, length = value.length; index < length; index++) {
        const element = value[index];

        const valueTypeResult = detectMultiArrayTypes(element, valueType);
        for (const item of valueTypeResult) {
          valueType.push(item);
        }
      }
    } else if (every(value, (item) => isString(item))) {
      valueType.push("string[];");
    } else if (every(value, (item) => isNumber(item))) {
      valueType.push("number[];");
    } else if (every(value, (item) => isBoolean(item))) {
      valueType.push("boolean[];");
    } else {
      valueType.push("any[];");
    }
  }

  return valueType;
}

function isMultiArray(arrayTypes: string[]) {
  return arrayTypes.length > 1;
}

function isAllEqual(array: string[]) {
  return every(array.slice(1), partial(isEqual, array[0]));
}

function getMultiArrayBrackets(content: string): string {
  const jsonString = JSON.stringify(content);
  let brackets = "";

  for (let index = 0, length = jsonString.length; index < length; index++) {
    const element = jsonString[index];

    if (element === "[") {
      brackets = brackets + "[]";
    } else {
      index = length;
    }
  }

  return brackets;
}

function formatCharsToTypeScript(
  jsonContent: any,
  objectName: string,
  optionalKeys: string[]
): string {
  let result = JSON.stringify(jsonContent, null, "  ")
    .replace(new RegExp('"', "g"), "")
    .replace(new RegExp(",", "g"), "");

  const aKeys = keysIn(jsonContent);
  for (let index = 0, length = aKeys.length; index < length; index++) {
    const key = aKeys[index];
    result = includes(optionalKeys, key)
      ? result.replaceAll(key + ":", toLowerFirstLetter(key) + "?:")
      : result.replaceAll(key + ":", toLowerFirstLetter(key) + ":");
  }

  objectName = removeMajority(objectName);

  return "export interface " + objectName + " " + result;
}

function removeMajority(objectName: string): string {
  if (objectName.slice(-3).toUpperCase() === "IES") {
    return objectName.slice(0, Math.max(0, objectName.length - 3)) + "y";
  } else if (last(objectName).toUpperCase() === "S") {
    return objectName.slice(0, Math.max(0, objectName.length - 1));
  }

  return objectName;
}

function toUpperFirstLetter(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function toLowerFirstLetter(text: string) {
  return text.charAt(0).toLowerCase() + text.slice(1);
}

const Json2Ts = {
  convert(content: string, objectName?: string): string {
    const jsonContent = JSON.parse(content);

    if (isArray(jsonContent)) {
      return convertObjectToTsInterfaces(jsonContent[0], objectName);
    }

    return convertObjectToTsInterfaces(jsonContent, objectName);
  },

  isJson(stringContent): boolean {
    try {
      JSON.parse(stringContent);
    } catch {
      return false;
    }
    return true;
  },
};

export default Json2Ts;
