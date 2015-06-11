SuperSocietyApp.Views.Searchbar = Backbone.View.extend({
  tagName: "form",
  className: "form-inline",

  template: JST["search/searchbar"],

  render: function () {
    this.$el.html(this.template());
    return this;
  }
});
