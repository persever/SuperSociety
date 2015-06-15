SuperSocietyApp.Views.Home = Backbone.CompositeView.extend({
  template: JST["search/home"],

  initialize: function (options) {
    this.ssevents = options.ssevents;
    this.groups = options.groups;
    this.searchType = "event-search";
    this.init = true;
    this.user = options.user;

    //wrap in conditional... wait you might not need this...
    this.listenTo(this.ssevents, "sync", this.render);
    this.listenTo(this.groups, "sync", this.render);
    this.listenTo(this.user, "sync", this.render);
    // this.$("input.search-query").on("input", this.search);
    // this.$("input.search-query").on("keydown", this.search);

    // first render should show cU's events -- see how you did that for group show...
  },

  events: {
    "click .search-button": "setSearchType",
    "click .results li": "redirect",
    "submit #searchbar": "search",
    "input input.search-query": "search",
    "click .counter.groups": "userGroups",
    "click .counter.events": "userEvents"
  },

  addSearchSubview: function () {
    var searchbar = new SuperSocietyApp.Views.Searchbar();
    this.$("#searchbar").html(searchbar.render().$el);
  },

  filter: function (collection, query) {
    var results = collection.clone();

    var filterHelper = function (string, query) {
      var words = string.split(" ");
      var i = 0;
      while (i < words.length) {
        if (words[i].slice(0, query.length).toLowerCase() === query.toLowerCase()) {
          return true;
        }
        i++;
      }
      return false;
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

  redirect: function (event) {
    var id = $(event.currentTarget).data("id");
    if (this.searchType === "event-search") {
      var ssevent = this.ssevents.get(id);
      var groupId = ssevent.get("group").id;
      Backbone.history.navigate("groups/" + groupId);
      SuperSocietyApp.router.groupShow(groupId, id);
    } else {
      Backbone.history.navigate("groups/" + id, { trigger: true});
    }
  },

  render: function () {
    this.delegateEvents();

    var numGroups = 0;
    var numEvents = 0;
    if (this.user.get("subscribed_groups") && this.user.get("joined_events")) {
      numGroups = this.user.get("subscribed_groups").subscribed_groups.length;
      numEvents = this.user.get("joined_events").joined_events.length;
    }
    this.$el.html(this.template({ numGroups: numGroups, numEvents: numEvents }));
    this.addSearchSubview();

    if (this.init) {
      this.$("[data-id=\"event-search\"]").addClass("active");
      if (this.user.get("joined_events")) {
        this.userEvents();
      } else {
        // render no events view?
        this.renderEventsIndexSubview(this.ssevents);
      }
    } else if (this.view === undefined || this.view.constructor === SuperSocietyApp.Views.EventsIndex) {
      this.renderEventsIndexSubview(this.ssevents);
    } else {
      this.renderGroupsIndexSubview(this.groups);
    }

    return this;
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

  setSearchType: function (event) {
    this.searchType = $(event.currentTarget).data("id");
    this.$(".active").removeClass("active");
    this.$("[data-id=\"" + this.searchType + "\"]").addClass("active");
    this.search();
  },

  userEvents: function () {
    var userEventsArr = this.user.get("joined_events").joined_events;
    var userEventsIds = [];
    userEventsArr.forEach(function(ssevent) {
      userEventsIds.push(ssevent.id);
    });
    var userEvents = this.ssevents.filter(function(ssevent) {
      if (userEventsIds.indexOf(ssevent.id) !== -1) {
        return ssevent;
      }
    });
    this.renderEventsIndexSubview(userEvents);
  },

  userGroups: function () {
    var userGroupsArr = this.user.get("subscribed_groups").subscribed_groups;
    var userGroupsIds = [];
    userGroupsArr.forEach(function(group) {
      userGroupsIds.push(group.id);
    });
    var userGroups = this.groups.filter(function(group) {
      if (userGroupsIds.indexOf(group.id) !== -1) {
        return group;
      }
    });
    this.renderGroupsIndexSubview(userGroups);
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
