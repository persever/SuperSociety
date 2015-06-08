window.SuperSocietyApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  test: "test",
  initialize: function() {

    SuperSocietyApp.currentUserManagedGroups = new SuperSocietyApp.Collections.Groups();
    var groupIds = JSON.parse(currentUserManagedGroupIds)
    groupIds.forEach(function (id) {
      var groupModel = new SuperSocietyApp.Models.Group({ id: id });
      SuperSocietyApp.currentUserManagedGroups.add(groupModel);
    });

    SuperSocietyApp.groups = new SuperSocietyApp.Collections.Groups();
    SuperSocietyApp.groups.fetch({ reset: true });

    SuperSocietyApp.events = new SuperSocietyApp.Collections.Events({ group: null });
    SuperSocietyApp.groups.each(function (group) {
      SuperSocietyApp.events.push(group.events());
    });
    SuperSocietyApp.events.fetch({ reset: true });

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
