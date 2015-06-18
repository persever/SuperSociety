SuperSocietyApp.Views.EventForm = Backbone.View.extend({
  template: JST["events/form"],

  events: {
    "submit form": "submit",
    "click .close": "remove",
    "click .m-backdrop": "remove",
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    SuperSocietyApp.currentUserManagedGroups.each(function (model) {
      model.fetch();
    });
    this.listenTo(SuperSocietyApp.currentUserManagedGroups, "sync", this.render);
  },

  render: function () {
    this.$el.html(this.template({
      ssevent: this.model,
      groups: SuperSocietyApp.currentUserManagedGroups
      }));
    if (SuperSocietyApp.currentUserManagedGroups.length === 0) {
      this.$(".errors").text("Events can only be added to groups you manage. Start a group!");
    }

    if (this.model.isNew()) {
      this.$("h3").text("New Event");
    } else {
      this.$("h3").text("Edit " + "\"" + this.model.get("title") + "\"");
    }

    return this;
  },

  submit: function () {
    event.preventDefault();

    var attrs = $(event.target).serializeJSON();
    attrs.event.datetime = moment(this.$("input#datetime").val(), "MM/DD/YYY HH:mm").format("YYYY-MM-DD HH:mm:ss");

    var isNew = false;
    if (this.model.isNew()) {
      isNew = true;
    }
    this.model.save(attrs, {
      success: function () {
        if (isNew) {
          SuperSocietyApp.events.add(this.model);
          this.model.fetch();
        }
        var groupId = this.model.get("group_id");
        this.remove();
        Backbone.history.navigate("groups/" + groupId);
        SuperSocietyApp.router.groupShow(groupId, this.model.id);
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
