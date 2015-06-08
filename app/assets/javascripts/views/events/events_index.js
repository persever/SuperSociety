SuperSocietyApp.Views.EventsIndex = Backbone.View.extend({
  tagName: "ul",

  // template: JST["groups/index"],

  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);
  },

  render: function () {
    // this.$el.html(this.template());
    this.collection.each(function (ssevent) {
      var item = new SuperSocietyApp.Views.EventsIndexItem({ model: ssevent });
      this.$el.append(item.render().$el);
    });

    return this;
  }
});
