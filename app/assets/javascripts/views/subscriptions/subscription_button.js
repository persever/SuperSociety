SuperSocietyApp.Views.SubscriptionButton = Backbone.CompositeView.extend({
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

    if (!this.model.isNew()) {
      this.$el.html("Unsubscribe");
      this.$el.addClass("subscribed");
    } else {
      this.$el.html("Subscribe");
      this.$el.addClass("not-subscribed");
    }

    return this;
  },

  toggle: function () {
    if (!this.model.isNew()) {
      this.model.destroy();
      this.model.clear();
      this.render();
    } else {
      this.model.save({ group_id: this.group_id });
      this.render();
    }
  }
});