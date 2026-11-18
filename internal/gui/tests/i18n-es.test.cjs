// Verification of Spanish (Latin America - es-419) translations in magpie
const assert = require("node:assert/strict");
const { test } = require("node:test");
const { strings } = require("./strings.cjs");

test("Spanish (es) localization covers core keys with matching marks", () => {
  const { files } = strings();
  const core = files[0];
  assert.equal(core.file, "i18n.js");
  const dict = core.dict;

  assert.ok(dict.es, "I18N.es exists");
  const esKeys = Object.keys(dict.es);
  assert.ok(esKeys.length >= 3700, "es has preserved at least 3700 core keys");

  const marks = (s) => [...s.matchAll(/\{\w+\}|<\/?\w+[^>]*>/g)].map((m) => m[0]).sort();
  for (const k of esKeys) {
    const v = dict.es[k];
    assert.equal(typeof v, "string", `es[${k}] is a string`);
    assert.ok(v.trim().length > 0, `es[${k}] is not empty`);
    assert.deepEqual(marks(v), marks(k), `marks match for ${JSON.stringify(k)}`);
  }
});

test("Spanish (es) localization covers plugins with matching marks", () => {
  const { files } = strings();
  const pluginsWithEs = files.slice(1).filter((f) => f.dict.es);
  assert.equal(pluginsWithEs.length, 4, "4 plugins with es (library, routing, sessions, usage)");

  const marks = (s) => [...s.matchAll(/\{\w+\}|<\/?\w+[^>]*>/g)].map((m) => m[0]).sort();

  for (const { file, dict } of pluginsWithEs) {
    assert.ok(dict.es, `${file} has es`);
    const esKeys = Object.keys(dict.es);
    assert.ok(esKeys.length > 0, `${file}: es has keys`);

    for (const k of esKeys) {
      const v = dict.es[k];
      assert.equal(typeof v, "string", `${file}: es[${k}] is a string`);
      assert.ok(v.trim().length > 0, `${file}: es[${k}] is not empty`);
      assert.deepEqual(marks(v), marks(k), `${file}: marks match for ${JSON.stringify(k)}`);
    }
  }
});
