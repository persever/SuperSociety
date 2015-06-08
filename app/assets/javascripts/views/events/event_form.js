SuperSocietyApp.Views.EventForm = Backbone.View.extend({
  template: JST["events/form"],

  events: {
    "submit form": "submit"
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    SuperSocietyApp.groups.fetch();
    // SuperSocietyApp.currentUser.fetch();
    // this.listenTo(SuperSocietyApp.currentUser, "sync", this.render);
  },

  render: function () {
    this.$el.html(this.template({
      event: this.model,
      groups: SuperSocietyApp.groups
      //groups: SuperSocietyApp.currentUser.managedGroups()
      }));
    return this;
  },

  submit: function () {
    var attrs = $(event.target).serializeJSON();
    this.model.save(attrs, {
      success: function () {
        SuperSocietyApp.events.add(this.model);
        Backbone.history.navigate("events/" + this.model.id, { trigger: true });
      }.bind(this),

      error: function (model, response) {
        $(".errors").empty();
        response.responseJSON.forEach(function (message) {
          var $messageLi = $("<li>").text(message);
          $(".errors").append($messageLi);
        })
      }
    });
  }
});
