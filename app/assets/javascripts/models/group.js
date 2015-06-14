SuperSocietyApp.Models.Group = Backbone.Model.extend({
  urlRoot: "/api/groups",

  ssevents: function () {
    if (!this._ssevents) {
      this._ssevents = new SuperSocietyApp.Collections.Events([], { group: this });
    }

    return this._ssevents;
  },

  currentUserSubscription: function () {
    if (!this._currentUserSubscription) {
      this._currentUserSubscription = new SuperSocietyApp.Models.Subscription({ group_id: this.id });
    }

    return this._currentUserSubscription;
  },

  // subscribers: function () {
  //   if (!this._subscribers) {
  //     this._subscribers = new SuperSocietyApp.Collections.Users([], { subscribed_group: this });
  //   }
  //
  //   return this._subscribers;
  // },
  
  parse: function (response) {
    if (response.events) {
      this.ssevents().set(response.events, { parse: true });
      delete response.events;
    }
    if (response.subscription) {
      this.currentUserSubscription().set(response.subscription, { parse: true });
      delete response.subscription;
    }
   return response;
  }
});
