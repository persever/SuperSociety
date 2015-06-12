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
    $(window).on("resize", this.center);
  },

  render: function () {
    this.$el.html(this.template({
      event: this.model,
      groups: SuperSocietyApp.currentUserManagedGroups
      }));

    if (this.model.isNew()) {
      this.$("h3").text("New Event");
    } else {
      this.$("h3").text("Edit " + "\"" + this.model.get("title") + "\"");
    }

    this.center();

    return this;
  },

  center: function () {
    var $modal = this.$(".m-content");
    var vOffset = ($(window).height() - $modal.height()) / 2;
    var hOffset = ($(window).width() - $modal.width()) / 2;
    $modal.css("margin-top", vOffset);
    $modal.css("margin-left", hOffset);
  },

  submit: function () {
    event.preventDefault();

    var attrs = $(event.target).serializeJSON();
    var isNew = false;
    if (this.model.isNew()) {
      isNew = true;
    }
    this.model.save(attrs, {
      success: function () {
        if (isNew) {
          SuperSocietyApp.events.add(this.model);
        }
        var groupId = this.model.get("group_id");
        this.remove();
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
