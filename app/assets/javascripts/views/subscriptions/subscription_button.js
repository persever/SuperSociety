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
    console.log(this.model);
    this.delegateEvents();

    if (this.model.get("user_id") === CURRENT_USER_ID) {
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
      console.log("unsub!");
      this.model.destroy();
      this.model.clear();
      this.render();
    } else {
      console.log("sub!");
      this.model.save({group_id: this.group_id});
      this.render();
    }
  }

});
