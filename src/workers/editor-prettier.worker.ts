import prettier from "prettier";
import pluginAngular from "prettier/plugins/angular";
import pluginBabel from "prettier/plugins/babel";
import pluginEstree from "prettier/plugins/estree";
import pluginFlow from "prettier/plugins/flow";
import pluginGraphql from "prettier/plugins/graphql";
import pluginHtml from "prettier/plugins/html";
import pluginMarkdown from "prettier/plugins/markdown";
import pluginPostcss from "prettier/plugins/postcss";
import pluginTypescript from "prettier/plugins/typescript";
import pluginYaml from "prettier/plugins/yaml";
import pluginJava from "prettier-plugin-java";
import * as pluginRust from "prettier-plugin-rust";
import { format as formatSQL } from "sql-formatter";

// 工作线程，不能从主项目中导入
const LanguagePrettierParser = {
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

let current;

const ctx: Worker = self as any;

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
    if (LanguagePrettierParser[event.data.language]) {
      respond({
        pretty: await prettier.format(event.data.text, {
          parser: LanguagePrettierParser[event.data.language],
          plugins: [
            pluginMarkdown,
            pluginHtml,
            pluginTypescript,
            pluginPostcss,
            pluginAngular,
            pluginBabel,
            pluginGraphql,
            pluginFlow,
            pluginYaml,
            pluginEstree,
          ],
          printWidth: 80,
        }),
      });
    } else if (event.data.language === "sql") {
      // SQL格式化工具
      respond({
        pretty: await formatSQL(event.data.text),
      });
    } else if (event.data.language === "rust") {
      // rust格式化工具
      respond({
        pretty: await prettier.format(event.data.text, {
          plugins: [pluginRust],
        }),
      });
    } else if (event.data.language === "java") {
      // java格式化工具
      respond({
        pretty: await prettier.format(event.data.text, {
          plugins: [pluginJava],
        }),
      });
    }
  } catch (error) {
    respond({ error });
  }
});
