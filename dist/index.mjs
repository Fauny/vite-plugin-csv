// src/csv.ts
function loadCSV(code, seperator = ",") {
  const csv = code.split(/\r\n|\n|\r/);
  const records = [];
  const headers = csv.slice(0)[0].split(seperator);
  const rows = csv.slice(1).filter((row) => row);
  for (let row of rows) {
    const record = row.split(seperator);
    if (record.every((item) => !item))
      continue;
    records.push(record);
  }
  return records.reduce((prev, next) => {
    const entry = {};
    headers.forEach((h, i) => {
      ;
      entry[h] = next[i];
    });
    prev.push(entry);
    return prev;
  }, []);
}

// src/index.ts
function VitePluginCSV(options = {}) {
  return {
    name: "vite-plugin-csv",
    transform(code, id) {
      const seperator = /\.tsv$/.test(id) ? "	" : /\.csv$/.test(id) ? "," : null;
      if (!seperator)
        return;
      try {
        const result = loadCSV(code, seperator);
        return {
          code: `export default ${JSON.stringify(result)};`,
          map: null
        };
      } catch (error) {
        this.error(error);
        return "";
      }
    }
  };
}
var src_default = VitePluginCSV;
export {
  src_default as default
};
