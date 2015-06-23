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
and events with simple Rails view forms.

[Details][phase-one]

### Phase 2: Viewing Group and Event Shows (~2 days)
I will add API routes to serve group and event data as JSON, then add Backbone
models and collections that fetch data from those routes. The group show view
will be a composite view, and the event show view will be nested inside of that
group view. Excepting auth, the app will now be a single page Backbone app.
Groups and events will have "subscribe" and "attend" toggle buttons.

[Details][phase-two]

### Phase 3: Viewing Group and Event Indices (~1 day)
I will add Backbone views for the group and event indices and index items. I
will also add toggle buttons to the group show view, event show view, and event
index item, enabling users to subscribe or unsubscribe to a group, and join or
leave events. I will need to create a frontend user model.

[Details][phase-three]

### Phase 4: Creating and Editing Groups and Events (~1 day)
I will create modal forms for groups and events. Filepicker will be integrated.
Filepicker will also be integrated with the user signup.

[Details][phase-four]

### Phase 5: Searching for Groups and Events (~2 days)
Finally, I will assemble the search composite view, creating a search bar that
separates searches for groups and events. The subviews will respond to input
immediately. This will be the landing page after a user logs in. (They will also
be able to access it with the nav logo.) When the input is empty, its default
group index view will show the user's subscribed groups, and its default event
index view will show the user's joined events. After login the user will see
their upcoming events.

[Details][phase-five]

### Phase 6: Frosting (4+ days)
Touch up code, seed data, style the UI, and implement bonus features!

### Bonus Features (TBD)
- [x] Original design, implemented in mostly custom CSS
- [x] Modal forms
- [x] Automatic search response to input
- [x] Slide in index items
- [x] Mouse reactivity
- [x] Upcoming events counter in nav
- [x] Home view counters and show view member/attender images update with toggles

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
