class Puzzle < ActiveRecord::Base
  has_one :grid, dependent: :destroy
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

  def get_string_for_row
    string_for_row = Hash.new("")
    puzzle_solution = self.grid.solution.split('').each_slice(self.grid.width).map(&:join)
    puzzle_solution.each_with_index { |string , index|
     ones_array = string.split("0")
     ones_array.each do |x|
       if(x.length>0)
       string_for_row[index] += x.length.to_s + " "
       end
     end
    }

    return string_for_row
  end

  def get_string_for_column 
    string_for_column = Hash.new("")
    puzzle_solution = Array.new 
    self.grid.solution.split('').each_slice(self.grid.width).map(&:join).each { |x|
      puzzle_solution << x.to_s.scan(/.{1,1}/).join(',').split(',')
    }
    puzzle_solution = puzzle_solution.transpose
    puzzle_solution = puzzle_solution.flatten
    puzzle_solution = puzzle_solution.join('')
    puzzle_solution = puzzle_solution.split('').each_slice(self.grid.height).map(&:join)
    puzzle_solution.each_with_index { |string , index|
     ones_array = string.split("0")
     ones_array.each do |x|
       if(x.length>0)
       string_for_column[index] += x.length.to_s + " "
       end
     end
    }

    return string_for_column
  end

  def self.approve_list
    Puzzle.where(approved: false).select{|p| p.is_logically_solvable}.each do |p|
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

  def is_logically_solvable
     string_for_column = self.get_string_for_column
     string_for_row = self.get_string_for_row

     return true
  end



end
