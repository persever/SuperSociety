SuperSocietyApp.Views.DeletionConfirmation = Backbone.View.extend({
  events: {
    "click .submit-deletion": "submit",
    "click .close": "removeView",
    "click .deletion-confirmation-backdrop": "remove"
  },

  render: function () {
    var $backdrop = $("<div>").addClass("deletion-confirmation-backdrop");
    var $modal = $("<div>").addClass("deletion-confirmation").append(
        $("<button>").addClass("close pull-right").text("&times;")
      ).append(
        $("<br>")
      ).text(
      "Are you sure you want to delete \"" + this.model.get("name") + "\"?"
      ).append(
        $("<br>")
      ).append(
        $("<button>").addClass("submit-deletion").text("Yes")
      );
    this.$el.append($backdrop).append($modal);

    return this;
  },

  submit: function (event) {
    event.preventDefault();

    if (this.model.constructor === SuperSocietyApp.Models.Event) {
      var isEvent = true;
      var groupId = this.model.get("group").id;
    }
    this.model.destroy({
      success: function () {
        if (isEvent) {
          SuperSocietyApp.events.remove(this.model);
          SuperSocietyApp.router.groupShow(groupId);
        } else {
          SuperSocietyApp.groups.remove(this.model);
          Backbone.history.navigate("", { trigger: true });
        }
        this.removeView();
      }.bind(this)
    });
    this.model.clear();
  }
});
