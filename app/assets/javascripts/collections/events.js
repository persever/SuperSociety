SuperSocietyApp.Collections.Events = Backbone.Collection.extend({
  model: SuperSocietyApp.Models.Event,

  url: "/api/events",

  initialize: function (models, options) {
    if (options) {
      this.group = options.group;
    }
  },

  comparator: function (event) {
    return event.get("datetime");
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
