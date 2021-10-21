require("esbuild-register/dist/node").register({ target: "node14" });

const it = require("ava");
const { rollup } = require("rollup");
const { default: plugin } = require("../src");

it("should just load CSV file", async (t) => {
  const bundle = await rollup({
    input: __dirname + "/fixtures/fruits-basic.js",
    plugins: [plugin()],
  });
  t.plan(1);
  await testBundle(t, bundle);
});

it("should load CSV file and parse header", async (t) => {
  const bundle = await rollup({
    input: __dirname + "/fixtures/fruits-header.js",
    plugins: [plugin({ header: true })],
  });
  t.plan(1);
  await testBundle(t, bundle);
});

it("should load CSV file and parse header via URL parameter", async (t) => {
  const bundle = await rollup({
    input: __dirname + "/fixtures/fruits-header-url.js",
    plugins: [plugin()],
  });
  t.plan(1);
  await testBundle(t, bundle);
});

it("should load CSV file and set header and delimiter via URL parameter", async (t) => {
  const bundle = await rollup({
    input: __dirname + "/fixtures/fruits-semicolon-url.js",
    plugins: [plugin()],
  });
  t.plan(1);
  await testBundle(t, bundle);
});

async function testBundle(t, bundle) {
  const { output } = await bundle.generate({ format: "cjs" });
  const [{ code }] = output;
  const func = new Function("t", code);
  return func(t);
}
