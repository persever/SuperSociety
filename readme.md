# SuperSociety

[Live Demo][site]

[site]: http://supersociety.us

## Description

SuperSociety is a social event planning site for the superhero community.
Excluding authorization, the app is a single-page Backbone app.

## Technologies

- [x] Rails
- [x] Ruby
- [x] Backbone
- [x] JavaScript
- [x] jQuery
- [x] HTML
- [x] CSS
- [x] Bootstrap (To start with, then heavily customized CSS.)

#Plan

## Minimum Viable Product
SuperSociety is a clone of Meetup built on Rails and Backbone. Users can:

- [x] Create accounts
- [x] Create sessions (log in)
- [x] Create groups
- [x] Create events for the groups they manage
- [x] Edit and delete groups and events they created
- [x] View groups and events
- [x] Subscribe to and unsubscribe from groups, via toggle buttons
- [x] Join and leave events, via toggle buttons
- [x] View their subscribed groups and upcoming events
- [x] Search for groups by name, and for events by title and location

## Design Docs
* [View Wireframes][views]
* [DB Schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Basic Groups and Events (<1 day)
I will implement user authentication in Rails, and enable users to create groups
and events with simple Rails view forms. The splash page will be a single-page
signin/signup.

    # users_controller.rb

      def create
        if params[:submission] == "Sign Up"
          @user = User.new(user_params)
          @user.photo_url = "http://res.cloudinary.com/dgzqgdlmj/image/upload/v1434497946/avatar_pcwjvc.jpg"
          if @user.save
            sign_in(@user)
          else
            flash.now[:errors] = @user.errors.full_messages
            render :new
          end
        elsif params[:submission] == "Log In"
          @user = User.find_by_credentials(user_params)
          if @user
            sign_in(@user)
          else
            @user = User.new(user_params)
            flash.now[:errors] = ["Invalid login"]
            render :new
          end
        elsif params[:submission] == "Guest Pass"
          @users = [
            User.find_by({ username: "Tony Stark"}),
            User.find_by({ username: "Bruce Wayne"}),
            User.find_by({ username: "Thor"}),
            User.find_by({ username: "Steve Rogers"})
          ]
          @user = @users.sample
          sign_in(@user)
        end
      end

[Details][phase-one]

### Phase 2: Viewing Group and Event Shows (~2 days)
I will add API routes to serve group and event data as JSON, then add Backbone
models and collections that fetch data from those routes. The group show view
will be a composite view, and the event show view will be nested inside of that
group view. Excepting auth, the app will now be a single page Backbone app.
Groups and events will have "subscribe" and "attend" toggle buttons.

    // attending_button.js

      toggle: function () {
        if (this.model.isNew()) {
          this.model.save({ group_id: this.group_id });
          this.render();
          this.model.trigger("joined")
        } else {
          this.model.destroy();
          this.model.clear();
          this.render();
          this.model.trigger("left")
        }
      }

[Details][phase-two]

### Phase 3: Viewing Group and Event Indices (~1 day)
I will add Backbone views for the group and event indices and index items. I
will also add toggle buttons to the group show view, event show view, and event
index item, enabling users to subscribe or unsubscribe to a group, and join or
leave events. I will need to create a frontend user model.

    // events_index.js

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

[Details][phase-three]

### Phase 4: Creating and Editing Groups and Events (~1 day)
I will create modal forms for groups and events. Filepicker will be integrated.
Filepicker will also be integrated with the user signup.

    // event_form.js

      submit: function () {
        event.preventDefault();

        var attrs = $(event.target).serializeJSON();
        attrs.event.datetime = moment(this.$("input#datetime").val(), "MM/DD/YYYY HH:mm").format("YYYY-MM-DD HH:mm:ss");

        var isNew = false;
        if (this.model.isNew()) {
          isNew = true;
        }
        this.model.save(attrs, {
          success: function () {
            if (isNew) {
              SuperSocietyApp.events.add(this.model);
              this.model.fetch();
            }
            var groupId = this.model.get("group_id");
            this.remove();
            Backbone.history.navigate("groups/" + groupId);
            SuperSocietyApp.router.groupShow(groupId, this.model.id);
          }.bind(this),

          error: function (model, response) {
            $(".errors").empty();
            response.responseJSON.forEach(function (message) {
              var $message = $("<div>").text(message + ".");
              $(".errors").append($message);
            });
          }
        });
      }

[Details][phase-four]

### Phase 5: Searching for Groups and Events (~2 days)
Finally, I will assemble the root composite view, creating a search bar that
separates searches for groups and events. The subviews will respond to input
immediately. This will be the landing page after a user logs in. (They will also
be able to access it with the nav logo.) When the input is empty, its default
group index view will show the user's subscribed groups, and its default event
index view will show the user's joined events. After login the user will see
their upcoming events.

    // router.js

      SuperSocietyApp.currentUser = new SuperSocietyApp.Models.User({
        id: CURRENT_USER_ID
      });
      SuperSocietyApp.currentUserEvents = new SuperSocietyApp.Collections.Events();
      SuperSocietyApp.currentUser.fetch({ success: function () {
        SuperSocietyApp.currentUserEvents.fetch({
          data: { attender: SuperSocietyApp.currentUser.toJSON() }
        });
      }});

    // home.js

      retrieveUserEvents: function () {
        this.renderEventsIndexSubview(SuperSocietyApp.currentUserEvents);
      }

      renderEventsIndexSubview: function (collection) {
        this.$(".active").removeClass("active");
        this.$("[data-id=\"event-search\"]").addClass("active");
        var eventsIdxView = new SuperSocietyApp.Views.EventsIndex({
          collection: collection
          });
        this.\_swapSubview(eventsIdxView);
      }

      \_swapSubview: function (view) {
        if (this.\_currentSubview) {
          this.\_currentSubview.remove();
        }
        this.\_currentSubview = view;

        this.view = view;
        this.addSubview(".results", view);
      }

[Details][phase-five]

### Phase 6: Frosting (4+ days)
Touch up code, seed data, style the UI, and implement bonus features!

### Bonus Features (TBD)
- [x] Original design, implemented in almost entirely custom CSS
- [x] Mouse reactivity
- [x] Slide in index items
- [x] Smooth hover transitions
- [x] Automatic search response to input
- [x] Modal forms
- [x] User can update photo from nav icon
- [x] Upcoming events counter in nav, and counters on home page
- [x] Home view counters and show view member/attender images update instantly

'''

    // static_pages.scss  

    .group-index-item img.hoverable {
      z-index: 99;
      opacity: 0;
    }

    .group-index-item:hover .hoverable {
      opacity: 1;
    }

    .group-index-item .hide-on-hover {
      position: absolute;
      top: calc(50% - 50px);
      left: calc(50% - 150px);
      height: 100px;
      width: 300px;
      transition: all 0.2s linear;
    }

    .group-index-item:hover .hide-on-hover {
      opacity: 0;
    }
    
'''

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
