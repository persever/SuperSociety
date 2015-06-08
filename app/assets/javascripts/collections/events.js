SuperSocietyApp.Collections.Events = Backbone.Collection.extend({
  model: SuperSocietyApp.Models.Event,
  url: "/api/events",

  initialize: function (options) {
    this.group = options.group;
  },

  comparator: function (ssevent) {
    return ssevent.get("date");
  }
});
