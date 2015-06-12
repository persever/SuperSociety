json.array!(@groups) do |group|

  json.extract!(group, :id, :name, :photo_url)

  # why is the wrap necessary??
  if current_user
    subscription = Subscription.find_by({ user_id: current_user.id, group_id: group.id })

    if subscription
      json.subscription do
        json.extract! subscription, :id
      end
    end
  end

end
