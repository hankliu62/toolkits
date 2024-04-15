declare module "worker-loader!*" {
  class WebpackWorker extends Worker {
    constructor();
  }

  export = WebpackWorker;
}

declare module "prettier-plugin-java" {
  export interface SupportLanguage {
    name: string;
    since?: string | undefined;
    parsers: any[] | string[];
    group?: string | undefined;
    tmScope?: string | undefined;
    aceMode?: string | undefined;
    codemirrorMode?: string | undefined;
    codemirrorMimeType?: string | undefined;
    aliases?: string[] | undefined;
    extensions?: string[] | undefined;
    filenames?: string[] | undefined;
    linguistLanguageId?: number | undefined;
    vscodeLanguageIds?: string[] | undefined;
    interpreters?: string[] | undefined;
  }

  export interface Plugin {
    languages?: SupportLanguage[] | undefined;
    parsers?: { [parserName: string]: any } | undefined;
    printers?: { [astFormat: string]: any } | undefined;
    options?: any | undefined;
    defaultOptions?: any | undefined;
  }
}
