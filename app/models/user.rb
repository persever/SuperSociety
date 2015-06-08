class User < ActiveRecord::Base
  validates :password_digest, presence: true
  validates :username, :session_token, presence: true, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }

  attr_reader :password

  has_many :managed_groups, class_name: "Group", foreign_key: :creator_id
  has_many :subscriptions
  has_many :subscribed_groups, through: :subscriptions, source: :group
  has_many :attendings
  has_many :joined_events, through: :attendings, source: :event

  after_initialize :ensure_session_token

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil unless user && user.valid_password?(password)
    user
  end

  def managed_group_ids
    ids = []
    self.managed_groups.each { |group| ids << group.id }
    ids
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def valid_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end

  private
    def ensure_session_token
      self.session_token || self.session_token = SecureRandom.urlsafe_base64(16)
    end
end
