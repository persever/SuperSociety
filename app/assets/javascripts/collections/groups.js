SuperSocietyApp.Collections.Groups = Backbone.Collection.extend({
  model: SuperSocietyApp.Models.Group,
  url: "/api/groups",

  getOrFetch: function (model) {
    
  }
});
