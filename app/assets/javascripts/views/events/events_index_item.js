SuperSocietyApp.Views.EventsIndexItem = Backbone.View.extend({
  tagName: "li",

  template: JST["events/index_item"],

  events: {
    "click": "routeToShow",
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    this.$el.html(this.template({ event: this.model }));
    this.$el.data("id", this.model.id);
    return this;
  },

  routeToShow: function () {
    Backbone.history.navigate("events/" + this.model.id);
  }
});
