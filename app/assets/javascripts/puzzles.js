function puzzleHeight(){
  return parseInt($('#puzzle_height').attr('value'));
}

function puzzleWidth(){
  return parseInt($('#puzzle_width').attr('value'));
}

function pad (str, max) {
  return str.length < max ? pad("0" + str, max) : str;
}

function getCurrentBoard()
{
  solution_string = "";
    $('.puzzle_cell').each(function(){
      if($(this).hasClass('black'))
        solution_string += "1";
      else
        solution_string += "0";
    });

  return solution_string;
}

function check_solved_row_or_column(row_num , col_num){
  
  console.log(row_num);
  $('.puzzle_numbers_column').each(function (){
      $(this).children("b").each(function(){
      });
    });

}

function giveHint()
{

  solution_string = getCurrentBoard();
  puzzle_number = $('#puzzle_number').attr('value')

  $.ajax({
    type:"POST",
    url: "../puzzles/"+puzzle_number+"/give_hint?solution=" + solution_string,
    dataType:"json",
    success: function(data) {
      on_or_off = data.html.split(" ")[0];
      index = data.html.split(" ")[1];
      if(index>=0)
      if(on_or_off == 1){
        $('td.puzzle_cell:eq('+index+')').addClass('black');
        $('td.puzzle_cell:eq('+index+')').removeClass('x');
      }
      else{
        $('td.puzzle_cell:eq('+index+')').addClass('x');
        $('td.puzzle_cell:eq('+index+')').removeClass('black');
      }

    },
    error: function(xhr, status, error) {
       console.log(error);
    }
  });
}

function checkSolution(){
  solution_string = getCurrentBoard();// Makes a solution string from all the cells
  puzzle_number = $('#puzzle_number').attr('value')
  

  $.ajax({ //Checks to see if solution is correction
    type:"POST",
    url: "../puzzles/"+puzzle_number+"/check_solution?solution=" + solution_string,
    dataType:"json",
    success: function(data) {
      var solved = data.html;
      if(solved)
      {
      $('#solved_or_not').html("<h3 style='text-align:center; color:#7a9a0b'>SOLVED<h1>");
      clearInterval(intervalId);
      }
      else $('#solved_or_not').html("<h3 style='text-align:center; color:#e45846'>WRONG<h1>");
    },
    error: function(xhr, status, error) {
       console.log(error);
      }
    });
}

function row(cell){//only call this on puzzle grid cells, plz and thx
  var value = parseInt(cell.attr("id")[12]);//this just happens to be where in the id the value is, trust me
  if (!isNaN(parseInt(cell.attr("id")[13]))){//if the prospective next digit is a number
    value = 10 * value;//turn the current 1s digit into a 10s digit
    value += parseInt(cell.attr('id')[13]);//and then add the actual 1s digit
  }
  return value;
}

function column(cell){//only call this on puzzle grid cells plz and thx
  var value = parseInt(cell.attr("id")[14]);
  if (!isNaN(parseInt(cell.attr('id')[15]))){//if the prospective next digit is a number
    value = 10 * value;//turn the current 1s digit into a 10s digit
    value += parseInt(cell.attr('id')[15]);//and then add the actual 1s digit
  }
  if (row(cell) > 9){//then we need to shift everything over a character because the row has a 10s digit
    value = parseInt(cell.attr("id")[15]);
    if (!isNaN(parseInt(cell.attr('id')[16]))){//if the prospective next digit is a number
      value = 10 * value;//turn the current 1s digit into a 10s digit
      value += parseInt(cell.attr('id')[16]);//and then add the actual 1s digit
    }
  }
  return value;
}

function findCell(row, col){
  var targetString = '#puzzle-cell-'
  targetString += row;
  targetString += '-';
  targetString += col;
  return $(targetString)
}



function toggleSelectedCellBlack(){
  if (currentSelectedCell().hasClass('black')){
    currentSelectedCell().removeClass('black');
  }
  else currentSelectedCell().addClass('black');
}

function toggleSelectedCellX(){
  if (currentSelectedCell().hasClass('x')){
    currentSelectedCell().removeClass('x');
  }
  else currentSelectedCell().addClass('x');
}

var time=0;
function timer()
{
  time+=1;
  minutes = Math.floor(time/60)+'';
  seconds = time%60+'';
  $('.timer').html("<p class='bold'>"+pad(minutes,2)+':'+pad(seconds,2)+"</p>");
}

function resetTimer()
{
  time=0;
  minutes = time/60+'';
  seconds = time%60+'';
  $('.timer').html("<p class='bold'>"+pad(minutes,2)+':'+pad(seconds,2)+"</p>");
  clearInterval(intervalId);
  intervalId = setInterval(timer,1000);
}

window.onload = function (){
  intervalId = setInterval(timer,1000);
}

$(document).ready(function() {
  var deletion_mode = false;
  var mouse_down = false;



  $("#puzzle_table").delegate('td.puzzle_cell','mouseover mouseout', function(e) {
    row_num = $(this).attr('id').split('-')[2] -1;
    col_num = $(this).attr('id').split('-')[3];
   if (e.type == 'mouseover') {
      $('tr.puzzle_numbers_row td:eq('+col_num+')').addClass("hover_highlight");
      $('td.puzzle_numbers_column:eq('+row_num+')').addClass("hover_highlight");
    }
    else {
      $('tr.puzzle_numbers_row td:eq('+col_num+')').removeClass("hover_highlight");
      $('td.puzzle_numbers_column:eq('+row_num+')').removeClass("hover_highlight");
    }
   });



  $('.puzzle_cell').on('mousedown',function(e){ /*Mousedown will make a square black if it is empty, otherwise make it empty*/
    e.preventDefault();
    row_num = $(this).attr('id').split("-")[2];
    col_num = $(this).attr('id').split("-")[3];
    check_solved_row_or_column(row_num,col_num);
    deletion_mode = $(this).hasClass('black') || $(this).hasClass('x');
    if(deletion_mode && e.which==1){
      $(this).removeClass('black');
      $(this).removeClass('x');
    }
    else if(e.which==1){
      $(this).addClass('black');
    }
    mouse_down = true;
  });

  $('.puzzle_cell').bind("contextmenu", function(e) {
    e.preventDefault();
    row_num = $(this).attr('id').split("-")[2];
    col_num = $(this).attr('id').split("-")[3];
    check_solved_row_or_column(row_num,col_num);
    deletion_mode = $(this).hasClass('black') || $(this).hasClass('x');
    if(deletion_mode){
      $(this).removeClass('x');
      $(this).removeClass('black');
    }
    else $(this).addClass('x');
    mouse_down = true;
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

  $('#check_solution').on('click', function(){
    checkSolution();
  });

  $('#hint_puzzle').on('click', function(){
    giveHint();
  });

  $('body').on('mouseup', function(e){
    e.preventDefault();
    mouse_down = false;
  });

  $('#reset_puzzle').on('click',function(){  /*Resets all the cells to have neither the X or the Black Css Class*/
    $('.puzzle_cell').each(function (){
      $(this).removeClass('black');
      $(this).removeClass("x");
      $('#solved_or_not').html("");
    });
    resetTimer();
  });  

});

