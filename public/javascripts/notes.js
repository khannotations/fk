$(document).ready(function(){
  $("#start").click(function(){
    $("#start").fadeOut("fast", function() {
      $("#start").html("Ready?");
      $("#start").fadeIn("fast", function() {
        setTimeout(function() {
          $("#start").fadeOut("fast", function() {
            $("#start").html("Go!");
            $("#start").fadeIn("fast", function() {
              setTimeout(function() {
                getNewNotes();
                $("#start").fadeOut("slow", function() {
                  $("#start").html("Skip");
                  $("#start").fadeIn("slow");
                });
              }, 500);
            });
          });
        }, 1000);
      });
    });
  });
  
  $("#together").click(function() {
    document.getElementById('note1').play(); // don't change to jQuery.
    document.getElementById('note2').play(); // jQuery objects have no
                                             // no method play()
  });
  $("#distinct").click(function() {
    document.getElementById('note1').play();
    setTimeout(function(){
      document.getElementById('note2').play();
    }, 1000);
  });
  
  $(".tone_choice").mouseover(function() {
    $("#interval_name").html(jQuery("span", this).html());
  });

  $(".tone_choice").click(function() {
    if($(this).attr("id") == $("#diff").attr("value")) {
      correct();
      console.log("Diff: "+$("#diff").attr("value"));
    }
    else
      $("#interval_name").html("not that one!");
  });
});

function correct() {
  $("#interval_name").html("correct!");
  $("#response").fadeOut(200);
  setTimeout(function() {
    getNewNotes();
    $("#interval_name").html("(choose one)");
  }, 250);
}

function getNewNotes(){
  $.get("/getNotes", function(response, status){
    if(status != "success" || !response) {
      $("#notes").html("<h3> Something wrong... </h3>");
    }
    else {
      $("#notes").hide(function() {
        $("#notes").html(response);
        $("#notes").fadeIn("fast", function(){
          $("#response").show();
        });
      });
    }
  }, "audio/mpeg");
}