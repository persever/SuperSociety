SuperSocietyApp.Views.EventShow = Backbone.View.extend({
  template: JST["events/show"],

  className: "event-show",

  initialize: function (options) {
    this.model = options.model;
    this.model.fetch();
    this.group = options.group;
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model._currentUserAttending, "joined", this.addUser);
    this.listenTo(this.model._currentUserAttending, "left", this.removeUser);
    this.listenTo(this.group, "sync", this.render);

    var attending = this.model.currentUserAttending();
    this.button = new SuperSocietyApp.Views.AttendingButton({ model: attending, event_id: this.model.id });
  },

  events: {
    "click button.eventsIdx": "switchToEventsIndexSubview",
    "click .event-edit-button": "edit",
    "click .event-delete-button": "deleteConfirm",
  },

  addUser: function () {
    var $img = $("<img>").attr(
      "src", SuperSocietyApp.currentUser.get("photo_url")).attr(
      "id", "current-user-attending-photo"
    );
    this.$(".attenders").append($img);
  },

  removeUser: function () {
    $("#current-user-attending-photo").remove();
  },

  render: function () {
    this.$el.html(this.template({ ssevent: this.model, group: this.group }));
    this.$(".attending-button").html(this.button.render().$el);

    if (CURRENT_USER_ID == this.group.get("creator_id")) {
      var $editButton = "<button class=\"edit\">Edit</button>";
      var $deleteButton = "<button class=\"delete\">Delete</button>";
      this.$(".event-edit-button").html($editButton);
      this.$(".event-delete-button").html($deleteButton);
    } else {
      this.$(".event-edit-button").remove();
      this.$(".event-delete-button").remove();
    }

    if (this.model.get("attenders")) {
      var attenders = this.model.get("attenders");
      attenders.forEach(function(attender) {
        var $img = $("<img>").attr("src", attender.photo_url);
        if (attender.id == CURRENT_USER_ID) {
          $img.attr("id", "current-user-attending-photo");
        }
        this.$(".attenders").append($img);
      });
    }

    return this;
  },

  deleteConfirm: function () {
    var confirmation = new SuperSocietyApp.Views.DeletionConfirmation({ model: this.model });
    $("body").prepend(confirmation.render().$el);
  },

  edit: function (event) {
    var form = new SuperSocietyApp.Views.EventForm({ model: this.model });

    $("body").prepend(form.render().$el);
    form.delegateEvents();
  },

  switchToEventsIndexSubview: function () {
    SuperSocietyApp.router.groupShow(this.group.id);
  }
});
