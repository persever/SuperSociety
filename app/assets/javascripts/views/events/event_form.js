SuperSocietyApp.Views.EventForm = Backbone.View.extend({
  template: JST["events/form"],

  events: {
    "submit form": "submit"
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    SuperSocietyApp.currentUserManagedGroups.each(function (model) {
      model.fetch();
    });
    this.listenTo(SuperSocietyApp.currentUserManagedGroups, "sync", this.render);
  },

  render: function () {
    console.log(this.model);
    $("#modal").append(this.template({
      event: this.model,
      groups: SuperSocietyApp.currentUserManagedGroups
      }));
    return this;
  },

  submit: function () {
    event.preventDefault();

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
        });
      }
    });
  }
});
