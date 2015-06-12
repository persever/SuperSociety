SuperSocietyApp.Views.Home = Backbone.CompositeView.extend({
  template: JST["search/home"],

  initialize: function (options) {
    this.ssevents = options.ssevents;
    // this.events.fetch();
    this.groups = options.groups;
    // this.groups.fetch();
    this.searchType = "event-search";
    this.init = true;

    //wrap in conditional... wait you might not need this...
    this.listenTo(this.groups, "sync", this.render);
    this.listenTo(this.ssevents, "sync", this.render);
    // this.$("input.search-query").on("input", this.search);
    // this.$("input.search-query").on("keydown", this.search);

    // first render should show cU's events -- see how you did that for group show...
    // // pass in router or cull here? will need all, but starting with subcollection...
    // push of events/groups button with no search input should show user's events/groups
    // this.listenTo( // search input... see past projs where you've done that)
  },

  events: {
    "click .search-button": "setSearchType",
    "click .results li": "redirect",
    "submit #searchbar": "search",
    "input input.search-query": "search"
  },

  inputChanged: function(e){

  },

  render: function () {
    this.delegateEvents();

    this.$el.html(this.template());
    this.addSearchSubview();

    if (this.init) {
      this.renderEventsIndexSubview(this.ssevents); // just the cU's events!!
    } else if (this.view === undefined || this.view.constructor === SuperSocietyApp.Views.EventsIndex) {
      this.renderEventsIndexSubview(this.ssevents);
    } else {
      this.renderGroupsIndexSubview(this.groups);
    }

    return this;
  },

  setSearchType: function (event) {
    this.searchType = $(event.currentTarget).data("id");
    this.search();
  },

  search: function (event) {
    if (event && event.type !== "input") {
      event.preventDefault();
    }

    var query = $(".search-query").val();

    if (this.searchType === "event-search") {
      if (query === "") {
        this.renderEventsIndexSubview(this.ssevents);
      } else {
        var events = this.filter(this.ssevents, query);
        this.renderEventsIndexSubview(events);
      }
    } else if (this.searchType === "group-search") {
      if (query === "") {
        this.renderGroupsIndexSubview(this.groups);
      } else {
        var groups = this.filter(this.groups, query);
        this.renderGroupsIndexSubview(groups);
      }
    }
  },

  filter: function (collection, query) {
    var results = collection.clone();

    var filterHelper = function (string, query) {
      if (string.includes("The")) {
        string = string.slice(4);
      }
      if (string.slice(0, query.length).toLowerCase() === query.toLowerCase()) {
        return true;
      } else {
        return false;
      }
    };

    if (collection === this.ssevents) {
      collection.each(function(model) {
        var titleTruthiness = filterHelper(model.get("title"), query);
        var locationTruthiness = filterHelper(model.get("location"), query);
        if (!(titleTruthiness || locationTruthiness)) {
          results.remove(model);
        }
      });
    } else {
      collection.each(function(model) {
        var nameTruthiness = filterHelper(model.get("name"), query);
        if (!nameTruthiness) {
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

  redirect: function (event) {
    var id = $(event.currentTarget).data("id");
    if (this.searchType === "event-search") {
      var ssevent = this.ssevents.get(id);
      var groupId = ssevent.get("group").id;
      Backbone.history.navigate("groups/" + id);
      SuperSocietyApp.router.groupShow(groupId, id);
    } else {
      Backbone.history.navigate("groups/" + id, { trigger: true});
    }
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
