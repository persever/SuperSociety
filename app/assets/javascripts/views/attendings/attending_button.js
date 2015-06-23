SuperSocietyApp.Views.AttendingButton = Backbone.View.extend({
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

    this.$el.attr("data-event-id", this.event_id);

    this.$el.removeClass();
    if (this.model.isNew()) {
      this.$el.html("Join!");
      this.$el.addClass("not-joined");
    } else {
      this.$el.html("Going");
      this.$el.addClass("joined");
    }

    return this;
  },

  toggle: function () {
    if (this.model.isNew()) {
      this.model.save({ event_id: this.event_id });
      var ssevent = new SuperSocietyApp.Models.Event({ id: this.event_id })
      ssevent.fetch();
      SuperSocietyApp.currentUserEvents.add(ssevent)
      this.render();
    } else {
      SuperSocietyApp.currentUserEvents.remove(this.event_id)
      this.model.destroy();
      this.model.clear();
      this.render();
    }
  }
});
