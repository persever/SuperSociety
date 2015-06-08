SuperSocietyApp.Views.EventsIndexItem = Backbone.View.extend({
  tagName: "li",

  template: JST["events/index_item"],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    this.$el.html(this.template({ event: this.model }));
    return this;
  }
});
