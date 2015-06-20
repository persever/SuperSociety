SuperSocietyApp.Views.Navbar = Backbone.View.extend({
  template: JST["navbar/navbar"],

  initialize: function (options) {
    this.router = options.router;
    this.$el = options.$el;
    this.user = options.user;
    this.listenTo(this.user, "sync change", this.render);
    this.listenTo(SuperSocietyApp.currentUserEvents, "sync change add remove", function () { console.log("event fired"); this.render();} );
  },

  events: {
    "click li button.navbar-btn": "loadForm",
    "click .glyphicon-log-out": "logOut",
    "click .logo.navbar-brand": "home",
    "click img": "uploadPhoto"
  },

  // activate: function (router, route, params) {
  //   this.$(".active").removeClass("active");
  //   this.$("." + router).addClass("active");
  // },

  render: function () {
    this.delegateEvents();
    this.$el.html(this.template({
      photoUrl: this.user.get("photo_url"),
      username: this.user.get("username")
      })
    );

    this.updateEventsCounter();

    return this;
  },

  home: function () {
    Backbone.history.navigate("");
    SuperSocietyApp.router.root();
  },

  logOut: function (event) {
    event.stopImmediatePropagation();
    $.ajax({
      url: "session",
      type: "DELETE",
      // success: function () {
      //   window.location.assign("http://supersociety.us");
      // }
    });
    window.location.assign("http://supersociety.us");
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
  },

  updateEventsCounter: function () {
    var numEvents = SuperSocietyApp.currentUserEvents.length;
    console.log(numEvents);
    this.$("#nav-events-counter").text(numEvents);
  },

  uploadPhoto: function (event) {
    event.preventDefault();
    cloudinary.openUploadWidget(
      CLOUDINARY_SETTINGS,
      function (error, result) {
        var url = result[0].url;
        this.user.save({ "photo_url": url });
      }.bind(this)
    );
  }

});
