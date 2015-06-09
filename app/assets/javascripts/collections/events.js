SuperSocietyApp.Collections.Events = Backbone.Collection.extend({
  model: SuperSocietyApp.Models.Event,

  url: "/api/events",

  // initialize: function (options) {
  //   if (options) {
  //     this.groupId = options.groupId;
  //   }
  // },

  comparator: function (event) {
    return event.get("date");
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
