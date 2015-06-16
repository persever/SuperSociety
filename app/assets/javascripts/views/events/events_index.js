SuperSocietyApp.Views.EventsIndex = Backbone.View.extend({
  tagName: "div",

  template: JST["events/index"],

  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);
  },

  render: function () {
    this.$el.html(this.template());
    this.collection.forEach(function (ssevent) {
      var item = new SuperSocietyApp.Views.EventsIndexItem({ model: ssevent });
      this.$el.append(item.render().$el);
    }.bind(this));

    return this;
  }
});
