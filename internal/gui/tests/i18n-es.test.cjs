// Verification of Spanish (Latin America - es-419) translations in magpie
const assert = require("node:assert/strict");
const { test } = require("node:test");
const { strings } = require("./strings.cjs");

test("Spanish (es) localization covers all core keys with matching marks", () => {
  const { files } = strings();
  const core = files[0];
  assert.equal(core.file, "i18n.js");
  const dict = core.dict;

  assert.ok(dict.es, "I18N.es exists");
  const zhKeys = Object.keys(dict.zh);
  const esKeys = Object.keys(dict.es);

  assert.equal(esKeys.length, zhKeys.length, "es has same count of keys as zh");
  assert.deepEqual(esKeys.sort(), [...zhKeys].sort(), "es has exactly the same keys as zh");

  const marks = (s) => [...s.matchAll(/\{\w+\}|<\/?\w+[^>]*>/g)].map((m) => m[0]).sort();
  for (const k of zhKeys) {
    const v = dict.es[k];
    assert.equal(typeof v, "string", `es[${k}] is a string`);
    assert.ok(v.trim().length > 0, `es[${k}] is not empty`);
    assert.deepEqual(marks(v), marks(k), `marks match for ${JSON.stringify(k)}`);
  }
});

test("Spanish (es) localization covers all plugins with matching marks", () => {
  const { files } = strings();
  const plugins = files.slice(1);
  assert.equal(plugins.length, 4, "4 plugins (library, routing, sessions, usage)");

  const marks = (s) => [...s.matchAll(/\{\w+\}|<\/?\w+[^>]*>/g)].map((m) => m[0]).sort();

  for (const { file, dict } of plugins) {
    assert.ok(dict.es, `${file} has es`);
    const zhKeys = Object.keys(dict.zh);
    const esKeys = Object.keys(dict.es);

    assert.equal(esKeys.length, zhKeys.length, `${file}: es has same key count as zh`);
    assert.deepEqual(esKeys.sort(), [...zhKeys].sort(), `${file}: es has identical keys to zh`);

    for (const k of zhKeys) {
      const v = dict.es[k];
      assert.equal(typeof v, "string", `${file}: es[${k}] is a string`);
      assert.ok(v.trim().length > 0, `${file}: es[${k}] is not empty`);
      assert.deepEqual(marks(v), marks(k), `${file}: marks match for ${JSON.stringify(k)}`);
    }
  }
});
