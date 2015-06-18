SuperSocietyApp.Views.EventsIndex = Backbone.View.extend({
  tagName: "div",

  template: JST["events/index"],

  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);
  },

  render: function () {
    this.$el.html(this.template());

    if (this.collection.length > 0) {
      this.slideItems();
    }

    return this;
  },

  slideItems: function (ssevent) {
    ssevent = ssevent || this.collection.models[0];
    var now = new Date().getTime();
    var time = new Date(now);
    var datetime = new Date(ssevent.get("datetime"));
    if (datetime < time) {
      var item = new SuperSocietyApp.Views.EventsIndexItem({ model: ssevent });
      var $item = item.render().$el;
      $item.addClass("bounceInRight");
      setTimeout(function () {
        this.$el.append($item);
        if (ssevent !== this.collection.models[this.collection.length - 1]) {
          this.slideItems(this.collection.models[this.collection.models.indexOf(ssevent) + 1]);
        }
      }.bind(this), 100);
    }
  }
});
