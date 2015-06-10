SuperSocietyApp.Views.Navbar = Backbone.View.extend({
  template: JST["navbar/navbar"],

  initialize: function (options) {
    this.router = options.router;
    this.$el = options.$el;
    if (window.CURRENT_USER_NAME) {
      this.render();
    }
    this.listenTo(this.router, "route", this.activate);
  },

  events: {
    "click .form-button": "loadForm"
  },

  activate: function (source, path) {
    this.$(".active").removeClass("active");
    this.$("route").addClass("active");
  },

  render: function () {
    this.delegateEvents();
    this.$el.html(this.template());
    return this;
  },

  loadForm: function (event) {
    var formType = $(event.currentTarget).data("id");
    var form = null;
    if (formType === "new-group") {
      var group = new SuperSocietyApp.Models.Group();
      form = new SuperSocietyApp.Views.GroupForm({ model: group });
    } else if (formType === "new-event") {
      var ssevent = new SuperSocietyApp.Models.Event();
      form = new SuperSocietyApp.Views.EventForm({ model: ssevent });
    }

    $('body').prepend(form.render().$el);
    form.delegateEvents();

    // var modalContent = form.render().$el;
    // modalContent.modal();
  }

});
