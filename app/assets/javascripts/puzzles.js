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


  $('#puzzle_table').on('mousedown',function(e){ /*Fixes unwanted highlighting*/
    e.preventDefault(); 
  });

  $('body').on('mouseup', function(e){
    e.preventDefault();
    mouse_down = false;
  });

  $('#reset_puzzle').on('click',function(){  /*Resets all the cells to have neither the X or the Black Css Class*/
    $('.puzzle_cell').each(function (){
      $(this).removeClass('black');
      $(this).removeClass("x");
    });
  });  

});