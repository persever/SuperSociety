SuperSocietyApp.Models.Group = Backbone.Model.extend({
  urlRoot: "/api/groups",

  events: function () {
    if (!this._events) {
      SuperSocietyApp.events.fetch({
        success: function () {
          this._events = SuperSocietyApp.Events.where({ group_id: this.id });
        }.bind(this)
      })
    }

    return this._events;
  }
});
