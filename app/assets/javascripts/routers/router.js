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
  newGroup: function () {
    var group = new SuperSocietyApp.Models.Group();
    var groupForm = new SuperSocietyApp.Views.GroupForm({ model: group });
    this.$rootEl.html(groupForm.render().$el);
  },

  // composite view
  groupShow: function (id) {
    var group = this.groups.getOrFetch(id);
    var groupShow = new SuperSocietyApp.Views.GroupShow({ model: group });
    this.$rootEl.html(groupShow.render().$el);
  },

  // subview
  groupsIndex: function () {
    var groups = this.groups;
    groups.fetch();
    var groupsIdx = new SuperSocietyApp.Views.GroupsIndex({ collection: groups });
    this.$rootEl.html(groupsIdx.render().$el);
  },

  // modal subview
  newEvent: function () {
    var event = new SuperSocietyApp.Models.Event();
    var eventForm = new SuperSocietyApp.Views.EventForm({ model: event });
    this.$rootEl.html(eventForm.render().$el);
  },

  // subview
  eventShow: function (id) {
    var event = this.events.getOrFetch(id);
    var eventShow = new SuperSocietyApp.Views.EventShow({ model: event });
    this.$rootEl.html(eventShow.render().$el);
  },

  // subview
  eventsIndex: function () {
    var events = this.events;
    events.fetch();
    var eventsIdx = new SuperSocietyApp.Views.EventsIndex({ collection: events });
    this.$rootEl.html(eventsIdx.render().$el);
  },

  _swapView: function (view) {
    if (this._currentView) {
      this._currentView.remove();
    }
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }

});