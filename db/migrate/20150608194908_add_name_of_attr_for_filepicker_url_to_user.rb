class AddNameOfAttrForFilepickerUrlToUser < ActiveRecord::Migration
  def change
    add_column :users, :filepicker_url, :string
    add_column :groups, :filepicker_url, :string
  end
end
