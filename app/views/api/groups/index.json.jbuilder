json.array!(@groups) do |group|

  json.extract!(group, :id, :name, :description)

  # why is the wrap necessary??
  if current_user
    attending = Attending.find_by({ user_id: current_user.id })

    if attending
      json.attending do
        json.extract! attending, :id
      end
    end
  end

end
