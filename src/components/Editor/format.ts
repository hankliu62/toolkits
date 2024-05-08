import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import PrettierWorker from "worker-loader!../../../workers/editor-prettier.worker";

import { createWorkerQueue } from "@/utils/workers";

export function registerDocumentFormattingEditProviders() {
  const disposables = [];
  let prettierWorker;

  const formattingEditProvider = {
    async provideDocumentFormattingEdits(model, _options, _token) {
      if (!prettierWorker) {
        prettierWorker = createWorkerQueue(PrettierWorker);
      }
      const { canceled, error, pretty } = await prettierWorker.emit({
        text: model.getValue(),
        language: model.getLanguageId(),
      });
      if (canceled || error) return [];
      return [
        {
          range: model.getFullModelRange(),
          text: pretty,
        },
      ];
    },
  };

  // // override the built-in HTML formatter
  // const _registerDocumentFormattingEditProvider =
  //   monaco.languages.registerDocumentFormattingEditProvider;
  // monaco.languages.registerDocumentFormattingEditProvider = (id, provider) => {
  //   if ((['css','less','scss','javascript','typescript','html'].includes(id))) {
  //     return _registerDocumentFormattingEditProvider(
  //      ,
  //       formattingEditProvider
  //     );

  //   }else{
  //     return _registerDocumentFormattingEditProvider(id, provider);
  //   }

  // };
  for (const id of [
    "css",
    "less",
    "scss",
    "javascript",
    "typescript",
    "html",
  ]) {
    disposables.push(
      monaco.languages.registerDocumentFormattingEditProvider(
        id,
        formattingEditProvider
      )
    );
  }

  return {
    dispose() {
      for (const disposable of disposables) disposable.dispose();
      if (prettierWorker) {
        prettierWorker.terminate();
      }
    },
  };
}
