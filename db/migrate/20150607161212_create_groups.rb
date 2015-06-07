class CreateGroups < ActiveRecord::Migration
  def change
    create_table :groups do |t|
      t.integer :creator_id,  null: false
      t.string :name,         null: false, unique: true
      t.string :description,  null: false

      t.timestamps null: false
    end

    add_index :groups, :name
  end
end
