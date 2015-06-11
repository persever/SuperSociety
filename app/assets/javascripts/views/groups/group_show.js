SuperSocietyApp.Views.GroupShow = Backbone.CompositeView.extend({
  template: JST["groups/show"],

  initialize: function (options) {
    this.model = options.model;
    this.collection = this.model.ssevents();
    this._subEventId = options.subEventId;
    this.listenTo(this.model, "sync", this.render);

    var subscription = this.model.currentUserSubscription();
    if (subscription) {
      this.button = new SuperSocietyApp.Views.SubscriptionButton({ model: subscription, group_id: this.model.id });
    } else {
      this.button = new SuperSocietyApp.Views.SubscriptionButton();
    }
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

  events: {
    "click .events li": "addEventShowSubview",
    "click h2.groupname": "addEventsIndexSubview"
  },

  addEventShowSubview: function (event) {
    var eventToShow = null;
    if (event.constructor !== SuperSocietyApp.Models.Event) {
      var id = $(event.currentTarget).data("id");
      this._subEventId = id;
      eventToShow = SuperSocietyApp.events.findWhere({ id: id });
    } else {
      this._subEventId = event.id;
      eventToShow = event;
    }
    var eventShowView = new SuperSocietyApp.Views.EventShow( { model: eventToShow, group: this.model } );
    this._swapSubview(eventShowView);
  },

  render: function () {
    this.$el.html(this.template({ group: this.model }));
    this.$("#subscription-button").html(this.button.render().$el);

    if (this._subEventId !== 0) {
      var ssevent = this.collection.getOrFetch(this._subEventId);
      this.addEventShowSubview(ssevent);
    } else if (this._subEventId === 0) {
      this.addEventsIndexSubview();
    } else {
      console.log("EventShow must be rendered with a subEventId argument.");
    }

    return this;
  },

  _swapSubview: function (view) {
    if (this._currentSubview) {
      this._currentSubview.remove();
    }
    this._currentSubview = view;

    this.addSubview(".events", view);
  }
});
