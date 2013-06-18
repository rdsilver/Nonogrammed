class CreatePuzzles < ActiveRecord::Migration
  def change
    create_table :puzzles do |t|
      t.integer :difficulty
      t.integer :grid_id
      t.integer :points

      t.timestamps
    end
  end
end
