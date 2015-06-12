class ChangePhotoUrlCol < ActiveRecord::Migration
  def change
  remove_column :groups, :filepicker_url
  remove_column :users, :filepicker_url
  add_column :groups, :photo_url, :string
  add_column :users, :photo_url, :string
  end
end
