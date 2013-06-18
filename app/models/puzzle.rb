class Puzzle < ActiveRecord::Base
  attr_accessible :difficulty, :grid_id, :points
end
