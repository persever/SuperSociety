SuperSocietyApp.Routers.Router = Backbone.Router.extend({

  routes: {
    "": "root",
    "groups/new": "newGroup",
    "groups/:id": "groupShow",
    "groups": "groupsIndex",
    "events/new": "newEvent",
    "events/:id": "eventShow",
    "events": "eventsIndex"
  },

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.groups = options.groups;
    this.events = options.events;
  },

  // home/search, composite view
  root: function () {},

  // modal subview
  newGroup: function () {},

  // composite view
  groupShow: function () {},

  // subview
  groupsIndex: function () {
    var groups = this.groups.fetch();
    new SuperSocietyApp.Views.GroupsIndex({ collection: groups });
  },

  // modal subview
  newEvent: function () {},

  // subview
  eventShow: function () {},

  // subview
  eventsIndex: function () {
    var events = this.events.fetch();
    console.log(SuperSocietyApp.Views);
    new SuperSocietyApp.Views.EventsIndex({ collection: events });
  },

  _swapView: function (view) {
    if (this._currentView) {
      this._currentView.remove();
    }
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }

});
