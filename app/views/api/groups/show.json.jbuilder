json.extract!(@group, :id, :name, :description)

json.events do
  json.array! @group.events, partial: "api/shared/events", as: :event
end

subscription = Subscription.find_by({ user_id: current_user.id, group_id: @group.id })

if subscription
  json.subscription do
    json.extract! subscription, :id
  end
end
