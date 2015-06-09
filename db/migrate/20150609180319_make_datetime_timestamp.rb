class MakeDatetimeTimestamp < ActiveRecord::Migration
  def change
    remove_column :events, :datetime
    add_column :events, :datetime, :timestamp
  end
end
