$(document).ready(function(){
    $(".ability-box").keyup(function(){
        // $("span").text(i += 1);
        pointsTotal()
    });
});

function scoreValidation(score){
  var non_digs = new RegExp("[^0-9]", "g")
  var new_score = score.value.replace(non_digs, "")
  if (new_score != score.value) {
    alert("digits only, please")
    score.value = new_score
  }
  var num_score = Number(new_score)
  if (num_score > 18) {
    alert("numbers 7-18 only, please")
  } else if (num_score < 7) {
    alert("numbers 7-18 only, please")
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
