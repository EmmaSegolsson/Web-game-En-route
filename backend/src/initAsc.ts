import fs from "fs";
import assemblyScriptLoader from "@assemblyscript/loader";

const imports = {
  /* imports go here */
};
const wasmModule = assemblyScriptLoader.instantiateSync(
  fs.readFileSync(__dirname + "/assembly/optimized.wasm"),
  imports,
);

export default wasmModule;
