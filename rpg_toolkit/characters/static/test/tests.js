//QUnit's suggested smoke test
item = document.createElement("tr")
td = document.createElement("td")
inp = document.createElement("input")
inp.className = "ability-box"
inp.value = "10"
td.appendChild(inp)
item.appendChild(td)
char_warn = document.createElement("td")
char_warn.className = "warn char-warn"
char_warn.style.visibility = "hidden"
range_warn = document.createElement("td")
range_warn.className = "warn range-warn"
range_warn.style.visibility = "hidden"
item.appendChild(char_warn)
item.appendChild(range_warn)
inps = [inp, inp.cloneNode(true),inp.cloneNode(true)];
total_points = document.createElement("span")
total_points.className = "total-points"

QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});

QUnit.test( "score validation test", function( assert ) {
  inp.value = '10'
  assert.equal(10, scoreValidation(inp), "value 10 returns number 10")
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


QUnit.test( "total points tests", function( assert ) {
  inps[0].value = '12'
  $(".ability-box:first").keyup()
  assert.equal(total_points.innerHTML, '2')
  inps[1].value = '-7'
  $(".ability-box:first").keyup()
  assert.equal(total_points.innerHTML,'-2')
  inps[2].value = '18'
  $(".ability-box:first").keyup()
  assert.equal(total_points.innerHTML, "15")
})
