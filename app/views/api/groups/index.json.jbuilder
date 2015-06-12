json.array!(@groups) do |group|

  json.extract!(group, :id, :name, :description)

  # why is the wrap necessary??
  if current_user
    attending = Subscription.find_by({ user_id: current_user.id, group_id: group.id })

    if attending
      json.attending do
        json.extract! attending, :id
      end
    end
  end

end
