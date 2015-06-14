SuperSocietyApp.Views.AttendingButton = Backbone.CompositeView.extend({
  tagName: "button",

  initialize: function (options) {
    this.event_id = options.event_id;
    this.listenTo(this.model, "sync", this.render);
  },

  events: {
    "click": "toggle"
  },

  render: function () {
    this.delegateEvents();

    if (this.model.isNew()) {
      this.$el.html("Join");
      // this.$el.addClass("not-joined");
    } else {
      this.$el.html("Leave");
      // this.$el.addClass("joined");
    }

    return this;
  },

  toggle: function () {
    if (this.model.isNew()) {
      this.model.save({ event_id: this.event_id });
      this.render();
    } else {
      this.model.destroy();
      this.model.clear();
      this.render();
    }
  }
});