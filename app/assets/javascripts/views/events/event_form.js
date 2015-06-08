SuperSocietyApp.Views.EventForm = Backbone.View.extend({
  template: JST["events/form"],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    // var currentUser = new SuperSocietyApp.Models.User();
    // currentUser.fetch();
    // this.currentUserManagedGroups = currentUser.managedGroups();
    // this.listenTo(currentUser, "sync", this.render);
  },

  render: function () {
    this.$el.html(this.template({
      event: this.model//,
      //currentUserManagedGroups: this.currentUserManagedGroups
      }));
    return this;
  },

  submit: function () {
    var attrs = $(event.target).serializeJSON();
    this.model.save(attrs, {
      success: function () {
        SuperSocietyApp.events.add(this.model);
        Backbone.history.navigate("events/" + this.model.id, { trigger: true });
      }.bind(this)
    });
  }
});
