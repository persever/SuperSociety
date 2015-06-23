SuperSocietyApp.Views.GroupsIndex = Backbone.View.extend({
  tagName: "div",
  className: "groups-index",

  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);
  },

  render: function () {
    if (this.collection.length > 0) {
      this.renderItems();
    }

    return this;
  },

  renderItems: function (group) {
    group = group || this.collection.models[0];
    var item = new SuperSocietyApp.Views.GroupsIndexItem({ model: group });
    var $item = item.render().$el;

    if ($(".search-query").val()) {
      this.$el.append($item);
      if (group !== this.collection.models[this.collection.length - 1]) {
        this.renderItems(this.collection.models[this.collection.models.indexOf(group) + 1]);
      }
    } else {
      $item.addClass("bounceInBottom");
      setTimeout(function () {
        this.$el.append($item);
      }.bind(this), 100);
      if (group !== this.collection.models[this.collection.length - 1]) {
        setTimeout(function () {
          this.renderItems(this.collection.models[this.collection.models.indexOf(group) + 1]);
        }.bind(this), 100);
      }
    }
  }
});
