class Event < ActiveRecord::Base
  validates :group_id, :title, :date, :time, :location, :description, presence: true

  belongs_to :group
  has_many :attendings
  has_many :attenders, through: :attendings, source: :user
end
