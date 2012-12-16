/*
Written for rafikhan.me, by Rafi Khan.
Edited December 15, 2012
*/
$(document).ready(function() {

  var time = 600;
  var w = $(window).width();
  var h = $(window).height();
  var windows = ["index", "work", "play", "blog", "academy"];
  var currWindow;

  var path = window.location.pathname;

  $("#work").css({top:"0px", left:w+"px"});
  $("#play").css({top:"0px", left:"-"+w+"px"});
  $("#blog").css({top:h+"px", left:"0px"});
  $("#academy").css({top:h+"px", left:"0px"});
  // $("#christina").css({top:h+"px", left:"-"+w+"px"});

  $("#sidebar").hide();

  if (path === "/") {

    currWindow = windows[0];

    window.history.pushState({view: "index"}, "Rafi Khan", "/");
  }
  else if (path === "/portfolio") {
    $("#index").hide().css({top: "-"+h+"px"});
    $("#work").css({top: "0px", left: "0px"}).show();
    $("#sidebar").show();

    currWindow = windows[1];
    window.history.pushState({view: "work"}, "Rafi Khan | Portfolio", "/portfolio");

  }
  else if (path === "/thelife") {
    $("#index").hide().css({top: "-"+h+"px"});
    $("#play").css({top: "0px", left: "0px"}).show();

    currWindow = windows[2];

    window.history.pushState({view: "play"}, "Rafi Khan | The Life", "/thelife");

  }
  else if (path === "/italia") {
    load_blog_entries();

    $("#index").hide().css({top: "-"+h+"px"});
    $("#blog").css({top:"0px", left:"0px"}).show();

    currWindow = windows[3];

    window.history.pushState({view: "blog"}, "Rafi Khan | Un'estate in Italia", "/italia");

  }
  else if (path === "/academy") {

    $("#index").hide().css({top: "-"+h+"px"});
    $("#academy").css({top:"0px", left:"0px"}).show();

    currWindow = windows[4];

    window.history.pushState({view: "academy"}, "Rafi Khan | For Khan Academy", "/academy");

  }
  /*
  else if (path == "/christina") {
    $("#index").hide().css({top: "-"+h+"px"});
    $("#christina").css({top:"0px", left:"0px"}).show();

    currWindow = windows[5];

    window.history.pushState({view: "christina"}, "Rafi Khan | An ode to Christina", "/christina");
  }
  */

  $(".icon").mouseenter();          // Load the icon images

  /* ========================== EVENT HANDLERS ============================= */
  
  // Scroll to project description on project tile click
  $(".big_project").click(function() {
    $("body,html,document").animate({
      scrollTop: $(".desc[name='"+$(this).attr("target")+"']").offset().top
    }, 500);
  });

  var orig_color = $(".token").css("color");
  var new_color = "#0099CC";

  // Underlines corresponding areas of expertise on project hover
  $(".big_project").mouseenter(function() {
    tok = $(this).attr("tokens").split(" ");
    $(tok).each(function(i, j) {
      $(".token[name='"+j+"']").css({
        color: new_color,
        textDecoration: "underline"
      });
    });
  }).mouseleave(function() {
    $(".token").css({
      color: orig_color,
      textDecoration: "none"
    });
  });

  // Navigation buttons
  $(".js-nav").click(function() {           // For switching views
    if(!($(this).hasClass(currWindow))) {       // if not clicked curr window
      if($(this).hasClass("blog")) {
        load_blog_entries();
      }
      $(".hidden").slideUp("fast");
      moveOut(currWindow, time, true);
      currWindow = moveIn($(this), time, true);
    }
  });

  // Play navigation
  $(".play_item").click(function() {
    target = $(this).attr("target");
    $(".play_content").css({opacity: 1});
    $(".play_frame").hide();
    $(".play_frame[class~='"+target+"']").show();
  });

  $(".play_close").click(function() {
    $(".play_content").css({opacity: 0});
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

});

var i_back = "1";
var p_back = "bhangra";
/* Handles how each view moves in */
function moveIn(obj, time, push) {
  var ret = "hack";
  if($(obj).hasClass('index')) {
    $("#index").css({"backgroundImage": "url('/images/backgrounds/chicago"+i_back+".jpg')"});     // Change bground image
    i_back = i_back==="" ? "1" : "";              // Get ready for next change
    $("#index").animate({"top":"0px"}, time);     // Move down
    $("#index").show();
    if (push)
      window.history.pushState({view: "index"}, "Rafi Khan", "/");

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
      window.history.pushState({view: "work"}, "Rafi Khan", "/portfolio");

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
      window.history.pushState({view: "play"}, "Rafi Khan", "/thelife");
  }
  else if($(obj).hasClass('blog')) {
    $("#blog").animate({"top":"0px"}, time);
    $("#footer").css({bottom: 0});
    $("#blog").show();
    // $("footer").css({"backgroundColor": "rgba(0,0,0,0.8)", bottom: 0});

    ret = "blog";
    if(push)
      window.history.pushState({view: "blog"}, "Rafi Khan | Un'estate in Italia", "/italia");
  }
  else if($(obj).hasClass('academy')) {
    $("#academy").animate({"top":"0px"}, time);
    $("#footer").css({bottom: 0});
    $("#academy").show();
    // $("footer").css({"backgroundColor": "rgba(0,0,0,0.8)", bottom: 0});

    ret = "academy";
    if(push)
      window.history.pushState({view: "academy"}, "Rafi Khan | For Khan Academy", "/academy");
  }
  /*
  else if($(obj).hasClass('christina')) {
    $("#christina").animate({"top":"0px", "left":"0px"}, time);
    $("#footer").hide();
    $("#christina").show();

    ret = "christina";
    if(push)
      window.history.pushState({view: "christina"}, "Rafi Khan | An ode to Christina", "/christina");
  }
  */
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
  else if(wind == "academy") {
    $("#academy").animate({"top":h}, time, function(){
      $("#academy").hide();
      callback();
    });
    // $("#footer").css({"backgroundColor": "transparent"});
  }
  /*
  else if(wind == "christina") {
    $("#christina").animate({"top":h, "left":"-"+w+"px"}, time, function(){
      $("#christina").hide();
      callback();
    });
  }
  */
}

function load_blog_entries () {
  $.get("/get_blog", function(data) {
    $("#blog-entries").html(data);
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
  });
}