//QUnit's suggested smoke test

QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});

QUnit.test( "score validation test", function( assert ) {
  elem = document.createElement("input")

  elem.value = "10"
  assert.ok(10 == scoreValidation(elem), "value 10 returns number 10")

  elem.value = "6"
  assert.ok(6 == scoreValidation(elem), "value 6 returns number 6")

  elem.value = "14"
  assert.ok(14 == scoreValidation(elem), "value 14 returns number 14")

  

})
