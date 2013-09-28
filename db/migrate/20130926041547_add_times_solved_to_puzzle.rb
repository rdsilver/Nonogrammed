class AddTimesSolvedToPuzzle < ActiveRecord::Migration
  def change
    add_column :puzzles, :times_solved, :integer
  end
end
