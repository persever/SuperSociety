SuperSocietyApp.Views.EventsIndexItem = Backbone.View.extend({
  tagName: "li",
  className: "event-index-item",

  template: JST["events/index_item"],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);

    var attending = this.model.currentUserAttending();
    this.button = new SuperSocietyApp.Views.AttendingButton({ model: attending, event_id: this.model.id });
  },

  render: function () {
    this.$el.html(this.template({ event: this.model }));
    this.$(".attending-button").html(this.button.render().$el);
    if (Backbone.history.getFragment() === "") {
      this.$(".group-name").text(this.model.get("group").name);
    }

    this.$el.attr("data-id", this.model.id);

    return this;
  }

});
