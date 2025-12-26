import esbuild from "esbuild";

esbuild.build({
  entryPoints: ["src/main.ts"],
  bundle: true,
  outfile: "dist/main.js",
  format: "cjs",
  target: "es2020",
  external: ["obsidian"],
  sourcemap: true
}).catch(() => process.exit(1));