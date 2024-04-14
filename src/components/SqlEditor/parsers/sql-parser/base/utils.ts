export function isOkay(obj: any) {
  // eslint-disable-next-line eqeqeq
  return obj != null;
}

export function flattenAll(arr: any[]) {
  return arr
    .filter((part) => {
      return isOkay(part);
    })
    .reduce((prev, cur) => {
      return prev.concat(cur);
    }, []);
}

export function createTableName(tableNames: { [key: string]: string }) {
  const returnValue: any = {
    type: "identifier",
    variant: "tableName",
  };

  for (const eachTableNamesKey of Object.keys(tableNames)) {
    returnValue[eachTableNamesKey] = tableNames[eachTableNamesKey];
  }

  returnValue.tableNames = Object.keys(tableNames);

  return returnValue;
}
