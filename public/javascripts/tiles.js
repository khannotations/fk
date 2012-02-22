$(document).ready(function() {
  $('body').focus();
  $('body').keyup(function(e){
    e.preventDefault();
    console.log(e.keyCode);
  });
  $(".tile").mouseover(function(){
    tileOnOff(this, 1000, 0);
  });
  
  $("#message").hide();
  // GLOBALLY, HEIGHT == 8 AND WIDTH == 5
  var STARTCOL = 20, STARTROW = 20;
  var fade = 1000, linger = 1500;
  
  flashplay(12, 13, function(){
    flashor(22, 19, function(){
      flashwork(32, 13);
    });
  });
  
  setTimeout(function() {
    drawQM(22, 22, function(){
      $(".trans_box").css({
        'width': '336px',
        'height': '124px',
      });
      $(".trans_box").mouseover(function(){
        $(this).css({'opacity': "0.25"});
      });
      $(".trans_box").mouseout(function(){
        $(this).css({'opacity': "0"});
      });
      $(".trans_box").click(function(){
        var string = "/"+$(this).attr("id");
        console.log(string);
        $('body').fadeOut(500, function(){
          $(location).attr('href',string);
        });
      });
      drawplay(10, 13);
      drawwork(32, 13);
    });
  }, 5000);

});
//backgroundColor: "#6A6DF7" "BAB4ED" "B5F5C2"

/* Turns a tile on, then off.
@delay: time before animation starts.
@fade: time animation takes--time to change colors (on and off)
@linger: after on (completely), how long tile stays before fading back.
NOTE: total onTime = fade(in)+linger+fade(out) = 2*fade+linger
      total animationTime = onTime+delay.*/
var color, orig;

orig = "rba(0,0,0,0.8)";
color = "#FFFFFF";
//orig = "#B5F5C2";
//color = "#6A6DF7";

function tileOnOff(obj, fade, linger, callback){
  tileOff(obj, 45, function(){
    tileOn(obj, fade, linger);
  }, callback);
}
function tileOn(obj, fade, off, callback) {
    // Call the callback before animation starts
    $(obj).animate({backgroundColor:"black"}, fade, function(){
      if(typeof callback=='function') callback.call();
      if(typeof off=='function') off.call();
    });
}
function tileOff(obj, fade, linger, callback) {
  setTimeout( function(){
    // Call the callback after animation ends.
    $(obj).animate({backgroundColor:"white"}, fade, callback);
  }, linger);
}

// Flashes a vertical line from sRow and sCol w length len
function flashVert(sRow, sCol, len, callback) {
  if(len==0) {
    if(typeof callback=='function') callback.call();
    return;
  }
  tileOnOff($("#tile"+sRow+"-"+sCol), 5000/(len+3), 5000/(len+3), function(){
    flashVert(sRow+1, sCol, len-1, callback);
  });
}
function flashHoriz(sRow, sCol, len, callback) {
  if(len==0) {
    if(typeof callback=='function') callback.call();
    return;
  }
  tileOnOff($("#tile"+sRow+"-"+sCol), 5000/(len+3), 5000/(len+3), function(){
    flashHoriz(sRow, sCol+1, len-1, callback);
  });
}

// Draws lines (they don't go away)
function drawVert(sRow, sCol, len, callback) {
  if(len==0) {
    if(typeof callback=='function') callback.call();
    return;
  }
  tileOn($("#tile"+sRow+"-"+sCol), 45, function(){
    drawVert(sRow+1, sCol, len-1, callback);
  });
}
function drawHoriz(sRow, sCol, len, callback) {
  if(len==0) {
    if(typeof callback=='function') callback.call();
    return;
  }
  tileOn($("#tile"+sRow+"-"+sCol), 45, function(){
    drawHoriz(sRow, sCol+1, len-1, callback);
  });
}
var fade = 1000, linger = 1500;
// Flash the word 'play'
function flashplay(row, col, callback){
  flashp(row, col, function(){
    flashl(row, col+6, function(){
      flasha(row, col+12, function(){
        flashy(row, col+18, callback);
      });
    });
  });
}
function flashor(row, col, callback) {
  flasho(row, col, function(){
    flashr(row, col+6, callback);
  });
}
function flashwork(row, col, callback){
  flashw(row, col, function(){
    flasho(row, col+6, function(){
      flashr(row, col+12, function(){
        flashk(row, col+18, callback);
      });
    });
  });
}
function flashh(row, col, callback) {
  flashVert(row, col, 3, function(){
    flashVert(row+3, col, 3);
    //flashHoriz(row+lowHalfHeight, col+1, width-2, 250, 200, 1000, function(){
      //flashVert(row, col+width-1, height, 500, 200, 1000, callback);
    //});
  });
}
function flashi(row, col, callback) {
  tileOnOff($("#tile"+row+"-"+(col+2)));
  tileOnOff($("#tile"+(row+2)+"-"+(col+1)), function(){
    flashVert(row+2, col+2, 4, function(){
      flashHoriz(row+6, col+1, 3, callback);
    });
  });
}

