import get from 'lodash/get';
import upperCase from 'lodash/upperCase';

import type { ICompletionItem, ICursorInfo, IStatement, ITableInfo } from '../sql-parser';
import type { IMatching, IParseResult } from '../syntax-parser';

export type IMonacoVersion = '0.13.2' | '0.15.6';

export type IParserType = 'mysql' | 'odps' | 'blink' | 'dsql' | 'grail' | 'emcsql';

export class DefaultOpts {
  public monacoEditorVersion: IMonacoVersion = '0.15.6';

  public parserType: IParserType = 'odps';

  public language = 'sql';

  // TODO: replace by backend api
  protected tableNames: string[] = ['dt', 'b2b', 'tmall', 'test'];

  // TODO: replace by backend api
  protected tableColumns: Record<string, string[]> = {
    dt: Array.from({ length: 8 })
      .fill(1)
      .map((item, index) => `dt${index + 1}`),
    b2b: Array.from({ length: 8 })
      .fill(1)
      .map((item, index) => `b2b${index + 1}`),
    tmall: Array.from({ length: 8 })
      .fill(1)
      .map((item, index) => `tmall${index + 1}`),
    test: Array.from({ length: 8 })
      .fill(1)
      .map((item, index) => `test${index + 1}`),
  };

  constructor(private monaco: any) {
    //
  }

  public onParse = (parseResult: IParseResult) => {
    //
  };

  public onSuggestTableNames?: (
    cursorInfo?: ICursorInfo<ITableInfo>,
  ) => Promise<ICompletionItem[]> = (cursorInfo) => {
    console.log(cursorInfo, 'cursorInfo----------------------------');

    return Promise.resolve(
      this.tableNames.map((name) => {
        return {
          label: name,
          insertText: name,
          sortText: `A${name}`,
          kind: this.monaco.languages.CompletionItemKind.Folder,
        };
      }),
    );
  };

  public onSuggestTableFields?: (
    tableInfo?: ITableInfo,
    cursorValue?: string,
    rootStatement?: IStatement,
  ) => Promise<ICompletionItem[]> = (tableInfo) => {
    const tableName = get(tableInfo, 'namespace.value', '') + get(tableInfo, 'tableName.value', '');

    const tableColumns = this.tableColumns[tableName] || ['aa', 'bb', 'cc'];
    return Promise.resolve(
      tableColumns.map((fieldName) => {
        return {
          label: fieldName,
          insertText: fieldName,
          sortText: `B${fieldName}`,
          kind: this.monaco.languages.CompletionItemKind.Field,
        };
      }),
    );
  };

  public pipeKeywords = (keywords: IMatching[]) => {
    return keywords
      .filter((matching) => {
        return matching.type === 'string';
      })
      .map((matching) => {
        const value = /[A-Za-z]+/.test(matching.value.toString())
          ? upperCase(matching.value.toString())
          : matching.value.toString();
        return {
          label: value,
          insertText: value,
          documentation: 'documentation',
          detail: 'detail',
          kind: this.monaco.languages.CompletionItemKind.Keyword,
          sortText: `W${matching.value}`,
        };
      });
  };

  public onSuggestFunctionName?: (inputValue?: string) => Promise<ICompletionItem[]> = (
    inputValue,
  ) => {
    return Promise.resolve(
      ['sum', 'count'].map((each) => {
        return {
          label: each,
          insertText: each,
          sortText: `C${each}`,
          kind: this.monaco.languages.CompletionItemKind.Function,
        };
      }),
    );
  };

  public onSuggestFieldGroup?: (tableNameOrAlias?: string) => ICompletionItem = (
    tableNameOrAlias,
  ) => {
    return {
      label: tableNameOrAlias,
      insertText: tableNameOrAlias,
      sortText: `D${tableNameOrAlias}`,
      kind: this.monaco.languages.CompletionItemKind.Folder,
    };
  };

  public onHoverTableField?: (fieldName?: string, extra?: ICompletionItem) => Promise<any> = (
    ...args
  ) => {
    return Promise.resolve([
      { value: 'onHoverTableField' },
      {
        value: `\`\`\`json\n${JSON.stringify(args, null, 2)}\n\`\`\``,
      },
    ]);
  };

  public onHoverTableName?: (cursorInfo?: ICursorInfo) => Promise<any> = (...args) => {
    return Promise.resolve([
      { value: 'onHoverTableName' },
      {
        value: `\`\`\`json\n${JSON.stringify(args, null, 2)}\n\`\`\``,
      },
    ]);
  };

  public onHoverFunctionName?: (functionName?: string) => Promise<any> = (...args) => {
    return Promise.resolve([
      { value: 'onHoverFunctionName' },
      {
        value: `\`\`\`json\n${JSON.stringify(args, null, 2)}\n\`\`\``,
      },
    ]);
  };
}
