SuperSocietyApp.Models.User = Backbone.Model.extend({
  urlRoot: "/api/users",

  managedGroups: function () {
    if (!this._managedGroups) {
      this._managedGroups = new SuperSocietyApp.Collections.Groups();
    }

    return this._managedGroups;
  },

  parse: function (response) {
    if (response.managed_groups) {
      this.managedGroups().set(response.managed_groups.managed_groups, { parse: true });
      delete response.managed_groups;
    }
   return response;
  }
});
