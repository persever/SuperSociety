json.array!(@users) do |user|

  json.extract!(user, :id, :username, :photo_url)

  json.subscribed_groups do
    json.extract!(user, :subscribed_groups)
  end

  json.joined_events do
    json.extract!(user, :joined_events)
  end

end
