SuperSocietyApp.Views.GroupShow = Backbone.CompositeView.extend({
  template: JST["groups/show"],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);

    // toggle for current event id
    // in render, f current event id, render that single subview, else render index
    // clicking an event sets current event id, rerenders entire view
    console.log(this.model);
    // this.model.events().fetch() // fetch each??
    this.listenTo(this.model.events(), "sync", this.render);

    // SuperSocietyApp.events.fetch({
    //   success: function () {
    //     this._events = SuperSocietyApp.events.where({ group_id: this.model.id });
    //     this.addEventsIndexSubview();
    //   }.bind(this)
    // });
  },

  addEventsIndexSubview: function () {
    var eventsIdxView = new SuperSocietyApp.Views.EventsIndex({
      collection: this._events
      });
    this._swapSubview(eventsIdxView);
  },

  events: {
    "click .events li": "addEventShowSubview",
    "click h2": "addEventsIndexSubview"
  },

  addEventShowSubview: function (event) {
    var id = $(event.currentTarget).data("id");
    var eventToShow = SuperSocietyApp.events.findWhere({ id: id });
    var eventShowView = new SuperSocietyApp.Views.EventShow({ model: eventToShow });
    this._swapSubview(eventShowView);
  },

  render: function () {
    this.$el.html(this.template({ group: this.model }));
    return this;
  },

  // _swapSubview: function (view) {
  //   if (this._currentSubview) {
  //     this.removeSubview(".events", this._currentSubview);
  //   }
  //   this._currentSubview = view;
  // }

  _swapSubview: function (view) {
    if (this._currentSubview) {
      this._currentSubview.remove();
    }
    this._currentSubview = view;

    this.addSubview(".events", view);
  }
});
