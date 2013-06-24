$(document).ready(function() {
  var deletion_mode = false;
  var mouse_down = false;



  $('.puzzle_cell').on('mousedown',function(e){ /*Mousedown will make a square black if it is empty, otherwise make it empty*/
    e.preventDefault();
    deletion_mode = $(this).hasClass('black') || $(this).hasClass('x'); 
    if(deletion_mode){
      $(this).removeClass('black');
    }
    else if(e.which==1){
      $(this).addClass('black');
    }
    mouse_down = true;
  });

  $('.puzzle_cell').bind("contextmenu", function(e) {
    e.preventDefault();
    deletion_mode = $(this).hasClass('black') || $(this).hasClass('x'); 
    if(deletion_mode){
      $(this).removeClass('x');
    }
    else $(this).addClass('x');
    mouse_down = true

  });

  $('.puzzle_cell').hover(function(e){
    e.preventDefault();
    if(mouse_down){
      if(deletion_mode){
        $(this).removeClass('black');
        $(this).removeClass('x');
      }
      else if(e.which==1){
        $(this).addClass('black');
        $(this).removeClass('x');
      } 
      else{
        $(this).addClass('x');
      }
    }
  });


  $('#puzzle_and_buttons_div').on('mousedown',function(e){ /*Fixes unwanted highlighting*/
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

  $(document).keypress(function(event) {
    console.log(event.which);
    if(event.which == 13){
      $("#puzzle-cell-1-1").addClass('selected');
    }
    
  });

});