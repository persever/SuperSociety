SuperSocietyApp.Models.Event = Backbone.Model.extend({
  urlRoot: "/api/events",

  currentUserAttending: function () {
    if (!this._currentUserAttending) {
      this._currentUserAttending = new SuperSocietyApp.Models.Attending({ event_id: this.id });
    }

    return this._currentUserAttending;
  },

  parse: function (response) {
    if (response.attending) {
      this.currentUserAttending().set(response.attending, { parse: true });
      delete response.attending;
    }
   return response;
  }
});
