SuperSocietyApp.Views.GroupShow = Backbone.CompositeView.extend({
  template: JST["groups/show"],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    // console.log(this.model.events());
    SuperSocietyApp.events.fetch({
      success: function () {
        this._events = SuperSocietyApp.events.where({ group_id: this.model.id });
        // this._events.each(function (event) {
        //   event.fetch();
        // })
        this.addEventsIndexSubview();
      }.bind(this)
    })
  },

  addEventsIndexSubview: function () {
    $("div.events").empty();
    var eventsIdxView = new SuperSocietyApp.Views.EventsIndex({
      collection: this._events
      });
    this.addSubview(".events", eventsIdxView);
  },

  // events: {
  //   "click .events li": "addEventSubview"
  // },
  //
  // addEventShowSubview: function (event) {
  //   $("div.events").empty();
  //   // var event.target.model..................
  // },

  render: function () {
    this.$el.html(this.template({ group: this.model }));
    return this;
  }
});
