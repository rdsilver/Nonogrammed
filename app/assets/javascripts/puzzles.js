function puzzleHeight(){
  return parseInt($('#puzzle_height').attr('value'));
}

function puzzleWidth(){
  return parseInt($('#puzzle_width').attr('value'));
}

function checkSolution(){
  solution_string = "";             // Makes a solution string from all the cells
  puzzle_number = $(location).attr('href').split("/")[4];
    $('.puzzle_cell').each(function(){
      if($(this).hasClass('black'))
        solution_string += "1";
      else
        solution_string += "0";
    });

  $.ajax({ //Checks to see if solution is correction
    type:"POST",
    url: "../puzzles/"+puzzle_number+"/check_solution?solution=" + solution_string,
    dataType:"json",
    success: function(data) {
      var solved = data.html;
      if(solved)
      $('#upper_text').html("<h1 style='text-align:center'>SOLVED<h1>");
    },
    error: function(xhr, status, error) {
       console.log(error);
      }
    });
}

function currentSelectedCell(){
  return $('.puzzle_cell.selected')
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


function moveSelectedDown(){
  if(row(currentSelectedCell()) == puzzleHeight()){
    return;//if the row of the currently selected cell is equal to the puzzle height, don't do anything at all
  }
  var targetCell = findCell(row(currentSelectedCell()) + 1, column(currentSelectedCell()));
  currentSelectedCell().removeClass('selected');
  targetCell.addClass('selected');
};

function moveSelectedUp(){
  if(row(currentSelectedCell()) == 1){
    return;//if the row of the currently selected cell the top row, don't do anything at all
  }
  var targetCell = findCell(row(currentSelectedCell()) - 1, column(currentSelectedCell()));
  currentSelectedCell().removeClass('selected');
  targetCell.addClass('selected');
};

function moveSelectedRight(){
  if(column(currentSelectedCell()) == puzzleWidth()){
    return;
  }
  var targetCell = findCell(row(currentSelectedCell()), column(currentSelectedCell()) + 1);
  currentSelectedCell().removeClass('selected');
  targetCell.addClass('selected');
}

function moveSelectedLeft(){
  if(column(currentSelectedCell()) == 1){
    return;
  }
  var targetCell = findCell(row(currentSelectedCell()), column(currentSelectedCell()) - 1);
  currentSelectedCell().removeClass('selected');
  targetCell.addClass('selected');
}

$(document).ready(function() {
  var deletion_mode = false;
  var mouse_down = false;



  $('.puzzle_cell').hover(function(e){
    
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
    checkSolution();
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
    checkSolution();
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
      checkSolution();
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
    if(event.which == 13){//Enter
      $("#puzzle-cell-1-1").addClass('selected');
    }
    if(event.which == 115){//S
      moveSelectedDown();
    }
    else if(event.which == 119){//W
      moveSelectedUp();
    }
    else if(event.which == 97){//A
      moveSelectedLeft();
    }
    else if(event.which == 100){//D
      moveSelectedRight();
    }
  });

});