function flashp(row, col, callback) {
  flashVert(row+2, col, 3, function(){
    flashVert(row+5, col, 3);
    flashHoriz(row+5, col+1, 3);
  });
  flashHoriz(row+2, col+1, 3, function(){
    flashVert(row+3, col+4, 2, callback);
  });
}
function flashl(row, col, callback) {
  tileOnOff($("#tile"+row+"-"+(col+1)), fade, linger, function() {
    flashVert(row, col+2, 6, function() {
      flashHoriz(row+6, col+1, 3, callback);
    });
  });
}
function flasha(row, col, callback) {
  flashHoriz(row+2, col+1, 3, function(){
    flashVert(row+3, col+4, 4);
  });
  tileOnOff($("#tile"+(row+5)+"-"+col), fade, linger, function(){
    flashHoriz(row+4, col+1, 3);
    flashHoriz(row+6, col+1, 3, callback);
  });
}
function flashy(row, col, callback) {
  flashVert(row+2, col, 3, function(){
    flashHoriz(row+5, col+1, 3, function(){
      flashVert(row+2, col+4, 5, callback);
    });
    flashHoriz(row+7, col+1, 3);
  });
}
function flashw(row, col, callback) {
  flashVert(row+2, col, 4, function(){
    tileOnOff($("#tile"+(row+6)+"-"+(col+1)), fade, linger);
    flashVert(row+4, col+2, 2, function(){
      tileOnOff($("#tile"+(row+6)+"-"+(col+3)), fade, linger);
      flashVert(row+2, col+4, 4, callback);
    });
  });
}
function flasho(row, col, callback) {
  flashVert(row+3, col, 3, function() {
    flashHoriz(row+6, col+1, 3);
    flashHoriz(row+2, col+1, 3, function() {
      flashVert(row+3, col+4, 3, callback);
    });
  });
}
function flashr(row, col, callback) {
  flashVert(row+2, col, 5, function() {
    tileOnOff($("#tile"+(row+3)+"-"+(col+1)), fade, linger, function(){
      flashHoriz(row+2, col+2, 2, function() {
        tileOnOff($("#tile"+(row+3)+"-"+(col+4)), fade, linger, callback);
      });
    });
  });
}
function flashk(row, col, callback) {
  flashVert(row, col+1, 5, function(){
    tileOnOff($("#tile"+(row+4)+"-"+(col+2)), fade, linger, function(){
      flashVert(row+5, col+1, 2);
      tileOnOff($("#tile"+(row+3)+"-"+(col+3)), fade, linger);
      tileOnOff($("#tile"+(row+5)+"-"+(col+3)), fade, linger, function(){
        tileOnOff($("#tile"+(row+2)+"-"+(col+4)), fade, linger);
        tileOnOff($("#tile"+(row+6)+"-"+(col+4)), fade, linger, callback);
      });
    });
  });
}
fadeIn = 10;
function drawQM(row, col, callback) {
  tileOn($("#tile"+(row+1)+"-"+col), fadeIn, function() {
    drawHoriz(row, col+1, 3, function() {
      drawVert(row+1, col+4, 2, function() {
        tileOn($("#tile"+(row+3)+"-"+(col+3)), fadeIn, function() {
          tileOn($("#tile"+(row+4)+"-"+(col+2)), fadeIn, function() {
            tileOn($("#tile"+(row+6)+"-"+(col+2)), fadeIn, callback);
          });
        });
      });
    });
  });
}
function drawplay(row, col, callback){
  drawp(row, col, function(){
    drawl(row, col+6, function(){
      drawa(row, col+12, function(){
        drawy(row, col+18, callback);
      });
    });
  });
}
function drawor(row, col, callback) {
  drawo(row, col, function(){
    drawr(row, col+6, callback);
  });
}
function drawwork(row, col, callback){
  draww(row, col, function(){
    drawo(row, col+6, function(){
      drawr(row, col+12, function(){
        drawk(row, col+18, callback);
      });
    });
  });
}

