
  /* Handles 'work' view, slide down on project click */
  /*
  var curr_proj = "";                        // Store current project
  var new_height = 960;                         // New height of 'work' square
  var work_height = $("#work").height();        // Store old height
  $(".big_project").click(function(){
    t = this;
    // Change height, fix footer to bottom and scroll body down
    $("#work").animate({height: new_height }, 500);
    $("#footer").animate({top: new_height-$("footer").outerHeight() }, 100);
    $("body").animate({
      scrollTop: $("#row_1").offset().top-12
    }, 500);
    var target = $(t).attr("target")                          // Store target
    console.log(target)
    if(target !== curr_proj) {
      //$(".desc").hide();
      $(".desc[name='target']").show();
    }
    if(id != curr_proj_id) {                    // If it's not the curr proj
      if(curr_proj_id === "") {
        $("#desc_1").slideDown("fast", function(){  // Show target
          $(id).show(200);
        });
      }
      else {
        $(curr_proj_id).hide(200, function(){   // If one is showing, hide it
          $("#desc_1").slideDown(0, function(){ // first
            $(id).show(200);
          });
        });
      }
      curr_proj = target;                        // Set the new id
    }
  });

  $(".hide_disp").live('click', function() {    // Hide button on description
    var t = $(this);
    $("body").animate({ scrollTop: 0 }, 300);
    t.parent().slideUp(350);
    $("#work").animate({ height: work_height }, 300, function(){
      $("#footer").animate({top: work_height-$("footer").outerHeight()}, 300);
    });
    $(curr_proj_id).hide();
    curr_proj_id = "";
  });
*/