SuperSocietyApp.Views.Home = Backbone.CompositeView.extend({
  template: JST["search/home"],

  initialize: function (options) {
    this.ssevents = options.ssevents;
    this.groups = options.groups;
    this.searchType = "event-search";
    this.user = options.user;
    this.userSubscribedGroups = new SuperSocietyApp.Collections.Groups();
    this.userSubscribedGroups.fetch({ data: { subscriber: this.user.toJSON() } });
    this.userManagedGroups = this.user.managedGroups();

    this.listenTo(this.user, "sync", this.render);
    this.listenTo(this.ssevents, "sync", this.search);
    this.listenTo(this.userManagedGroups, "sync", this.updateUserMangedGroups);
    this.listenTo(this.userSubscribedGroups, "sync", this.updateUserGroups);
    this.listenTo(SuperSocietyApp.currentUserEvents, "sync add remove", this.updateUserEvents);
  },

  events: {
    "click .search-button": "setSearchType",
    "click .results .group-index-item": "redirectToGroup",
    "click .results .event-index-item .clickable": "redirectToEvent",
    "submit #searchbar": "search",
    "input input.search-query": "search",
    "click .counter.managed-groups": "retrieveUserManagedGroups",
    "click .counter.groups": "retrieveUserGroups",
    "click .counter.events": "retrieveUserEvents",
    "click .attending-button button": "updateUserEvents"
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
    var userEvents = [];
    SuperSocietyApp.currentUserEvents.forEach(function(ssevent) {
      var now = new Date().getTime();
      var time = new Date(now);
      var datetime = new Date(ssevent.get("datetime"));
      if (datetime > time) {
        userEvents.push(ssevent);
      }
    });

    var numManagedGroups = this.userManagedGroups.length;
    var numGroups = this.userSubscribedGroups.length;
    var numEvents = SuperSocietyApp.currentUserEvents.length;

    this.$el.html(this.template({
      numManagedGroups: numManagedGroups,
      numGroups: numGroups,
      numEvents: numEvents
    }));
    this.addSearchSubview();

    this.search();

    // if (this.view === undefined || this.view.constructor === SuperSocietyApp.Views.EventsIndex) {
    //   this.renderEventsIndexSubview(this.ssevents);
    // } else {
    //   this.renderGroupsIndexSubview(this.groups);
    // }

    return this;
  },

  renderEventsIndexSubview: function (collection) {
    console.log(collection);
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

  retrieveUserEvents: function () {
    this.renderEventsIndexSubview(SuperSocietyApp.currentUserEvents);
  },

  retrieveUserGroups: function () {
    this.renderGroupsIndexSubview(this.userSubscribedGroups);
  },

  retrieveUserManagedGroups: function () {
    this.renderGroupsIndexSubview(this.userManagedGroups);
  },

  search: function (event) {
    // console.log(event);
    // if (event && event.type !== "input") {
    //   event.preventDefault();
    // }

    var query = $(".search-query").val();

    if (this.searchType === "event-search") {
      if (query === "" || !query) {
        console.log(this.ssevents);
        this.renderEventsIndexSubview(this.ssevents);
      } else {
        var events = this.filter(this.ssevents, query);
        this.renderEventsIndexSubview(events);
      }
    } else if (this.searchType === "group-search") {
      if (query === "" || !query) {
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

  updateUserEvents: function (event) {
    this.$(".counter.events .counter-button").text(SuperSocietyApp.currentUserEvents.models.length);
  },

  updateUserGroups: function (event) {
    this.$(".counter.groups .counter-button").text(this.userSubscribedGroups.length);
  },

  updateUserManagedGroups: function (event) {
    this.$(".counter.manged-groups .counter-button").text(this.userManagedGroups.length);
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
