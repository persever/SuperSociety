json.extract!(@group, :name, :description, :events)

subscription = Subscription.find_by({ user_id: current_user.id })

if subscription
  json.subscription do
    json.extract! subscription, :id
  end
end
