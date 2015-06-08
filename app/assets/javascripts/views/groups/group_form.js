SuperSocietyApp.Views.GroupForm = Backbone.View.extend({
  template: JST["groups/form"],

  events: {
    "submit form": "submit"
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    this.$el.html(this.template({
      group: this.model
      }));
    return this;
  },

  submit: function (event) {
    event.preventDefault();

    var attrs = $(event.target).serializeJSON();
    this.model.save(attrs, {
      success: function () {
        SuperSocietyApp.groups.add(this.model);
        Backbone.history.navigate("groups/" + this.model.id, { trigger: true });
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
