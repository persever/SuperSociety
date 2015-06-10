SuperSocietyApp.Views.EventShow = Backbone.View.extend({
  template: JST["events/show"],

  initialize: function (options) {
    this.model = options.model;
    this.group = options.group;
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.group, "sync", this.render);
  },

  events: {
    "click button.eventsIdx": "switchToEventsIndexSubview",
    "click button.eventToggle": "toggleEventAttending"
  },

  render: function () {
    this.$el.html(this.template({ event: this.model, group: this.group }));
    // if...
    // this.$("button.eventToggle").text("Join");
    return this;
  },

  switchToEventsIndexSubview: function () {
    SuperSocietyApp.router.groupShow(this.group.id);
  },

  toggleEventAttending: function () {
    // if (this.model.escape("attenders").include(current user.....));
  }
});
