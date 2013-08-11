class DashboardController < ApplicationController

  def show

  	if params[:size].nil?
  	 rand_puzzle_id = Puzzle.all.sample.id
  	else
     rand_puzzle_id = Grid.where('width =?', params[:size]).sample.puzzle_id
    end

  redirect_to :controller => 'puzzles' , :action => 'show' , :id => rand_puzzle_id 

  end

end
