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
    var o = this._toggleHelper(this.model.get("attenders"), CURRENT_USER_ID);
    if (o) {
      var newAttenders = this.model.get("attenders").delete(o);
      this.model.set("attenders", newAttenders);
    } else {
      var currentUser = // user model
      var newAttenders = this.model.get("attenders").push(currentUser);
    }
  },

  _toggleHelper: function (array, userId) {
    var o = null;
    array.some(function (obj) {
      if (obj.id === userId) {
        o = obj;
        return true;
    }
    return o;
  });
});
