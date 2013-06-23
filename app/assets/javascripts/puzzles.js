$(document).ready(function() {
  var deletion_mode = false;
  var mouse_down = false;

  $('.puzzle_cell').on('mousedown',function(e){
    e.preventDefault();
    deletion_mode = $(this).hasClass('black');
    if(deletion_mode){
      $(this).removeClass('black');
    }
    else $(this).addClass('black');
    mouse_down = true;
  });

  $('.puzzle_cell').hover(function(e){
    e.preventDefault();
    if(mouse_down){
      if(deletion_mode){
        $(this).removeClass('black');
      }
      else $(this).addClass('black');
    }
  });

  $('body').on('mouseup', function(e){
    e.preventDefault();
    mouse_down = false;
  });




});