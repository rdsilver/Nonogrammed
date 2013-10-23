class AddApprovedToPuzzles < ActiveRecord::Migration
  def change
    add_column :puzzles, :approved, :boolean
  end
end
