class Puzzle < ActiveRecord::Base
  has_one :grid
  attr_accessible :difficulty, :grid_id, :points, :grid_id, :times_solved, :approved, :name
  before_save :default_values
  
  def default_values
    self.times_solved ||= '0'
  end

  def self.average_time_for_size(size_of_puzzle)
  	numerator   = Grid.joins(:puzzle).where(width:size_of_puzzle).sum("average_time").to_i
  	denominator = Grid.joins(:puzzle).where(width:size_of_puzzle).where("times_solved > 0").count
  	numerator/denominator
  end

  def set_approved
    self.update_attributes(approved: true)
  end

  def quick_display
    solution = self.grid.solution.gsub('0',' ').gsub('1','O').chars.each_slice(self.grid.width).map(&:join)

    solution.each do |p|
      puts p
    end
  end

  def self.approve_list
    Puzzle.where(approved: false).each do |p|
      puts p.name
      p.quick_display
      yes = gets
      if(yes.length > 1)
        p.update_attributes(approved: true)
      else
        p.grid.delete
        p.delete
      end

    end
  end



end
