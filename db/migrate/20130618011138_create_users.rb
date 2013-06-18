class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name
      t.integer :points
      t.boolean :tutorial_completed

      t.timestamps
    end
  end
end
