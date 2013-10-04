class ChangeIntegerToFloatForAveregateTimeInPuzzle < ActiveRecord::Migration
  def up
  	change_column :puzzles, :average_time, :float
  end

  def down
  	change_column :puzzles, :average_time, :integer
  end
end
