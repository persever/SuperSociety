json.partial! "api/shared/events", event: @event

json.attenders do
  json.array!(@event.attenders, :id, :photo_url)
end
