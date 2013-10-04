
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

function check_solved_row_or_column(cell){
  row_num = $(cell).attr('id').split("-")[2];
  col_num = $(cell).attr('id').split("-")[3];

  //Check row for completition. 
  var total_row = "";
  var total_row_on = "";

  var total_column="";
  var total_column_on="";

  //Checks rows
  $('.puzzle_numbers_column').eq(row_num-1).find("b").each(function(){
          total_row += $(this).html(); 
    });
  var temp=0;
  $('.puzzle_numbers_column').eq(row_num-1).closest("tr").children('td.puzzle_cell').each(function(){
    if($(this).hasClass('black'))
      temp++;
    else if(temp>0)
    {
      total_row_on+=''+temp;
      temp=0;
    }
  });
    if(temp>0)
    total_row_on+=''+temp;

  if(total_row=== total_row_on)
    $('.puzzle_numbers_column').eq(row_num-1).addClass("row_column_finished");
  else
    $('.puzzle_numbers_column').eq(row_num-1).removeClass("row_column_finished");

  //Checks columns
   $(".puzzle_numbers_row").children("td").eq(col_num).children('b').each(function(){
    total_column += $(this).html();
  });

   temp=0;
   for(var x=1;x<=puzzleHeight();x++)
    if($(".black#puzzle-cell-"+x+"-"+col_num).length)
      temp ++;
    else if(temp>0)
    {
      total_column_on+=temp;
      temp=0;
    }

    if(temp>0)
      total_column_on+=temp;


  if(total_column=== total_column_on)
    $('.puzzle_numbers_row').children("td").eq(col_num).addClass("row_column_finished");
  else
    $('.puzzle_numbers_row').children("td").eq(col_num).removeClass("row_column_finished");
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

function checkSolution(solved_before){
  solution_string = getCurrentBoard();// Makes a solution string from all the cells
  puzzle_number = $('#puzzle_number').attr('value');
  temp_t = $('.timer').children('p').text().split(":");
  time_taken = parseInt(temp_t[0])*60 + parseInt(temp_t[1]);
  

  $.ajax({ //Checks to see if solution is correction
    type:"POST",
    url: "../puzzles/"+puzzle_number+"/check_solution?solution=" + solution_string+'&solved_before='+solved_before+'&time_taken='+time_taken,
    dataType:"json",
    success: function(data) {
      var solved = data.html;
      if(solved)
      {
      $('#solved_or_not').html("<h3 style='text-align:center; color:#7a9a0b'>SOLVED<h1>");
      clearInterval(intervalId);
      solved_before=true;
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
  var solved_before=false;




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
    deletion_mode = $(this).hasClass('black') || $(this).hasClass('x');
    if(deletion_mode && e.which==1){
      $(this).removeClass('black');
      $(this).removeClass('x');
    }
    else if(e.which==1){
      $(this).addClass('black');
    }
    mouse_down = true;
    check_solved_row_or_column($(this));
  });

  $('.puzzle_cell').bind("contextmenu", function(e) {
    e.preventDefault();
    deletion_mode = $(this).hasClass('black') || $(this).hasClass('x');
    if(deletion_mode){
      $(this).removeClass('x');
      $(this).removeClass('black');
    }
    else $(this).addClass('x');
    mouse_down = true;
    check_solved_row_or_column($(this));
  });

  $('.puzzle_cell').hover(function(e){
    e.preventDefault();
    row_num = $(this).attr('id').split("-")[2];
    col_num = $(this).attr('id').split("-")[3];
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
      check_solved_row_or_column($(this));
    }
  });

  $('#puzzle_and_buttons_div').on('mousedown',function(e){ /*Fixes unwanted highlighting*/
    e.preventDefault(); 
  });

  $('#check_solution').on('click', function(){
    checkSolution(solved_before);
  });

  $('#hint_puzzle').on('click', function(){
    giveHint();
    solved_before=true; //Prevents cheating
  });

  $('html').on('mouseup', function(e){
    e.preventDefault();
    mouse_down = false;
  });

  $('#reset_puzzle').on('click',function(){  /*Resets all the cells to have neither the X or the Black Css Class*/
    $('.puzzle_cell').each(function (){
      $(this).removeClass('black');
      $(this).removeClass("x");
      $('#solved_or_not').html("");
    });
    $(".puzzle_numbers_column").each(function(){
      $(this).removeClass("row_column_finished");
    });
    $(".puzzle_numbers_row").children('td').each(function(){
      $(this).removeClass("row_column_finished");
    });
    resetTimer();
  });  

});

