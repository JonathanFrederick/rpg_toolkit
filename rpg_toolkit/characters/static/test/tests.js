//QUnit's suggested smoke test

QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});

QUnit.test( "score validation test", function( assert ) {
  item = document.createElement("li")
  inp = document.createElement("input")
  inp.className = "ability-box"
  inp.value = "10"
  item.appendChild(inp)
  char_warn = document.createElement("span")
  char_warn.className = "warn char-warn"
  char_warn.style.visibility = "hidden"
  range_warn = document.createElement("span")
  range_warn.className = "warn range-warn"
  range_warn.style.visibility = "hidden"
  item.appendChild(char_warn)
  item.appendChild(range_warn)

  assert.ok(10 == scoreValidation(inp), "value 10 returns number 10")
  assert.ok(char_warn.style.visibility == "hidden", "10 hides char-warn")
  assert.ok(range_warn.style.visibility == "hidden", "10 hides range-warn")

  inp.value = "6"
  assert.ok(6 == scoreValidation(inp), "value 6 returns number 6")
  assert.ok(char_warn.style.visibility == "hidden", "6 hides char-warn")
  assert.ok(range_warn.style.visibility == "visible", "6 shows range-warn")

  inp.value = "14"
  assert.ok(14 == scoreValidation(inp), "value 14 returns number 14")
  assert.ok(char_warn.style.visibility == "hidden", "14 hides char-warn")
  assert.ok(range_warn.style.visibility == "hidden", "14 hides range-warn")

  inp.value = "ab"
  assert.ok(0 == scoreValidation(inp), "value ab returns number ab")
  assert.ok(char_warn.style.visibility == "visible", "ab shows char-warn")
  assert.ok(range_warn.style.visibility == "visible", "ab shows range-warn")

  inp.value = "10c"
  assert.ok(10 == scoreValidation(inp), "value 10c returns number 10")
  assert.ok(char_warn.style.visibility == "visible", "10c shows char-warn")
  assert.ok(range_warn.style.visibility == "hidden", "10c hides range-warn")

})