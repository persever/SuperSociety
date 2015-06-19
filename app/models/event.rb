class Event < ActiveRecord::Base
  validates :group_id, :title, :datetime, :location, :description, presence: true
  validates :title, length: { maximum: 30 }

  belongs_to :group
  has_many :attendings
  has_many :attenders, through: :attendings, source: :user
end
