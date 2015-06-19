SuperSocietyApp.Models.Event = Backbone.Model.extend({
  urlRoot: "/api/events",

  currentUserAttending: function () {
    if (!this._currentUserAttending) {
      this._currentUserAttending = new SuperSocietyApp.Models.Attending({ event_id: this.id });
    }

    return this._currentUserAttending;
  },

  // attenders: function () {
  //   if (!this._attenders) {
  //     this._attenders = new SuperSocietyApp.Collections.Users([], { joined_event: this });
  //   }
  //
  //   return this._attenders;
  // },

  parse: function (response) {
    if (response.attending) {
      this.currentUserAttending().set(response.attending, { parse: true });
      delete response.attending;
    } else {
      this._currentUserAttending = undefined; // to ensure deleted attendings stay deleted
    }
   return response;
  }
});
