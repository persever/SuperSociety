SuperSocietyApp.Views.GroupsIndexItem = Backbone.View.extend({
  tagName: "li",

  template: JST["groups/index_item"],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    this.$el.html(this.template({ group: this.model }));
    return this;
  }
});
