$(document).ready(function(){
    $(".ability-box").val(10)
    resetMods()
    removeRadios()
    pointsTotal()
    abilityTotals()
    abilityMods()
    $(".ability-box").keyup(function(){
      pointsTotal()
      abilityTotals()
      abilityMods()

    });
    $("select").change(function(){
      setRaceMods($(this).find(':selected').attr('title'))
      abilityTotals()
      abilityMods()
    })

});

function warningVisibility(elem, warning, vis) {
  // warning=['char-warn'|'range-warn'], vis=['hidden'|'visible']
  // find the warning in the same table row of the given type and set it to a given value
  elem.parentElement.parentElement.getElementsByClassName(warning)[0].style.visibility=vis
}

function removeRadios() {
  $(".radio-cell").remove()
  $("#radio-cell-head").remove()
}

function ifNoRadios() {
  return $(".radio-cell").toArray().length == 0
}

function resetMods(){
  $(".racial-mod").html(0)
}

function scoreValidation(score){
  // check for non-digits in input string
  var non_digs = new RegExp("[^0-9]", "g")
  var new_score = score.value.replace(non_digs, "")
  // display warning if non-digits in input string, hide otherwise
  if (new_score != score.value) {
    warningVisibility(score, "char-warn", "visible")
  } else {
    warningVisibility(score, "char-warn", "hidden")
  }
  var num_score = Number(new_score) // input string to integer
  // check that integer is in allowed range, display warning if not, hide otherwise
  if (num_score > 18 || num_score < 7) {
    warningVisibility(score, "range-warn", "visible")
  } else {
    warningVisibility(score, "range-warn", "hidden")
  };
  return num_score
}

// points values for each ability value
var pointsFor = {7: -4, 8: -2, 9: -1, 10: 0,
                 11: 1, 12: 2, 13: 3, 14: 5,
                 15: 7, 16: 10, 17: 13, 18: 17}

function noteChoice(elem) {
  resetMods()  // reset all mods to '0'
  elem.parentNode.previousSibling.innerHTML = '+2' // set selected ability mod to '+2'
  //recalculate total and mods
  abilityTotals()
  abilityMods()
}

function abilityTotals() {
  rows = $('.ability').toArray()
  for (i=0; i<rows.length; i++) {
    rows[i].getElementsByClassName('calculated')[0].innerHTML =
      Number(rows[i].getElementsByClassName('ability-box')[0].value) +
      Number(rows[i].getElementsByClassName('racial-mod')[0].innerHTML)
  }
}

function abilityMods() {
  rows = $('.ability').toArray()
  for (i=0; i<rows.length; i++) {
    m = Math.floor((Number(rows[i].getElementsByClassName('calculated')[0].innerHTML)-10)/2)
    if (m >= 0) {
      m = '+'+m
    }
    rows[i].getElementsByClassName('ability-mod')[0].innerHTML = m
  }
}

function pointsTotal() {
  var total = 0
  var scores = $('.ability-box').toArray()
  for (i = 0; i < scores.length; i++) {
    total += pointsFor[scoreValidation(scores[i])]
  }
  if ($(".warn").filter(function(){
    return this.style.visibility == "visible"
  }).length > 0) {
    $(".total-points").text('\u26A0')
  } else {
    $(".total-points").text(total);
  }
}

function setRaceMods(modstr) {
  if (modstr == "+2 to One Ability Score") {
    if (ifNoRadios()) {
      resetMods()
      radio = document.createElement('input')
      radio.type = 'radio'
      radio.name = 'bonus-choice'
      radio_cell = document.createElement('td')
      radio_cell.className = 'radio-cell'
      radio_cell.appendChild(radio)
      radio_title = document.createElement('td')
      radio_title.id = 'radio-cell-head'
      $('#racial-mod-head').after(radio_title)
      $('.racial-mod').after(radio_cell.cloneNode(true))
      $('.radio-cell').children('input').click(function() {
        noteChoice(this)
      })
    }
  } else {
    removeRadios()
    resetMods()
    var mods = modstr.split(", ")
    for (var i=0; i<mods.length; i++) {
      var mod = mods[i].split(' ')
      $('#'+mod[1]).children('.racial-mod').text(mod[0])
    }
  }
}
