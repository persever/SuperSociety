class ChangeDateAndTimeToDatetime < ActiveRecord::Migration
  def change
    remove_column :events, :date
    remove_column :events, :time
    add_column :events, :datetime, :string
  end
end
