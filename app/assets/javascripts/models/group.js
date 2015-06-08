SuperSocietyApp.Models.Group = Backbone.Model.extend({
  urlRoot: "/api/groups",

  events: function () {
    if (!this._events) {
      this._events = new SuperSocietyApp.Collections.Events({ group: this });
    }

    return this._events;
  }
});
