SuperSocietyApp.Models.Group = Backbone.Model.extend({
  urlRoot: "/api/groups",

  events: function () {
    if (!this._events) {
      console.log("here");
      this._events = new SuperSocietyApp.Collections.Events([], { group: this });
    }

    return this._events;
  },

  parse: function (response) {
    if (response.events) {
      this.events().set(response.lists, { parse: true });
      delete response.events;
    }
   return response;
  }
});
