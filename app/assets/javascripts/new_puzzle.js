$(document).ready(function() {
$('#size_of_new_puzzle').on('change', function(){ //If they change the size, we need to make the table that size
    new_size = $(this).val();
    $(".new_puzzle_area").width(400+new_size*3);
    $(".new_puzzle_area").height(400+(new_size-5)*23);

    $("#puzzle_table").html("");
    for( var x =0; x<new_size;x++)
    {
    	var $tr = $('<tr>'); 
    	$("#puzzle_table").append($tr);
    	for( var y=0;y<new_size;y++)
    	{
    	$tr.append($("<td class=puzzle_cell>"));
	}
    }

    //Clears Name Variable
    $('#name_of_puzzle').val("")

    //Updates number of puzzle per size
    $('#count_handler').html($('#count_for_sizes').attr('value-'+new_size)+ ' custom puzzles of this size so far, make more!');

 });

$('#create_new_puzzle').on('click', function(){
solution_string = getCurrentBoard();// Makes a solution string from all the cells
name = $('#name_of_puzzle').val().trim(); 


if(name==="") //NEED A TITLE TO SUBMIT
alert("Add a title!");
else
$.ajax({ 
    type:"POST",
    url: "../puzzles/create_new_puzzle?solution=" + solution_string+"&name="+name,
    dataType:"json",
    success: function(data) {
      console.log("success");
      $('.buttonia').prepend("<h1 class=submitted_success style='color:green'>Submitted!</>");
      $('.submitted_success').delay(1000).fadeOut();
    },
    error: function(xhr, status, error) {
       console.log(error);
      }
    });

});


});