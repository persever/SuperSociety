window.SuperSocietyApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  test: "test",
  initialize: function() {

    SuperSocietyApp.groups = new SuperSocietyApp.Collections.Groups();
    SuperSocietyApp.groups.fetch({ reset: true });

    SuperSocietyApp.events = new SuperSocietyApp.Collections.Events();
    SuperSocietyApp.events.fetch({ reset: true });

    SuperSocietyApp.currentUser = new SuperSocietyApp.Models.User({ id: CURRENT_USER_ID });
    SuperSocietyApp.currentUser.fetch();

    SuperSocietyApp.router = new SuperSocietyApp.Routers.Router({
      $rootEl: $("#content"),
      groups: SuperSocietyApp.groups,
      events: SuperSocietyApp.events
    });

    SuperSocietyApp.navbar = new SuperSocietyApp.Views.Navbar({
      router: SuperSocietyApp.router,
      $el: $("#nav"),
    });

    Backbone.history.start();
  }
};

$(document).ready(function(){
  SuperSocietyApp.initialize();
});
