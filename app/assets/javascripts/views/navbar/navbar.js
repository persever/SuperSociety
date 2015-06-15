SuperSocietyApp.Views.Navbar = Backbone.View.extend({
  template: JST["navbar/navbar"],

  initialize: function (options) {
    this.router = options.router;
    this.$el = options.$el;
    // is the below necessary?
    if (window.CURRENT_USER_NAME) {
      this.render();
    }
    this.listenTo(this.router, "route", this.activate);
  },

  events: {
    "click li button.navbar-btn": "loadForm",
    "click .glyphicon-log-out": "logOut",
    "click .logo.navbar-brand": "home"
  },

  // activate: function (router, route, params) {
  //   this.$(".active").removeClass("active");
  //   this.$("." + router).addClass("active");
  // },

  render: function () {
    this.delegateEvents();
    this.$el.html(this.template());

    return this;
  },

  home: function () {
    SuperSocietyApp.router.root();
  },

  logOut: function (event) {
    event.stopImmediatePropagation();
    $.ajax({
      url: "welcome",
      type: "DELETE",
      // success: function () {
      //   window.location.assign("http://supersociety.us");
      // }
    });
    window.location.assign("http://localhost:3000/");
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

    $("body").prepend(form.render().$el);
    form.delegateEvents();
  }

});
