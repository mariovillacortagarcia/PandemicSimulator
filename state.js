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
    $("#population").text(document.getElementById("populationChooser").value);
    numPeople = document.getElementById("populationChooser").value;

  });
  $('#infectedChooser[type=range]').on('input', function() {
    $("#infected").text(document.getElementById("infectedChooser").value);
    infectedRate = document.getElementById("infectedChooser").value;
    infectedRate /= 100;
  });
  $('#interactionChooser[type=range]').on('input', function() {
    $("#interaction").text(document.getElementById("interactionChooser").value);
    interactionRate = document.getElementById("interactionChooser").value;
    interactionRate /= 100;
  });
  $('#maskChooser[type=range]').on('input', function() {
    $("#mask").text(document.getElementById("maskChooser").value);
    maskRate = document.getElementById("maskChooser").value;
    maskRate /= 100;
  });
  //State switch
  $("#go").click(function() {
    inicio = true;
    $(this).hide();
    $("#pausePlay").show();
    $("#stop").show();

    $('#populationChooser').attr("disabled", true);
    $('#interactionChooser').attr("disabled", true)
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

  });
});
