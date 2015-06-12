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
