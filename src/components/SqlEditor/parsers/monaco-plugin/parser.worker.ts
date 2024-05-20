import { mysqlParser } from '../sql-parser';

const ctx: Worker = self as any;

ctx.onmessage = (event) => {
  ctx.postMessage(mysqlParser(event.data.text, event.data.index));
};
