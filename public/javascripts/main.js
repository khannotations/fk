/*
Written for faiazkhan.com, by Faiaz Khan.
Edited June 26, 2012
*/
$(document).ready(function() {

  var time = 600;
  var w = $(window).width();
  var h = $(window).height();
  var windows = ["index", "work", "play", "blog", "christina"];
  var currWindow;

  var path = window.location.pathname;

  $("#work").css({top:"0px", left:w+"px"});
  $("#play").css({top:"0px", left:"-"+w+"px"});
  $("#blog").css({top:h+"px", left:"0px"});
  $("#christina").css({top:h+"px", left:"-"+w+"px"});

  $("#sidebar").hide();

  if (path === "/") {

    currWindow = windows[0];

    window.history.pushState({view: "index"}, "Faiaz Khan", "/");
  }
  else if (path === "/portfolio") {
    $("#index").hide().css({top: "-"+h+"px"});
    $("#work").css({top: "0px", left: "0px"}).show();
    $("#sidebar").show();


    currWindow = windows[1];
    window.history.pushState({view: "work"}, "Faiaz Khan | Portfolio", "/portfolio");

  }
  else if (path === "/thelife") {
    $("#index").hide().css({top: "-"+h+"px"});
    $("#play").css({top: "0px", left: "0px"}).show();

    currWindow = windows[2];

    window.history.pushState({view: "play"}, "Faiaz Khan | The Life", "/thelife");

  }
  else if (path === "/italia") {
    $("#index").hide().css({top: "-"+h+"px"});
    $("#blog").css({top:"0px", left:"0px"}).show();

    currWindow = windows[3];

    window.history.pushState({view: "blog"}, "Faiaz Khan | Un'estate in Italia", "/italia");

  }
  else if (path == "/christina") {
    $("#index").hide().css({top: "-"+h+"px"});
    $("#christina").css({top:"0px", left:"0px"}).show();

    currWindow = windows[4];

    window.history.pushState({view: "christina"}, "Faiaz Khan | An ode to Christina", "/christina");
  }

  $(".icon").mouseenter();          // Load the icon images
  $(".english").hide();             // Hide english translations in blog
  $(".fancybox-thumb").fancybox({   // Fancybox
    //prevEffect  : 'none',
    //nextEffect  : 'none',
    changeFade: 1000,
    titlePosition: 'over',
    padding: 0,
    overlayOpacity: 0.8,
    overlayColor: '#000',
    helpers : {
      title : {
        type: 'outside'
      },
      overlay : {
        opacity : 0.8,
        css : {
          'background-color' : '#000'
        }
      },
      thumbs  : {
        width : 50,
        height  : 50
      },
      media: {}
    }
  });

  /* NIVO SLIDER */
  /*
  $('.nivoSlider').nivoSlider({
    effect: "fold,fade,sliceDown,slideInRight",
    //directionNavHide: false,
    pauseTime: 5000
  });
  */

  /* ========================== EVENT HANDLERS ============================= */
  
  // Scroll to project description on project tile click
  $(".big_project").click(function() {
    $("body").animate({
      scrollTop: $(".desc[name='"+$(this).attr("target")+"']").offset().top
    }, 500);
  });

  var orig_color = $(".token").css("color");

  // Underlines corresponding areas of expertise on project hover
  $(".big_project").mouseenter(function() {
    tok = $(this).attr("tokens").split(" ");
    $(tok).each(function(i, j) {
      $(".token[name='"+j+"']").css({
        color: "black",
        textDecoration: "underline"
      });
    });
  }).mouseleave(function() {
    $(".token").css({
      color: orig_color,
      textDecoration: "none"
    });
  });

  $(".js-nav").click(function() {           // For switching views
    if(!($(this).hasClass(currWindow))) {       // if not clicked curr window
      $(".hidden").slideUp("fast");
      moveOut(currWindow, time, true);
      currWindow = moveIn($(this), time, true);
    }
  });

  // Back/forward button clicked
  window.onpopstate = function(event) {
    l = (event.state && event.state.view) || "";
    if (l !== "") {
      moveOut(currWindow, time, true);
      currWindow = moveIn($("."+l)[0], time, false);
      back = true;
    }
  };

  $("#to-italiano").click(function() {
    $(".english").hide();
    $(".italiano").show();
    $(".notice").slideUp("fast");

  });
  $("#to-english").click(function() {
    $(".italiano").hide();
    $(".english").show();
    $(".notice").slideDown("fast");
  });

  $(".rafi")
    .mouseenter(function(){$(this).html("&nbsp;;)");})
    .mouseleave(function(){$(this).html("Rafi");});
});

