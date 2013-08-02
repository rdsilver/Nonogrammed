class DashboardController < ApplicationController

  def show
  	rand_puzzle_id = Puzzle.all.sample.id
  	redirect_to :controller => 'puzzles' , :action => 'show' , :id => rand_puzzle_id 
  end

end
