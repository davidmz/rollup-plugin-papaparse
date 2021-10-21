import { parse, ParseConfig } from "papaparse";
import { Plugin as RollupPlugin, TransformResult } from "rollup";

export type Options = {
  extensions?: string[];
} & ParseConfig;

const urlConfigArgs = new Map<keyof ParseConfig, (s: string) => any>([
  ["delimiter", String],
  ["newline", String],
  ["quoteChar", String],
  ["escapeChar", String],
  ["header", Boolean],
  ["dynamicTyping", Boolean],
  ["preview", Number],
  ["comments", (s: string) => (s !== "false" ? s : Boolean(s))],
  ["skipEmptyLines", (s: string) => (s === "greedy" ? s : Boolean(s))],
  ["fastMode", Boolean],
]);

export default function rollupPluginPapaparse({
  extensions = ["csv"],
  ...papaConf
}: Options = {}): RollupPlugin {
  return {
    name: "rollup-plugin-papaparse",

    async resolveId(source, importer, options) {
      const [path, query] = source.split("?", 2);
      if (!extensions.some((ext) => path.endsWith(ext))) {
        return;
      }
      const result = await this.resolve(path, importer, {
        skipSelf: true,
        ...options,
      });
      return result ? { id: result.id, meta: { query } } : null;
    },

    transform(code: string, id: string): TransformResult {
      if (!extensions.some((ext) => id.endsWith(ext))) {
        return;
      }

      const query = (this.getModuleInfo(id)?.meta?.query || "") as string;

      const urlParams = new URLSearchParams(query);

      const additionaConf = {} as ParseConfig;

      for (const [k, fn] of urlConfigArgs) {
        if (urlParams.has(k)) {
          additionaConf[k] = fn(urlParams.get(k)!);
        }
      }

      const parsed = parse(code, { ...papaConf, ...additionaConf });
      return {
        code: "export default " + JSON.stringify(parsed.data),
        map: null,
      };
    },
  };
}
