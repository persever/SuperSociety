SuperSocietyApp.Views.GroupShow = Backbone.CompositeView.extend({
  template: JST["groups/show"],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this._modelEvents = this.model.ssevents();
    this._modelEvents.fetch();
    this.listenTo(this._modelEvents, "sync", this.addEventsIndexSubview);
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
    var id = $(event.currentTarget).data("id");
    var eventToShow = SuperSocietyApp.events.findWhere({ id: id });
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
