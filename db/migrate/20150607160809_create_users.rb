class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users, force: true do |t|
      t.string :username,         null: false, unique: true
      t.string :password_digest,  null: false
      t.string :session_token,    null: false, unique: true

      t.timestamps null: false
    end

    add_index :users, :username
  end
end
