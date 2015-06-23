SuperSocietyApp.Views.EventsIndex = Backbone.View.extend({
  tagName: "div",

  template: JST["events/index"],

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
    var item = new SuperSocietyApp.Views.EventsIndexItem({ model: ssevent });
    var $item = item.render().$el;

    if ($(".search-query").val()) {
      this.$el.append($item);
      if (ssevent !== this.collection.models[this.collection.length - 1]) {
        this.slideItems(this.collection.models[this.collection.models.indexOf(ssevent) + 1]);
      }
    } else {
      $item.addClass("bounceInRight");
      if (datetime > time) {
        setTimeout(function () {
          this.$el.append($item);
        }.bind(this), 100);
      }
      if (ssevent !== this.collection.models[this.collection.length - 1]) {
        setTimeout(function () {
          this.slideItems(this.collection.models[this.collection.models.indexOf(ssevent) + 1]);
        }.bind(this), 100);
      }
    }

  }
});
