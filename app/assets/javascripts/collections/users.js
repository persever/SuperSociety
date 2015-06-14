// SuperSocietyApp.Collections.Users = Backbone.Collection.extend({
//   model: SuperSocietyApp.Models.User,
//
//   url: "/api/users",
//
//   initialize: function (models, options) {
//     if (options) {
//       this.subscribed_group = options.subscribed_group;
//       this.joined_event = options.joined_event;
//     }
//   },
//
//   comparator: function (user) {
//     return user.get("username");
//   },
//
//   getOrFetch: function (id) {
//     var user = this.get(id);
//     var users = this;
//     if (user) {
//       user.fetch();
//     } else {
//       user = new SuperSocietyApp.Models.User({ id: id });
//       user.fetch({
//         success: function () {
//           events.add(user);
//         }
//       });
//     }
//
//     return user;
//   }
// });
