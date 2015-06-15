SuperSocietyApp.Collections.Events = Backbone.Collection.extend({
  model: SuperSocietyApp.Models.Event,

  url: "/api/events",

  // is this necessary??
  initialize: function (models, options) {
    if (options) {
      this.group = options.group;
    }
  },

  comparator: function (ssevent) {
    return ssevent.get("datetime");
  },

  getOrFetch: function (id) {
    var event = this.get(id);
    var events = this;
    if (event) {
      event.fetch();
    } else {
      event = new SuperSocietyApp.Models.Event({ id: id });
      event.fetch({
        success: function () {
          events.add(event);
        }
      });
    }

    return event;
  }
});
