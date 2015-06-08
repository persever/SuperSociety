SuperSocietyApp.Routers.Router = Backbone.Router.extend({

  routes: {
    "": "index",
    "groups/new": "newGroup",
    "groups/:id": "groupShow",
    "groups": "groupsIndex",
    "events/new": "newEvent",
    "events/:id": "eventShow",
    "events": "eventsIndex"
  },

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  index: function () {},

  newGroup: function () {},

  groupShow: function () {},

  groupsIndex: function () {},

  newEvent: function () {},

  eventShow: function () {},

  eventsIndex: function () {},

  _swapView: function (view) {}

});
