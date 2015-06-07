class CreateSubscriptionsAndAttendings < ActiveRecord::Migration
  def change
    create_table :subscriptions do |t|
      t.integer :user_id,  null: false
      t.integer :group_id,  null: false
    end
    create_table :attendings do |t|
      t.integer :user_id,  null: false
      t.integer :event_id,  null: false
    end
  end
end
