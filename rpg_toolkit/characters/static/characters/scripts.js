$(document).ready(function(){
    $(".ability-box").keyup(function(){
        pointsTotal()
    });
});

function warningVisibility(elem, warning, vis) {
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
  }
  return num_score
}

function pointsTotal(){
  var total = 0
  var scores = $('.ability-box').toArray()
  for (i = 0; i < scores.length; i++) {
    scoreValidation(scores[i])
  }
}
