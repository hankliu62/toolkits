import prettier from "prettier";
import parserAngular from "prettier/plugins/angular";
import parserBabel from "prettier/plugins/babel";
import parserFlow from "prettier/plugins/flow";
import parserGraphql from "prettier/plugins/graphql";
import parserHtml from "prettier/plugins/html";
import parserMarkdown from "prettier/plugins/markdown";
import parserPostcss from "prettier/plugins/postcss";
import parserTypescript from "prettier/plugins/typescript";
import parserYaml from "prettier/plugins/yaml";
import parserShell from "prettier-plugin-sh";
import * as parserRust from "prettier-plugin-rust";
import parserJava from "prettier-plugin-java";
import { format as formatSQL } from "sql-formatter";

let current;

const ctx: Worker = self as any;

const langToParser = {
  json: "json",
  javascript: "babel",
  typescript: "typescript",
  css: "css",
  less: "less",
  scss: "scss",
  markdown: "markdown",
  graphql: "graphql",
  handlebars: "handlebars",
  html: "html",
  yaml: "yaml",
};

ctx.addEventListener("message", async (event) => {
  if (event.data._current) {
    current = event.data._current;
    return;
  }

  function respond(data) {
    setTimeout(() => {
      if (event.data._id === current) {
        postMessage({ _id: event.data._id, ...data });
      } else {
        postMessage({ _id: event.data._id, canceled: true });
      }
    }, 0);
  }

  try {
    if (langToParser[event.data.language]) {
      respond({
        pretty: prettier.format(event.data.text, {
          parser: langToParser[event.data.language],
          plugins: [
            parserMarkdown,
            parserHtml,
            parserTypescript,
            parserPostcss,
            parserAngular,
            parserBabel,
            parserGraphql,
            parserFlow,
            parserYaml,
          ],
          printWidth: 80,
        }),
      });
    } else if (event.data.language === "sql") {
      // SQL格式化工具
      respond({
        pretty: formatSQL(event.data.text),
      });
    } else if (event.data.language === "rust") {
      // rust格式化工具
      respond({
        pretty: prettier.format(event.data.text, {
          plugins: [parserRust],
        }),
      });
    } else if (event.data.language === "shell") {
      // shell格式化工具
      respond({
        pretty: prettier.format(event.data.text, {
          plugins: [parserShell],
        }),
      });
    } else if (event.data.language === "java") {
      // java格式化工具
      respond({
        pretty: prettier.format(event.data.text, {
          plugins: [parserJava],
        }),
      });
    }
  } catch (error) {
    respond({ error });
  }
});
