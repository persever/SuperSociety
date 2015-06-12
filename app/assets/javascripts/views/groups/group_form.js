SuperSocietyApp.Views.GroupForm = Backbone.View.extend({
  template: JST["groups/form"],

  events: {
    "submit form": "submit",
    "click .close": "remove",
    "click .m-backdrop": "remove"
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    $(window).on("resize", this.center);
  },

  render: function () {
    this.$el.html(this.template({
      group: this.model
      }));
    this.center();

    return this;
  },

  center: function () {
    var $modal = this.$(".m-content");

    // make this work when you get the chance
    // console.log($modal.height());
    // console.log($modal.width());

    var vOffset = ($(window).height() - 400) / 2;
    var hOffset = ($(window).width() - 300) / 2;
    $modal.css("margin-top", vOffset);
    $modal.css("margin-left", hOffset);
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
        });
      }
    });
  }
});
