SuperSocietyApp.Collections.Groups = Backbone.Collection.extend({
  model: SuperSocietyApp.Models.Group,
  url: "/api/groups",

  getOrFetch: function (id) {
    var group = this.get(id);
    var groups = this;
    if (group) {
      group.fetch();
    } else {
      group = new SuperSocietyApp.Models.Group({ id: id });
      group.fetch({
        success: function () {
          groups.add(group);
        }
      });
    }

    return group;
  }
});
