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
  var radio_cells = $('.radio-cell').toArray()
  assert.equal(radio_cells.length, 3)
  assert.equal($('.radio-cell').children('input').length, 3)
  for (var i = 0; i < radio_cells.length; i++) {
    // check that radio button was added
    assert.ok(radio_cells[i].innerHTML.search("<input") > -1)
    assert.ok(radio_cells[i].innerHTML.search('type="radio"') > -1)
    assert.ok(radio_cells[i].innerHTML.search('name="bonus-choice"') > -1)
  }
  setRaceMods("+2 to One Ability Score")
  for (var i = 0; i < radio_cells.length; i++) {
    // check for only one radio button
    assert.ok(radio_cells[i].getElementsByTagName('input').length == 1)
  }

  setRaceMods("+2 ability, -2 bbility")
  // check for removed radio buttons
  assert.notOk($("radio-cell").toArray().length)
  //check for altered stats
  assert.equal(racial_mods[0].innerHTML, "+2")
  assert.equal(racial_mods[1].innerHTML, "-2")
  assert.equal(racial_mods[2].innerHTML, "0")
})


QUnit.test( "radio button change test", function( assert ){
  //test that radio buttons add +2 to racial-mod
  setRaceMods("+2 to One Ability Score")
  var radio_cells = $('.radio-cell').toArray()
  $('.radio-cell:first').children('input:first').click()
  assert.ok(radio_cells[0].text == '+2')
})
