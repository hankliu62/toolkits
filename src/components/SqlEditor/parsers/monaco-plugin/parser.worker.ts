import { mysqlParser } from "../sql-parser";

// eslint-disable-next-line no-restricted-globals
const ctx: Worker = self as any;

// eslint-disable-next-line unicorn/prefer-add-event-listener
ctx.onmessage = (event) => {
  ctx.postMessage(mysqlParser(event.data.text, event.data.index));
};
