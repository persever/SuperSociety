SuperSocietyApp.Views.Home = Backbone.CompositeView.extend({
  template: JST["search/home"],

  initialize: function (options) {
    this.ssevents = options.ssevents;
    this.groups = options.groups;
    this.searchType = "event-search";
    this.user = options.user;
    this.userEvents = new SuperSocietyApp.Collections.Events();
    this.userEvents.fetch({ data: { attender: this.user.toJSON() } });
    this.userGroups = new SuperSocietyApp.Collections.Groups();
    this.userGroups.fetch({ data: { subscriber: this.user.toJSON() } });
    //refactor
    this.listenTo(this.ssevents, "sync", this.render);
    this.listenTo(this.groups, "sync", this.render);
    this.listenTo(this.userEvents, "sync", this.render);
    this.listenTo(this.userGroups, "sync", this.render);

  },

  events: {
    "click .search-button": "setSearchType",
    "click .results .group-index-item": "redirectToGroup",
    "click .results .event-index-item .clickable": "redirectToEvent",
    "submit #searchbar": "search",
    "input input.search-query": "search",
    "click .counter.groups": "retrieveUserGroups",
    "click .counter.events": "retrieveUserEvents"
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

  redirectToGroup: function (event) {
    var id = $(event.currentTarget).data("id");
    Backbone.history.navigate("groups/" + id, { trigger: true});
  },

  redirectToEvent: function (event) {
    var id = $(event.currentTarget.parentElement).data("id");
    var ssevent = this.ssevents.get(id);
    var groupId = ssevent.get("group").id;
    Backbone.history.navigate("groups/" + groupId);
    SuperSocietyApp.router.groupShow(groupId, id);
  },

  render: function () {
    // this.delegateEvents();

    numGroups = this.userGroups.length;
    numEvents = this.userEvents.length;
    this.$el.html(this.template({ numGroups: numGroups, numEvents: numEvents }));
    this.addSearchSubview();

    if (this.view === undefined || this.view.constructor === SuperSocietyApp.Views.EventsIndex) {
      this.renderEventsIndexSubview(this.ssevents);
    } else {
      this.renderGroupsIndexSubview(this.groups);
    }

    return this;
  },

  renderEventsIndexSubview: function (collection) {
    this.$(".active").removeClass("active");
    this.$("[data-id=\"event-search\"]").addClass("active");
    var eventsIdxView = new SuperSocietyApp.Views.EventsIndex({
      collection: collection
      });
    this._swapSubview(eventsIdxView);
  },

  renderGroupsIndexSubview: function (collection) {
    this.$(".active").removeClass("active");
    this.$("[data-id=\"group-search\"]").addClass("active");
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

  retrieveUserEvents: function () {
    this.renderEventsIndexSubview(this.userEvents);
  },

  retrieveUserGroups: function () {
    this.renderGroupsIndexSubview(this.userGroups);
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
