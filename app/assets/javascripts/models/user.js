SuperSocietyApp.Models.User = Backbone.Model.extend({
  url: "/",

  initialize: function () {
    this.id = currentUser.id;
  },

  managedGroups: function () {
    if (!this._managedGroups) {
      this._managedGroups = new SuperSocietyApp.Collections.Groups({ id: this.id });
    }

    return this._managedGroups;
  }
});
