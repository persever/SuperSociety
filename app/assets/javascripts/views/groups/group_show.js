SuperSocietyApp.Views.GroupShow = Backbone.CompositeView.extend({
  template: JST["groups/show"],

  className: "group",

  initialize: function (options) {
    this.model = options.model;
    this.collection = this.model.ssevents();
    this._subEventId = options.subEventId;
    this.listenTo(this.model, "sync", this.render);
    $(window).on("resize", this.stretch.bind(this));

    var subscription = this.model.currentUserSubscription();
    this.button = new SuperSocietyApp.Views.SubscriptionButton({ model: subscription, group_id: this.model.id });
  },

  events: {
    "click .group-events .title": "addEventShowSubview",
    "click h2.groupname": "addEventsIndexSubview",
    "click .group-edit-button": "edit",
    "click .group-delete-button": "deleteConfirm",
    "click .name": "addEventsIndexSubview"
  },

  addEventsIndexSubview: function () {
    if (this._subEventId) {
      this._subEventId = 0;
    }
    var eventsIdxView = new SuperSocietyApp.Views.EventsIndex({
      collection: this.collection
      });
    this._swapSubview(eventsIdxView);
  },

  addEventShowSubview: function (event) {
    var eventToShow = null;
    if (event.constructor !== SuperSocietyApp.Models.Event) {
      var id = $($(event.currentTarget).closest(".event-index-item")).data("id");
      this._subEventId = id;
      eventToShow = this.collection.findWhere({ id: id });
    } else {
      this._subEventId = event.id;
      eventToShow = event;
    }
    var eventShowView = new SuperSocietyApp.Views.EventShow({ model: eventToShow, group: this.model });
    this._swapSubview(eventShowView);
  },

  deleteConfirm: function () {
    var confirmation = new SuperSocietyApp.Views.DeletionConfirmation({ model: this.model });
    $("body").prepend(confirmation.render().$el);
  },

  // onRender: function () {
  //   var height = this.$(".desc-and-events").height() - this.$(".header-bar.members h3").outerHeight();
  //   if (height > $(".subscribers").height()) {
  //     this.$(".subscribers").css("height", height);
  //   }
  // },

  render: function () {
    this.$el.html(this.template({ group: this.model }));
    this.$(".subscription-button").html(this.button.render().$el);

    var $editButton = null;
    var $deleteButton = null;
    if (CURRENT_USER_ID == this.model.get("creator_id")) {
      $editButton = "<button class=\"edit-group\">Edit</button>";
      $deleteButton = "<button class=\"delete-group\">Delete</button>";
    } else {
      $editButton = $("<div>").addClass("empty").css("width", 100);
      $deleteButton = $("<div>").addClass("empty");
    }
    this.$(".group-edit-button").html($editButton);
    this.$(".group-delete-button").html($deleteButton);

    if (this._subEventId !== 0) {
      var ssevent = this.collection.getOrFetch(this._subEventId);
      this.addEventShowSubview(ssevent);
    } else if (this._subEventId === 0) {
      this.addEventsIndexSubview();
    } else {
      throw "EventShow must be rendered with a subEventId argument.";
    }

    if (this.model.get("subscribers")) {
      var subscribers = this.model.get("subscribers");
      subscribers.forEach(function(subscriber) {
        var $img = $("<img>").attr("src", subscriber.photo_url);
        // var $imgDiv = $("<div>").html($img).addClass("col-sm-4");
        this.$(".subscribers").append($img);
      });
    }

    this.stretch();
    // this.onRender();

    return this;
  },

  stretch: function () {
    this.$(".desc-and-events").css("width", $("#content").width() - 340);
  },

  edit: function (event) {
    var form = new SuperSocietyApp.Views.GroupForm({ model: this.model });

    $("body").prepend(form.render().$el);
    // is the below necessary?
    form.delegateEvents();
  },

  _swapSubview: function (view) {
    if (this._currentSubview) {
      this._currentSubview.remove();
    }
    this._currentSubview = view;

    this.addSubview(".group-events", view);
  }
});
