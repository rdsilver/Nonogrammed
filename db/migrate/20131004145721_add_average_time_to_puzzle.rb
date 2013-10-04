class AddAverageTimeToPuzzle < ActiveRecord::Migration
  def change
    add_column :puzzles, :average_time, :integer
  end
end
