/*
 * Written for rafikhan.me, by Rafi Khan.
 * Edited June 6, 2013
 *
 */
var load_blog_entries, make_soundulous_video;

load_blog_entries = function() {
  return $.get("/get_blog", function(data) {
    $("#blog-entries").html(data);
    $(".english").hide();
    return $(".fancybox-thumb").fancybox({
      changeFade: 1000,
      titlePosition: "over",
      padding: 0,
      overlayOpacity: 0.8,
      overlayColor: "#000",
      helpers: {
        title: {
          type: "outside"
        },
        overlay: {
          opacity: 0.8,
          css: {
            "background-color": "#000"
          }
        },
        thumbs: {
          width: 50,
          height: 50
        },
        media: {}
      }
    });
  });
};

make_soundulous_video = function() {
  return $(".soundulous-video").click(function() {
    var url;
    url = this.href.replace(new RegExp("watch\\?v=", "i"), "v/");
    url += "?autoplay=1";
    $.fancybox({
      padding: 0,
      autoScale: false,
      transitionIn: "none",
      transitionOut: "none",
      width: 640,
      height: 385,
      href: url,
      type: "swf",
      swf: {
        wmode: "transparent",
        allowfullscreen: "true"
      }
    });
    return false;
  });
};

$(document).ready(function() {
  var path;
  path = window.location.path;

  // Porfolio
  make_soundulous_video();
  $(".icon").mouseenter();
  $(".big_project").click(function() {
    return $("body,html,document").animate({
      scrollTop: $(".desc[name='" + $(this).attr("target") + "']").offset().top
    }, 500);
  });
  $(".big_project").mouseenter(function() {
    var tok;
    tok = $(this).attr("tokens").split(" ");
    return $(tok).each(function(i, j) {
      return $(".token[name='" + j + "']").addClass('highlight');
    });
  }).mouseleave(function() {
    return $(".token").removeClass('highlight');
  });

  // Life 
  $(".play_item").click(function() {
    var target;
    target = $(this).attr("target");
    $(".play_content").css({
      opacity: 1
    });
    $(".play_frame[target!='" + target + "']").hide();
    return $(".play_frame[target='" + target + "']").show();
  });
  $(".play_close").click(function() {
    return $(".play_content").css({
      opacity: 0
    });
  });

  // Blog
  if (path === "/italia") {
    load_blog_entries();
  }
  $("#to-italiano").click(function() {
    $(".english").hide();
    $(".italiano").show();
    return $(".notice").slideUp("fast");
  });
  return $("#to-english").click(function() {
    $(".italiano").hide();
    $(".english").show();
    return $(".notice").slideDown("fast");
  });
});
