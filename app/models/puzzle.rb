class Puzzle < ActiveRecord::Base
  has_one :grid
  attr_accessible :difficulty, :grid_id, :points, :grid_id, :times_solved
  before_save :default_values

  def default_values
    self.times_solved ||= '0'
  end

end
