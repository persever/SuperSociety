SuperSocietyApp.Views.GroupsIndex = Backbone.View.extend({
  tagName: "div",
  className: "groups-index",

  template: JST["groups/index"],

  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);
  },

  render: function () {
    this.$el.html(this.template());
    // this.collection.forEach(function (group) {
    //   var item = new SuperSocietyApp.Views.GroupsIndexItem({ model: group });
    //   this.$el.append(item.render().$el);
    // }.bind(this));

    if (this.collection.length > 0) {
      this.fadeIn();
    }

    return this;
  },

  fadeIn: function (group) {
    group = group || this.collection.models[0];
    var item = new SuperSocietyApp.Views.GroupsIndexItem({ model: group });
    var $item = item.render().$el;

    if ($(".search-query").val()) {
      this.$el.append($item);
    } else {
      $item.addClass("slideInUp");
      setTimeout(function () {
        this.$el.append($item);
      }.bind(this), 100);
      if (group !== this.collection.models[this.collection.length - 1]) {
        setTimeout(function () {
          this.fadeIn(this.collection.models[this.collection.models.indexOf(group) + 1]);
        }.bind(this), 100);
      }
    }
  }
});
