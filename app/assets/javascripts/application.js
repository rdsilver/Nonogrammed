// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require twitter/bootstrap
//= require_tree .
/*
var rgb = [250,2,250]
var dir = [-5,5,-5]

window.onload = function (){
	changeGlowOfHeader();
	setInterval(changeGlowOfHeader,600)
}

function changeGlowOfHeader(){

	for(var x=0;x<3;x++)
	{
		rgb[x]+=dir[x]
		if(!(rgb[x]<255 && rgb[x]>0))
			dir[x] *=-1;
		if(Math.random()>.99 && rgb[x]<255 && rgb[x]>0)
			dir[x] *=-1;
	}

	$(".nice_heading").css('text-shadow' , '0 0 10px rgb('+ rgb[0] + ',' +rgb[1]+','+rgb[2]+')');
	$('hr').css('background-color', 'rgb('+ rgb[0] + ',' +rgb[1]+','+rgb[2]+')');
	$(".glow").css('text-shadow' , '0 0 10px rgb('+ rgb[0] + ',' +rgb[1]+','+rgb[2]+')');
	$('#sidebar_left').css('background-color', 'rgb('+ rgb[0] + ',' +rgb[1]+','+rgb[2]+')');
	$('#sidebar_right').css('background-color', 'rgb('+ rgb[0] + ',' +rgb[1]+','+rgb[2]+')');
	$('input').css('border', '1px solid rgb('+ rgb[0] + ',' +rgb[1]+','+rgb[2]+')');
}
*/