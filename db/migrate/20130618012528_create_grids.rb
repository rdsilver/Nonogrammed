class CreateGrids < ActiveRecord::Migration
  def change
    create_table :grids do |t|
      t.integer :height
      t.integer :width
      t.string :solution

      t.timestamps
    end
  end
end
