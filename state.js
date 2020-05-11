//State values
var inicio = false;
var pause = false;
var created = false;

var numPeople = 0;
var infectedRate = 0;
var interactionRate = 0;
var maskRate = 0;

$(document).ready(function() {
  //Show values
  $('#populationChooser[type=range]').on('input', function() {
    numPeople = document.getElementById("populationChooser").value;
    if(numPeople > 350){
      $("#caution").show();
    }else{
      $("#caution").hide();
    }
    $("#population").text(numPeople);


  });
  $('#infectedChooser[type=range]').on('input', function() {
    infectedRate = document.getElementById("infectedChooser").value;
    $("#infected").text(infectedRate);
    infectedRate /= 100;
  });
  $('#interactionChooser[type=range]').on('input', function() {
    interactionRate = document.getElementById("interactionChooser").value;
    $("#interaction").text(interactionRate);
    interactionRate /= 100;
  });
  $('#maskChooser[type=range]').on('input', function() {
    maskRate = document.getElementById("maskChooser").value;
    $("#mask").text(maskRate);
    maskRate /= 100;
  });
  //State switch
  $("#go").click(function() {
    inicio = true;
    $(this).hide();
    $("#pausePlay").show();
    $("#stop").show();

    $('#populationChooser').attr("disabled", true);
    $('#interactionChooser').attr("disabled", true);
    $('#infectedChooser').attr("disabled", true);
    $('#maskChooser').attr("disabled", true);

  });
  $("#pausePlay").click(function() {
    if (!pause) {
      $(this).removeClass("btn-warning");
      $(this).addClass("btn-primary");
      $(this).text("Resume");
    } else {
      $(this).removeClass("btn-primary");
      $(this).addClass("btn-warning");
      $(this).text("Pause");

    }
    pause = !pause;

  });
  $("#stop").click(function() {
    inicio = false;
    if (pause) {
      $("#pausePlay").removeClass("btn-primary");
      $("#pausePlay").addClass("btn-warning");
      $("#pausePlay").text("Pause");
    }
    pause = false;
    $(this).hide();
    $("#pausePlay").hide();
    $("#go").show();

    $('#populationChooser').attr("disabled", false);
    $('#interactionChooser').attr("disabled", false)
    $('#maskChooser').attr("disabled", false);
    $('#infectedChooser').attr("disabled", false);

  });
});
