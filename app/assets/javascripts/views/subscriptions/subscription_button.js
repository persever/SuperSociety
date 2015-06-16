SuperSocietyApp.Views.SubscriptionButton = Backbone.View.extend({
  tagName: "button",

  initialize: function (options) {
    this.group_id = options.group_id;
    this.listenTo(this.model, "sync", this.render);
  },

  events: {
    "click": "toggle"
  },

  render: function () {
    this.delegateEvents();

    if (this.model.isNew()) {
      this.$el.html("Not Subscribed");
      // this.$el.addClass("not-subscribed");
    } else {
      this.$el.html("Subscribed");
      // this.$el.addClass("subscribed");
    }

    return this;
  },

  toggle: function () {
    if (this.model.isNew()) {
      this.model.save({ group_id: this.group_id });
      this.render();
    } else {
      this.model.destroy();
      this.model.clear();
      this.render();
    }
  }
});
