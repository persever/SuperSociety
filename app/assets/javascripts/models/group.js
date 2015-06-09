SuperSocietyApp.Models.Group = Backbone.Model.extend({
  urlRoot: "/api/groups",

  ssevents: function () {
    if (!this._ssevents) {
      this._ssevents = new SuperSocietyApp.Collections.Events([], { group: this });
    }

    return this._ssevents;
  },

  parse: function (response) {
    if (response.events) {
      this.ssevents().set(response.events, { parse: true });
      delete response.events;
    }
   return response;
  }
});
