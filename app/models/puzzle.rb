class Puzzle < ActiveRecord::Base
	has_one :grid
  attr_accessible :difficulty, :grid_id, :points, :grid_id
end
