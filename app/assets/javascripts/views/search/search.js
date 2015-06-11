SuperSocietyApp.Views.Search = Backbone.View.extend({
  tagName: "form",
  className: "form-inline",

  template: JST["search/search"],

  initialize: function () {},

  events: {},

  render: function () {
    this.$el.html(this.template());

    return this;
  },

  addEventsIndexSubview: function () {},

  addGroupsIndexSubview: function () {},

  _swapSubview: function (view) {
    if (this._currentSubview) {
      this._currentSubview.remove();
    }
    this._currentSubview = view;

    this.addSubview(".results", view);
  }
});