var i_back = "1";
var p_back = "bhangra3";
/* Handles how each view moves in */
function moveIn(obj, time, push) {
  var ret = "hack";
  if($(obj).hasClass('index')) {
    $("#index").css({"backgroundImage": "url('/images/backgrounds/chicago"+i_back+".jpg')"});     // Change bground image
    i_back = i_back==="" ? "1" : "";              // Get ready for next change
    $("#index").animate({"top":"0px"}, time);     // Move down
    $("#index").show();
    if (push)
      window.history.pushState({view: "index"}, "Faiaz Khan", "/");

    ret = "index";

  }
  else if($(obj).hasClass('work')) {
    $("#work").animate({"left":"0px"}, time, function() {
      $("#footer").css({bottom: 0});
    });
    $("#work").show();

    // Show the icons
    setTimeout(function(){$("#sidebar").slideDown("normal");}, 100);
    ret = "work";
    if(push)
      window.history.pushState({view: "work"}, "Faiaz Khan", "/portfolio");
    
    /* OLD CODE
    $("#site_bottom").fadeOut(function() {
      $(this).html(site['work']).fadeIn();
    });
    */

  }
  else if($(obj).hasClass('play')) {
    $("#play").css({"backgroundImage": "url('/images/backgrounds/"+p_back+".jpg')"});
    //p_back = p_back=="bhangra3" ? "beach" : "bhangra3";
    $("#play").animate({"left":"0px"}, time);
    $("#footer").css({bottom: 0});
    $("#play").show();
    $("footer").css({"backgroundColor": "rgba(0,0,0,0.8)", bottom: 0});

    /*
    $("#site_bottom").fadeOut(function() {
      $(this).html(site['play']).fadeIn();
    });
    */
    ret = "play";
    if(push)
      window.history.pushState({view: "play"}, "Faiaz Khan", "/thelife");
  }
  else if($(obj).hasClass('blog')) {
    $("#blog").animate({"top":"0px"}, time);
    $("#footer").css({bottom: 0});
    $("#blog").show();
    // $("footer").css({"backgroundColor": "rgba(0,0,0,0.8)", bottom: 0});

    ret = "blog";
    if(push)
      window.history.pushState({view: "blog"}, "Faiaz Khan | Un'estate in Italia", "/italia");
  }
  else if($(obj).hasClass('christina')) {
    $("#christina").animate({"top":"0px", "left":"0px"}, time);
    $("#footer").hide();
    $("#christina").show();

    ret = "christina";
    if(push)
      window.history.pushState({view: "christina"}, "Faiaz Khan | An ode to Christina", "/christina");
  }
  return ret;
}
/* Handles how each view exits */
function moveOut(wind, time, flag, callback) {
  if(typeof callback !== "function") {
    callback = function(){};
  }
  var h = $(window).height()+"px";
  var w = $(window).width()+"px";
  if(wind == "index") {
    $("#index").animate({"top":"-"+h}, time, function(){
      $("#index").hide();
      callback();
    });

  }
  else if(wind == "work") {
    $("#work").animate({"left":w}, time, function(){
      $("#work").hide();
      callback();
    });
    $("body").css({"backgroundColor" : "black" });
    if(flag) setTimeout(function(){$("#sidebar").slideToggle("fast");}, 100);

  }
  else if(wind == "play") {
    $("#play").animate({"left":"-"+w}, time, function(){
      $("#play").hide();
      callback();
    });
    $("#footer").css({"backgroundColor": "transparent"});
  }
  else if(wind == "blog") {
    $("#blog").animate({"top":h}, time, function(){
      $("#blog").hide();
      callback();
    });
    // $("#footer").css({"backgroundColor": "transparent"});
  }
  else if(wind == "christina") {
    $("#christina").animate({"top":h, "left":"-"+w+"px"}, time, function(){
      $("#christina").hide();
      callback();
    });
  }
}

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