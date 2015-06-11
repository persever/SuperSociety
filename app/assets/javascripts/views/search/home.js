SuperSocietyApp.Views.Home = Backbone.CompositeView.extend({
  template: JST["search/home"],

  initialize: function (options) {
    console.log(options.groups);
    console.log(options.ssevents);
    this.groups = options.groups;
    this.events = options.ssevents;

    //wrap in conditional... wait you might not need this...
    // this.listenTo(this.groups, "sync", this.render);
    // this.listenTo(this.events, "sync", this.render);

    // first render should show cU's events -- see how you did that for group show...
    // // pass in router or cull here? will need all, but starting with subcollection...
    // push of events/groups button with no search input should show user's events/groups
    // this.listenTo( // search input... see past projs where you've done that)
  },

  events: {},

  render: function () {
    this.$el.html(this.template());
    this.addSearchSubview();

    return this;
  },

  addSearchSubview: function () {
    var searchbar = new SuperSocietyApp.Views.Searchbar();
    this.$("#searchbar").html(searchbar.render().$el);
  },

  renderEventsIndexSubview: function () {
    // var eventsIdxView = new SuperSocietyApp.Views.EventsIndex({
    //   collection: this.events
    //   });
    // this._swapSubview(eventsIdxView);
  },

  renderGroupsIndexSubview: function () {
    // var groupsIdxView = new SuperSocietyApp.Views.GroupsIndex({
    //   collection: this.groups
    //   });
    // this._swapSubview(groupsIdxView);
  },

  _swapSubview: function (view) {
    if (this._currentSubview) {
      this._currentSubview.remove();
    }
    this._currentSubview = view;

    this.addSubview(".results", view);
  }
});
