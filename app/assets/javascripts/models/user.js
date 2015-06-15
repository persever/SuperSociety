SuperSocietyApp.Models.User = Backbone.Model.extend({
  urlRoot: "/api/users",

  // subscribedGroups: function () {
  //   if (!this._subscribedGroups) {
  //     this._subscriptions = new SuperSocietyApp.Collections.Subscriptions([], { user_id: this.id });
  //
  //     this._subscribedGroups = new SuperSocietyApp.Collections.Groups([], { subscribed_group: this });
  //   }
  //
  //   return this._subscribedGroups;
  // },
  //
  // parse: function (response) {
  //   if (response.joined_events) {
  //     this.joinedEvents().set(response.joined_events, { parse: true });
  //     delete response.joined_events;
  //   }
  //   if (response.subscribed_groups) {
  //     this.subscribedGroups().set(response.subscribed_groups, { parse: true });
  //     delete response.subscribed_groups;
  //   }
  //  return response;
  // }
});
