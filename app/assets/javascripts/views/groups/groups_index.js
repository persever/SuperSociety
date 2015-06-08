SuperSocietyApp.Views.GroupsIndex = Backbone.View.extend({
  tagName: "ul",

  // template: JST["groups/index"],

  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);
  },

  render: function () {
    // this.$el.html(this.template());
    this.collection.each(function (group) {
      var item = new SuperSocietyApp.Views.GroupsIndexItem({ model: group });
      this.$el.append(item.render().$el);
    });

    return this;
  }
});
