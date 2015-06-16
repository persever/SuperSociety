SuperSocietyApp.Views.GroupsIndex = Backbone.View.extend({
  tagName: "div",

  template: JST["groups/index"],

  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);
  },

  render: function () {
    this.$el.html(this.template());
    this.collection.forEach(function (group) {
      var item = new SuperSocietyApp.Views.GroupsIndexItem({ model: group });
      this.$el.append(item.render().$el);
    }.bind(this));

    return this;
  }
});
