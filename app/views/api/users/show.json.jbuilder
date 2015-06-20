json.extract!(@user, :id, :username, :photo_url)

json.joined_events do
  json.extract!(@user, :joined_events)
end

json.subscribed_groups do
  json.extract!(@user, :subscribed_groups)
end

json.managed_groups do
  json.extract!(@user, :managed_groups)
end
