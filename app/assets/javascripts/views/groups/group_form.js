SuperSocietyApp.Views.GroupForm = Backbone.View.extend({
  template: JST["groups/form"],

  events: {
    "submit form": "submit",
    "click .close": "remove",
    "click .m-backdrop": "remove",
    "click .photo-upload": "uploadPhoto"
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    $(window).on("resize", this.center);
  },

  render: function () {
    this.$el.html(this.template({
      group: this.model
      }));

    if (this.model.isNew()) {
      this.$("h3").text("New Group");
    } else {
      this.$("h3").text("Edit " + "\"" + this.model.get("name") + "\"");
    }

    this.center();

    return this;
  },

  center: function () {
    var $modal = this.$(".m-content");

    // make this work when you get the chance
    // console.log($modal.height());
    // console.log($modal.width());

    var vOffset = ($(window).height() - 450) / 2;
    var hOffset = ($(window).width() - 500) / 2;
    $modal.css("margin-top", vOffset);
    $modal.css("margin-left", hOffset);
  },

  uploadPhoto: function (event) {
    event.preventDefault();
    cloudinary.openUploadWidget(
      CLOUDINARY_SETTINGS,
      function (error, result) {
        var url = result[0].url;
        this.$(".save-photo").val(url);
        this.$("button.photo-upload").text("Photo Saved!").removeClass("btn-primary").addClass("btn-danger");
      }.bind(this)
    );
  },

  submit: function (event) {
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
        this.remove();
        SuperSocietyApp.router.groupShow(this.model.id);
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
