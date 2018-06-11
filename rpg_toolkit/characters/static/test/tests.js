//QUnit's suggested smoke test
QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});

QUnit.test( "score validation test", function( assert ) {
  var inp = $(".ability-box").get(0)
  var char_warn = $(".char-warn").get(0)
  var range_warn = $(".range-warn").get(0)

  function helper(string_in, string_out, char_val, range_val) {
    inp.value = string_in
    assert.equal(string_out, scoreValidation(inp),
      "value "+string_in+" returns "+string_out)
    assert.ok(char_warn.style.visibility == char_val,
      string_in+" makes char-warn "+char_val)
    assert.ok(range_warn.style.visibility == range_val,
      string_in+" makes char-warn "+range_val)
  }

  helper('10', 10, "hidden", "hidden")
  helper('6', 6, "hidden", "visible")
  helper('14', 14, "hidden", "hidden")
  helper('ab', 0, "visible", "visible")
  helper('10c', 10, "visible", "hidden")
})

QUnit.test( "total points tests", function( assert ) {
  var inps = $(".ability-box").toArray()
  var total_points = $(".total-points").get(0)
  inps[0].value = '12'
  $(".ability-box").keyup()
  assert.equal(total_points.innerHTML, '2' ,'12/10/10 costs 2')
  inps[1].value = '-7'
  $(".ability-box").keyup()
  assert.equal(total_points.innerHTML,'\u26A0', '-7 gives warning in points totals')
  inps[1].value = '7'
  $(".ability-box").keyup()
  assert.equal(total_points.innerHTML,'-2', '12/7/10 costs -2')
  inps[2].value = 'ac'
  $(".ability-box").keyup()
  assert.equal(total_points.innerHTML, "\u26A0", 'alpha characters show warning in points totals')
  inps[2].value = '18'
  $(".ability-box").keyup()
  assert.equal(total_points.innerHTML, "15", '12/7/18 costs 15')

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
  // check for altered stats
  assert.equal(racial_mods[0].innerHTML, "+2")
  assert.equal(racial_mods[1].innerHTML, "-2")
  assert.equal(racial_mods[2].innerHTML, "0")
})


QUnit.test( "radio button change test", function( assert ){
  //test that radio buttons add +2 to racial-mod
  $(".ability-box").val(10)

  resetMods()
  setRaceMods("+2 to One Ability Score")
  var radio_cells = $('.radio-cell').toArray()
  var racial_mods = $('.racial-mod').toArray()
  $('.radio-cell:first').children('input:first').click()
  assert.equal(racial_mods[0].innerHTML, '+2')
  assert.equal(racial_mods[1].innerHTML, '0')
  $('tr:nth-of-type(3)').children('.radio-cell').children('input').click()
  assert.equal(racial_mods[0].innerHTML, '0')
  assert.equal(racial_mods[1].innerHTML, '+2')
})

QUnit.test( "totals calculated test", function( assert ) {
  resetMods()
  setRaceMods("+2 ability, -2 bbility")
  abilityTotals()
  $(".ability-box").val(10)
  var ability_totals = $(".calculated").toArray()
  assert.equal(ability_totals[0].innerHTML, "12")
  assert.equal(ability_totals[1].innerHTML, "8")
  assert.equal(ability_totals[2].innerHTML, "10")
})

QUnit.test( "ability mods calculated test" , function( assert ) {
  resetMods()
  setRaceMods("+2 ability, -2 bbility")
  abilityTotals()
  abilityMods()
  $(".ability-box").val(10)
  var ability_totals = $(".ability-mod").toArray()
  assert.equal(ability_totals[0].innerHTML, "+1")
  assert.equal(ability_totals[1].innerHTML, "-1")
  assert.equal(ability_totals[2].innerHTML, "+0")
})
