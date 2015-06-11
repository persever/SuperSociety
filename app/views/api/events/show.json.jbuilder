json.extract!(@event, :id, :group, :title, :datetime, :location, :description)

attending = Attending.find_by({ user_id: current_user.id })

if attending
  json.attending do
    json.extract! attending, :id
  end
end
