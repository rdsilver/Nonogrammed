class Grid < ActiveRecord::Base
  belongs_to :puzzle
  attr_accessible :height, :solution, :width
end
