SuperSocietyApp.Views.EventsIndex = Backbone.View.extend({
  tagName: "ul",

  template: JST["events/index"],

  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);
  },

  render: function () {
    this.$el.html(this.template());
    this.collection.forEach(function (event) {
      var item = new SuperSocietyApp.Views.EventsIndexItem({ model: event });
      this.$el.append(item.render().$el);
    }.bind(this));

    return this;
  }
});
