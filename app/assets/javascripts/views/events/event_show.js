SuperSocietyApp.Views.EventShow = Backbone.View.extend({
  template: JST["events/show"],

  initialize: function (options) {
    this.model = options.model;
    this.group = options.group;
    this.listenTo(this.model, "sync", this.render);
  },

  events: {
    "click button.eventsIdx": "switchToEventsIndexSubview"
  },

  render: function () {
    this.$el.html(this.template({ event: this.model, group: this.group }));
    return this;
  },

  switchToEventsIndexSubview: function () {
    SuperSocietyApp.router.groupShow(this.group.id);
  }
});
