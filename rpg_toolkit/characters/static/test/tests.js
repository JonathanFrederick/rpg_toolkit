//QUnit's suggested smoke test
QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});

QUnit.test( "score validation test", function( assert ) {
  var inp = $(".ability-box").get(0)
  var char_warn = $(".char-warn").get(0)
  var range_warn = $(".range-warn").get(0)


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
  var inps = $(".ability-box").toArray()
  var total_points = $(".total-points").get(0)
  inps[0].value = '12'
  $(".ability-box").keyup()
  assert.equal(total_points.innerHTML, '2')
  inps[1].value = '-7'
  $(".ability-box").keyup()
  assert.equal(total_points.innerHTML,'\u26A0')
  inps[1].value = '7'
  $(".ability-box").keyup()
  assert.equal(total_points.innerHTML,'-2')
  inps[2].value = 'ac'
  $(".ability-box").keyup()
  assert.equal(total_points.innerHTML, "\u26A0")
  inps[2].value = '18'
  $(".ability-box").keyup()
  assert.equal(total_points.innerHTML, "15")

})

QUnit.test( "racial abilty bonus set tests", function( assert ) {
  var racial_mods = $('.racial-mod').toArray()
  setRaceMods("+2 to One Ability Score")
  for (var i = 0; i < racial_mods.length; i++) {
    // check that radio button was added
    assert.ok(racial_mods[i].innerHTML.search("<input") > -1)
    assert.ok(racial_mods[i].innerHTML.search('type="radio"') > -1)
    assert.ok(racial_mods[i].innerHTML.search('name="bonus-choice"') > -1)
  }
  setRaceMods('+2 ability1, –2 ability2')
  for (var i = 0; i < racial_mods.length; i++) {
    // check that radio button was removed
    assert.ok(racial_mods[i].innerHTML.search("<input") == -1)
    assert.ok(racial_mods[i].innerHTML.search('type="radio"') == -1)
    assert.ok(racial_mods[i].innerHTML.search('name="bonus-choice"') == -1)
  }
})
