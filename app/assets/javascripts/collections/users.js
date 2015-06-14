SuperSocietyApp.Collections.Users = Backbone.Collection.extend({
  model: SuperSocietyApp.Models.User,

  url: "/api/users",

  initialize: function (options) {
    if (options) {
      this.subscribedGroup = options.subscribedGroup;
      this.joinedEvent = options.joinedEvent;
    }
  },

  comparator: function (user) {
    return user.get("username");
  },

  getOrFetch: function (id) {
    var user = this.get(id);
    var users = this;
    if (user) {
      user.fetch();
    } else {
      user = new SuperSocietyApp.Models.User({ id: id });
      user.fetch({
        success: function () {
          events.add(user);
        }
      });
    }

    return user;
  }
});
