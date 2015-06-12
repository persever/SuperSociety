SuperSocietyApp.Views.Home = Backbone.CompositeView.extend({
  template: JST["search/home"],

  initialize: function (options) {
    this.ssevents = options.ssevents;
    // this.events.fetch();
    this.groups = options.groups;
    // this.groups.fetch();
    this.searchType = "event-search";

    //wrap in conditional... wait you might not need this...
    this.listenTo(this.groups, "sync", this.render);
    this.listenTo(this.ssevents, "sync", this.render);
    // this.$("#searchbar.search-query").on("input", this.search);

    // first render should show cU's events -- see how you did that for group show...
    // // pass in router or cull here? will need all, but starting with subcollection...
    // push of events/groups button with no search input should show user's events/groups
    // this.listenTo( // search input... see past projs where you've done that)
  },

  events: {
    "click .search-button": "setSearchType",
    "click .results li": "redirectToEvent",
    "submit #searchbar": "search"
  },

  render: function () {
    this.delegateEvents();
    this.$el.html(this.template());
    this.addSearchSubview();

    if (this.view === undefined || this.view.constructor === SuperSocietyApp.Views.EventsIndex) {
      this.renderEventsIndexSubview(this.ssevents);
    } else {
      this.renderGroupsIndexSubview(this.groups);
    }

    return this;
  },

  setSearchType: function () {
    this.searchType = $(event.currentTarget).data("id");
  },

  search: function (event) {
    event.preventDefault();

    var query = $(".search-query").val();

    if (this.searchType === "event-search"){
      var events = this.filter(this.ssevents, query);
      this.renderEventsIndexSubview(events);
    } else {
      this.filter(this.groups, query);
      this.renderGroupsIndexSubview(groups);
    }
  },

  filter: function (collection, query) {
    var results = collection.clone();

    if (collection === this.ssevents) {
      collection.each(function(model) {
        if (!(model.get("title") === query || model.get("location") === query)) {
          results.remove(model);
        }
      });
    } else {
      collection.each(function(model) {
        if (model.get("name") !== query) {
          results.remove(model);
        }
      });
    }

    return results;
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

  renderEventsIndexSubview: function (collection) {
    var eventsIdxView = new SuperSocietyApp.Views.EventsIndex({
      collection: collection
      });
    this._swapSubview(eventsIdxView);
  },

  renderGroupsIndexSubview: function (collection) {
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

    this.view = view;
    this.addSubview(".results", view);
  }
});
