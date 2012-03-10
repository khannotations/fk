/*
Written for faiazkhan.com, by Faiaz Khan. 
Edited February 16, 2012
*/
$(document).ready(function() { 
  var time = 600;
  var windows = ["index", "work", "play"];
  var currWindow = windows[0];
  var w = $(window).width();
  var h = $(window).height();
  $("#work").css({"top":"0px", "left":w+"px"});
  $("#play").css({"top":"0px", "left":"-"+w+"px"});
  $(".proj_desc").hide();
  $("#sidebar").hide();
  setTimeout(function(){$("body").animate({scrollTop:0}, 100);}, 500);
  fadeContent();
  
  /* ========================== EVENT HANDLERS ===============================*/
  
  $(".nav_button").live('click', function() {   // For switching views
    if(!($(this).hasClass(currWindow))) {       // if not clicked curr window
      $(".hidden").slideUp("fast");
      moveOut(currWindow, time, true);
      currWindow = moveIn($(this), time);
    }
  });
  /* Handles 'work' view, slide down on project click */
  var curr_proj_id = "";                        // Store current project
  var new_height = 960;                         // New height of 'work' square
  var work_height = $("#work").height();        // Store old height
  $(".big_p").live('click', function(){
    // Change height, fix footer to bottom and scroll body down
    $("#work").animate({height: new_height }, 500);
    $("footer").animate({top: new_height-$("footer").outerHeight() }, 100);
    $("body").animate({
      scrollTop: $("#row_1").offset().top-12
    }, 500);
    var obj = $(this);                          // Store object
    var id = "#"+obj.attr("target");            // Get 'target' description
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
      curr_proj_id = id;                        // Set the new id
    }
  });
  $(".hide_disp").live('click', function() {    // Hide button on description
    var t = $(this);
    $("body").animate({ scrollTop: 0 }, 300);
    t.parent().slideUp(350);
    $("#work").animate({ height: work_height }, 300, function(){
      $("footer").animate({top: work_height-$("footer").outerHeight()}, 300);
    });
    $(curr_proj_id).hide();
    curr_proj_id = "";
  });
  $(".rafi").mouseenter(function(){$(this).html("&nbsp;;)");})
            .mouseleave(function(){$(this).html("Rafi");});
});

var i_back = "1";
var p_back = "bhangra3";
/* Handles how each view moves in */
function moveIn(obj, time) {
  var ret = "hack";
  if(obj.hasClass('index')) {
    $("#index").css({"backgroundImage": "url('/images/chicago"+i_back+".jpg')"});     // Change bground image
    i_back = i_back=="" ? "1" : "";               // Get ready for next change
    $("#index").animate({"top":"0px"}, time);     // Move down
    $("#index").show();                          
    //$("#site").toggle("slide");
    ret = "index";
  }
  else if(obj.hasClass('work')) {
    $("#work").animate({"left":"0px"}, time);
    $("#work").show();
    $("body").css({"backgroundColor" : "rgb(70, 70, 70)" });
    // Show the icons
    setTimeout(function(){$("#sidebar").slideToggle("normal");}, 100);
    ret = "work";
    
    /* OLD CODE
    $("#site_bottom").fadeOut(function() {
      $(this).html(site['work']).fadeIn();
    });
    */
    //setTimeout(function(){$("#sidebar").toggle("slide");}, 200);
  }
  else if(obj.hasClass('play')) {
    $("#play").css({"backgroundImage": "url('/images/"+p_back+".jpg')"});
    //p_back = p_back=="bhangra3" ? "beach" : "bhangra3";
    $("#play").animate({"left":"0px"}, time);
    $("#play").show();
    $("footer").css({"backgroundColor": "rgba(0,0,0,0.8)"});
    
    /*
    $("#site_bottom").fadeOut(function() {
      $(this).html(site['play']).fadeIn();
    });
    */
    ret = "play";
  }
  fadeContent();
  return ret;
}
/* Handles how each view exits */
function moveOut(wind, time, flag, callback) {
  if(!(typeof callback === "function")) {
    callback = function(){};
  }
  var h = $(window).height()+"px"
  var w = $(window).width()+"px";
  if(wind == "index") {
    $("#index").animate({"top":"-"+h}, time, function(){
      $("#index").hide();
      callback();
    });
    //if(flag) setTimeout(function(){$("#site").toggle("slide");}, 200);
  }
  else if(wind == "work") {
    $("#work").animate({"left":w}, time, function(){
      $("#work").hide();
      callback();
    });
    $("body").css({"backgroundColor" : "black" });
    //if(flag) setTimeout(function(){$("#sidebar").toggle("slide");}, 100);
    if(flag) setTimeout(function(){$("#sidebar").slideToggle("fast");}, 100);

  }
  else if(wind == "play") {
    $("#play").animate({"left":"-"+w}, time, function(){
      $("#play").hide();
      callback();
    });
    $("footer").css({"backgroundColor": "transparent"});
  }
}
/* Fades in certain text -- just for effects */
function fadeContent(callback) {
  $(".nav_button").css({opacity:0});
  $(".fade").css({opacity:0});
  var j=0;
  $.each($(".fade"), function(i,val) {
    setTimeout(function() {
      $(val).animate({opacity:1}, 1500);
    }, j*100);
    j++;
  });
  $.each($(".nav_button"), function(i, butt) {
    $(butt).animate({opacity:1}, 500);
  });
  if(typeof callback === "function") callback();
}    