SuperSocietyApp.Views.Home = Backbone.CompositeView.extend({
  template: JST["search/home"],

  initialize: function (options) {
    this.ssevents = options.ssevents;
    // this.events.fetch();
    this.groups = options.groups;
    // this.groups.fetch();
    this.view = "Events";

    //wrap in conditional... wait you might not need this...
    this.listenTo(this.groups, "sync", this.render);
    this.listenTo(this.ssevents, "sync", this.render);

    // first render should show cU's events -- see how you did that for group show...
    // // pass in router or cull here? will need all, but starting with subcollection...
    // push of events/groups button with no search input should show user's events/groups
    // this.listenTo( // search input... see past projs where you've done that)
  },

  events: {
    "click .results li": "redirectToEvent",
  },

  render: function () {
    this.$el.html(this.template());
    this.addSearchSubview();

    if (this.view === "Events") {
      this.renderEventsIndexSubview();
    }

    return this;
  },

  addSearchSubview: function () {
    var searchbar = new SuperSocietyApp.Views.Searchbar();
    this.$("#searchbar").html(searchbar.render().$el);
  },

  redirectToEvent: function (event) {
    var eventId = $(event.currentTarget).data("id");
    var ssevent = this.ssevents.get(eventId);
    var groupId = ssevent.get("group_id");
    SuperSocietyApp.router.groupShow(groupId, eventId);
  },

  renderEventsIndexSubview: function () {
    var collection = this.ssevents;

    var eventsIdxView = new SuperSocietyApp.Views.EventsIndex({
      collection: collection
      });
    this._swapSubview(eventsIdxView);
  },

  renderGroupsIndexSubview: function () {
    var collection = this.groups;

    var groupsIdxView = new SuperSocietyApp.Views.GroupsIndex({
      collection: collection
      });
    this._swapSubview(groupsIdxView);
  },

  _swapSubview: function (view) {
    if (this._currentSubview) {
      this._currentSubview.remove();
    }
    this._currentSubview = view;

    this.addSubview(".results", view);
  }
});
