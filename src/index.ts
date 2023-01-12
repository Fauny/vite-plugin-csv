import type { Plugin } from "vite"
import { loadCSV } from "./csv"

function VitePluginCSV(options = {}): Plugin {
  return {
    name: "vite-plugin-csv",
    transform(code: string, id: string) {
      const seperator = /\.tsv$/.test(id)
        ? "\t"
        : /\.csv$/.test(id)
        ? ","
        : null
      if (!seperator) return

      try {
        const result = loadCSV(code, seperator)
        return {
          code: `export default ${JSON.stringify(result)};`,
          map: null,
        }
      } catch (error) {
        this.error(error)
        return ""
      }
    },
  }
}

export default VitePluginCSV
