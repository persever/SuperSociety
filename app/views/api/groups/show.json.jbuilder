json.extract!(@group, :id, :name, :description, :creator_id, :photo_url)

json.events do
  json.array! @group.events, partial: "api/shared/events", as: :event
end

subscription = Subscription.find_by({ user_id: current_user.id, group_id: @group.id })

if subscription
  json.subscription do
    json.extract! subscription, :id
  end
end

json.subscribers do
  json.array!(@group.subscribers, :id, :photo_url)
end
