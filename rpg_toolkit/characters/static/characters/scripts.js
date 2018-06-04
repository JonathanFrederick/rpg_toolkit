$(document).ready(function(){
    $(".ability-box").val(10)
    $(".ability-box").keyup(function(){
      pointsTotal()
    });
    $("option").click(function(){
      setRaceMods($(this).attr('modstring'))
    })
});

function warningVisibility(elem, warning, vis) {
  // console.log(elem)
  elem.parentElement.parentElement.getElementsByClassName(warning)[0].style.visibility=vis
}

function scoreValidation(score){
  var non_digs = new RegExp("[^0-9]", "g")
  var new_score = score.value.replace(non_digs, "")
  if (new_score != score.value) {
    warningVisibility(score, "char-warn", "visible")
  } else {
    warningVisibility(score, "char-warn", "hidden")
  }
  var num_score = Number(new_score)
  if (num_score > 18 || num_score < 7) {
    warningVisibility(score, "range-warn", "visible")
  } else {
    warningVisibility(score, "range-warn", "hidden")
  };
  return num_score
}

var pointsFor = {7: -4, 8: -2, 9: -1, 10: 0,
                 11: 1, 12: 2, 13: 3, 14: 5,
                 15: 7, 16: 10, 17: 13, 18: 17}


function pointsTotal(){
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
  racial_mods = $('.racial-mod').toArray()
  if (modstr == "+2 to One Ability Score") {
    radio = document.createElement('input')
    radio.type = 'radio'
    radio.name = 'bonus-choice'
    for (var i=0; i < racial_mods.length; i++) {
      racial_mods[i].appendChild(radio.cloneNode(true))
    }
  } else {
    for (var i=0; i < racial_mods.length; i++) {
      to_remove = racial_mods[i].getElementsByTagName('input')[0]
      racial_mods[i].removeChild(to_remove)
    }

  }


}
