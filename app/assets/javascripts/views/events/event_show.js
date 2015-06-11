SuperSocietyApp.Views.EventShow = Backbone.View.extend({
  template: JST["events/show"],

  initialize: function (options) {
    // console.log(options);
    this.model = options.model;
    this.group = options.group;
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.group, "sync", this.render);

    // if (this.model) {
      var attending = this.model.currentUserAttending();
      this.button = new SuperSocietyApp.Views.AttendingButton({ model: attending, event_id: this.model.id });
    // }
  },

  events: {
    "click button.eventsIdx": "switchToEventsIndexSubview"
  },

  render: function () {
    this.$el.html(this.template({ event: this.model, group: this.group }));
    // if (this.model) {
      this.$("#attending-button").html(this.button.render().$el);
    // }
    if (CURRENT_USER_ID === this.group.get("creator_id")) {
      // var editButton = // button to pop up modal
      this.$("button.edit").html(editButton);
    }

    return this;
  },

  switchToEventsIndexSubview: function () {
    SuperSocietyApp.router.groupShow(this.group.id);
  }
});
