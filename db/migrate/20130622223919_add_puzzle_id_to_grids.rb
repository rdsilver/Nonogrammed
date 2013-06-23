class AddPuzzleIdToGrids < ActiveRecord::Migration
  def change
    add_column :grids, :puzzle_id, :integer
  end
end
