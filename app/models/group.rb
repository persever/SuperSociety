class Group < ActiveRecord::Base
  validates :creator_id, :name, :description, presence: true

  belongs_to :creator, class_name: "User"
  has_many :events
  has_many :subscriptions
  has_many :subscribers, through: :subscriptions, source: :user
end
