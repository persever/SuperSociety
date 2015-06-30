SuperSocietyApp.Routers.Router = Backbone.Router.extend({

  routes: {
    "": "root",
    "groups/:id": "groupShow",
    "events/:id": "eventShow",
  },

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.groups = options.groups;
    this.ssevents = options.events;
    this.user = options.user;
  },

  root: function (showUserEvents) {
    var showUserEvents = showUserEvents ? showUserEvents : false;
    SuperSocietyApp.currentUserEvents.fetch({
      data: { attender: { id: SuperSocietyApp.currentUser.id } }
    });
    this.groups.fetch();
    var home = new SuperSocietyApp.Views.Home({
      groups: this.groups,
      ssevents: this.ssevents,
      user: this.user,
      showUserEvents: showUserEvents
    });
    this.$rootEl.html(home.render().$el);
  },

  rootUserEvents: function () {
    this.root(true);
  },

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

  groupsIndex: function () {
    var groups = this.groups;
    groups.fetch();
    var groupsIdx = new SuperSocietyApp.Views.GroupsIndex({ collection: groups });
    this.$rootEl.html(groupsIdx.render().$el);
  },

  eventShow: function (id) {

    var successF = function () {
      var groupId = ssevent.escape("group_id");
      this.groupShow(groupId, id);
    }.bind(this);

    var ssevent = this.ssevents.get(id);
    var events = this;
    if (ssevent) {
      ssevent.fetch({
        success: successF
      });
    } else {
      ssevent = new SuperSocietyApp.Models.Event({ id: id });
      ssevent.fetch({
        success: function () {
          this.ssevents.add(ssevent);
          successF();
        }.bind(this)
      });
    }
  },

  eventsIndex: function () {
    var events = this.ssevents;
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
