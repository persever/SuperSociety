SuperSocietyApp.Views.GroupShow = Backbone.View.extend({
  template: JST["groups/show"],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    this.$el.html(this.template({ group: this.model }));
    return this;
  }
});
