class ChangeStringToTextInGrid < ActiveRecord::Migration
  def change
    change_column :grids, :solution, :text
  end
end
