SuperSocietyApp.Views.GroupShow = Backbone.CompositeView.extend({
  template: JST["groups/show"],

  initialize: function (options) {
    this.model = options.model;
    this.listenTo(this.model, "sync", this.render);
    this._modelEvents = this.model.ssevents();
    this._modelEvents.fetch();
    if (options.subEventId === 0) {
      this.listenTo(this._modelEvents, "sync", this.addEventsIndexSubview);
    } else {
      var ssevent = this._modelEvents.get(options.subEventId);
      this.addEventShowSubview(ssevent);
    }
  },

  addEventsIndexSubview: function () {
    var eventsIdxView = new SuperSocietyApp.Views.EventsIndex({
      collection: this._modelEvents
      });
    this._swapSubview(eventsIdxView);
  },

  events: {
    "click .events li": "addEventShowSubview",
    "click h2.groupname": "addEventsIndexSubview"
  },

  addEventShowSubview: function (event) {
    var eventToShow = null;
    if (!event.constructor) {
      var id = $(event.currentTarget).data("id");
      eventToShow = SuperSocietyApp.events.findWhere({ id: id });
    } else {
      eventToShow = event;
    }
      var eventShowView = new SuperSocietyApp.Views.EventShow( { model: eventToShow, group: this.model } );
    this._swapSubview(eventShowView);
  },

  render: function () {
    this.$el.html(this.template({ group: this.model }));
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
