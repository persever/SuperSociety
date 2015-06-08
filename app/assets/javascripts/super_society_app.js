window.SuperSocietyApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  test: "test",
  initialize: function() {
    SuperSocietyApp.groups = new SuperSocietyApp.Collections.Groups();
    SuperSocietyApp.groups.fetch({ reset: true });

    var router = new SuperSocietyApp.Routers.Router({
      $rootEl: $("#content"),
      groups: SuperSocietyApp.groups,
      events: SuperSocietyApp.events
    });

    Backbone.history.start();
  }
};

$(document).ready(function(){
  SuperSocietyApp.initialize();
});
