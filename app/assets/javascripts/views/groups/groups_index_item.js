SuperSocietyApp.Views.GroupsIndexItem = Backbone.View.extend({
  tagName: "div",
  className: "group-index-item col-md-4 col-sm-6",

  template: JST["groups/index_item"],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    this.$el.html(this.template({ group: this.model }));
    this.$el.attr("data-id", this.model.id);

    return this;
  }
});
