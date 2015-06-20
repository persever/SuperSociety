json.array!(@groups) do |group|

  json.extract!(group, :id, :name, :photo_url, :creator_id)

  subscription = Subscription.find_by({ user_id: current_user.id, group_id: group.id })

  if subscription
    json.subscription do
      json.extract! subscription, :id
    end
  end

end
