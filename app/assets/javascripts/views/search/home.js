SuperSocietyApp.Views.Home = Backbone.View.extend({
  template: JST["search/home"],

  initialize: function () {
    // init should be cU's events
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

  renderEventsIndexSubview: function () {},

  renderGroupsIndexSubview: function () {},

  _swapSubview: function (view) {
    if (this._currentSubview) {
      this._currentSubview.remove();
    }
    this._currentSubview = view;

    this.addSubview(".results", view);
  }
});
