class AddNameToPuzzles < ActiveRecord::Migration
  def change
    add_column :puzzles, :name, :string
  end
end
