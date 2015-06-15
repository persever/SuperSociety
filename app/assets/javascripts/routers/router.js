SuperSocietyApp.Routers.Router = Backbone.Router.extend({

  routes: {
    "": "root",
    "groups": "groupsIndex",
    "groups/:id": "groupShow",
    "events": "eventsIndex",
    "events/:id": "eventShow",
  },

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.groups = options.groups;
    this.events = options.events;
    this.user = options.user;
  },

  // home/search, composite view
  root: function () {
    var home = new SuperSocietyApp.Views.Home({
      groups: this.groups,
      ssevents: this.events,
      user: this.user
    });
    this.$rootEl.html(home.render().$el);
  },

  // composite view
  groupShow: function (id, eventId) {
    var group = this.groups.getOrFetch(id);
    var groupShow = null;
    if (eventId) {
      groupShow = new SuperSocietyApp.Views.GroupShow({ model: group, subEventId: eventId });
    } else {
      groupShow = new SuperSocietyApp.Views.GroupShow({ model: group, subEventId: 0 });
    }
    this.$rootEl.html(groupShow.render().$el);
  },

  // subview
  groupsIndex: function () {
    var groups = this.groups;
    groups.fetch();
    var groupsIdx = new SuperSocietyApp.Views.GroupsIndex({ collection: groups });
    this.$rootEl.html(groupsIdx.render().$el);
  },

  // subview
  eventShow: function (id) {

    var successF = function () {
      var groupId = ssevent.escape("group_id");
      this.groupShow(groupId, id);
      // var eventShow = new SuperSocietyApp.Views.EventShow({ model: ssevent, groupId: groupId });
      // this.$rootEl.html(eventShow.render().$el);
    }.bind(this);

    var ssevent = this.events.get(id);
    var events = this;
    if (ssevent) {
      ssevent.fetch({
        success: successF
      });
    } else {
      ssevent = new SuperSocietyApp.Models.Event({ id: id });
      ssevent.fetch({
        success: function () {
          this.events.add(ssevent);
          successF();
        }.bind(this)
      });
    }
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
