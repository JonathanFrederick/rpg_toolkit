$(document).ready(function(){
    $(".ability-box").keyup(function(){
        // $("span").text(i += 1);
        pointsTotal()
    });
});

function warningVisibility(elem, warning, vis) {
  elem.parentElement.getElementsByClassName(warning)[0].style.visibility=vis

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
  if (num_score > 18) {
    // alert("numbers 7-18 only, please")
  } else if (num_score < 7) {
    // alert("numbers 7-18 only, please")
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
