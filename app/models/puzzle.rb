class Puzzle < ActiveRecord::Base
  has_one :grid
  attr_accessible :difficulty, :grid_id, :points, :grid_id, :times_solved
  before_save :default_values

  def default_values
    self.times_solved ||= '0'
  end

  def self.average_time_for_size(size_of_puzzle)
  	numerator   = Grid.joins(:puzzle).where(width:size_of_puzzle).sum("average_time").to_i
  	denominator = Grid.joins(:puzzle).where(width:size_of_puzzle).where("times_solved > 0").count
  	numerator/denominator
  end


end
