class Subscription < ActiveRecord::Base
  validates :group_id, :user_id, presence: true

  belongs_to :user
  belongs_to :group
end