/* Letters */
function drawh(row, col, callback) {
  drawVert(row, col, 3, function(){
    drawVert(row+3, col, 3);
    //drawHoriz(row+lowHalfHeight, col+1, width-2, 250, 200, 1000, function(){
      //drawVert(row, col+width-1, height, 500, 200, 1000, callback);
    //});
  });
}
function drawi(row, col, callback) {
  tileOn($("#tile"+row+"-"+(col+2)), fadeIn);
  tileOn($("#tile"+(row+2)+"-"+(col+1)), fadeIn, function(){
    drawVert(row+2, col+2, 4, function(){
      drawHoriz(row+6, col+1, 3, callback);
    });
  });
}

function drawp(row, col, callback) {
  drawVert(row+2, col, 3, function(){
    drawVert(row+5, col, 3);
    drawHoriz(row+5, col+1, 3);
  });
  drawHoriz(row+2, col+1, 3, function(){
    drawVert(row+3, col+4, 2, callback);
  });
}
function drawl(row, col, callback) {
  tileOn($("#tile"+row+"-"+(col+1)), fadeIn, function() {
    drawVert(row, col+2, 6, function() {
      drawHoriz(row+6, col+1, 3, callback);
    });
  });
}
function drawa(row, col, callback) {
  drawHoriz(row+2, col+1, 3, function(){
    drawVert(row+3, col+4, 4);
  });
  tileOn($("#tile"+(row+5)+"-"+col), fadeIn, function(){
    drawHoriz(row+4, col+1, 3);
    drawHoriz(row+6, col+1, 3, callback);
  });
}
function drawy(row, col, callback) {
  drawVert(row+2, col, 3, function(){
    drawHoriz(row+5, col+1, 3, function(){
      drawVert(row+2, col+4, 5, callback);
    });
    drawHoriz(row+7, col+1, 3);
  });
}
function draww(row, col, callback) {
  drawVert(row+2, col, 4, function(){
    tileOn($("#tile"+(row+6)+"-"+(col+1)), fadeIn);
    drawVert(row+4, col+2, 2, function(){
      tileOn($("#tile"+(row+6)+"-"+(col+3)), fadeIn);
      drawVert(row+2, col+4, 4, callback);
    });
  });
}
function drawo(row, col, callback) {
  drawVert(row+3, col, 3, function() {
    drawHoriz(row+6, col+1, 3);
    drawHoriz(row+2, col+1, 3, function() {
      drawVert(row+3, col+4, 3, callback);
    });
  });
}
function drawr(row, col, callback) {
  drawVert(row+2, col, 5, function() {
    tileOn($("#tile"+(row+3)+"-"+(col+1)), fadeIn, function(){
      drawHoriz(row+2, col+2, 2, function() {
        tileOn($("#tile"+(row+3)+"-"+(col+4)), fadeIn, callback);
      });
    });
  });
}
function drawk(row, col, callback) {
  drawVert(row, col+1, 5, function(){
    tileOn($("#tile"+(row+4)+"-"+(col+2)), fadeIn, function(){
      drawVert(row+5, col+1, 2);
      tileOn($("#tile"+(row+3)+"-"+(col+3)), fadeIn);
      tileOn($("#tile"+(row+5)+"-"+(col+3)), fadeIn, function(){
        tileOn($("#tile"+(row+2)+"-"+(col+4)), fadeIn);
        tileOn($("#tile"+(row+6)+"-"+(col+4)), fadeIn, callback);
      });
    });
  });
}