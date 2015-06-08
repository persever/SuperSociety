SuperSocietyApp.Collections.Events = Backbone.Collection.extend({
  model: SuperSocietyApp.Models.Event,
  url: "/api/events",

  comparator: function (ssevent) {
    return ssevent.get("date");
  }
});
