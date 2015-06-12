json.extract!(event, :id, :group, :title, :datetime, :location, :description)

# is the current_user wrap necessary??
if current_user
  attending = Attending.find_by({ user_id: current_user.id, event_id: event.id })

  if attending
    json.attending do
      json.extract! attending, :id
    end
  end
end
