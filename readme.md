# SuperSociety

[Live Demo][site]

[site]: http://supersociety.us

## Description

SuperSociety is a social event planning site for superheroes.

## Technologies

- [ ] Rails
- [ ] Ruby
- [ ] Backbone
- [ ] JavaScript
- [ ] jQuery
- [ ] HTML
- [ ] CSS
- [ ] Bootstrap

#Plan

## Minimum Viable Product
SuperSociety is a clone of Meetup built on Rails and Backbone. Users can:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [ ] Create accounts
- [ ] Create sessions (log in)
- [ ] Create groups
- [ ] Create events for the groups they created
- [ ] View groups and events
- [ ] Subscribe to and leave groups
- [ ] Join and leave events
- [ ] View their subscribed groups and upcoming events
- [ ] Search for groups by name, and for events by title and location

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

### Phase 2: Viewing Group and Event Shows (<1 day)
I will add API routes to serve group and event data as JSON, then add Backbone
models and collections that fetch data from those routes. The group show view
will be a composite view, and the event show view will be nested inside of that
group view. Excepting auth, the app will now be a single page Backbone app.

[Details][phase-two]

### Phase 3: Viewing Group and Event Indices (~1 day)
I will add Backbone views for the group and event indices and index items. I
will also add toggle buttons to the group show view, event show view, and event
index item, enabling users to subscribe or unsubscribe to a group, and join or
leave events. I will need to create a frontend user model.

[Details][phase-three]

### Phase 4: Creating and Editing Groups and Events (<1 day)
I will create modal forms for groups and events. Filepicker will be integrated.
Filepicker will also be integrated with the user signup.

[Details][phase-four]

### Phase 5: Searching for Groups and Events (~1 day)
Finally, I will assemble the search composite view, creating a search bar that
separates searches for groups and events. The subviews will respond to input
immediately. This will be the landing page after a user logs in. (They will also
be able to access it with the nav logo.) When the input is empty, its default
group index view will show the user's subscribed groups, and its default event
index view will show the user's joined events. After login the user will see
their upcoming events.

[Details][phase-five]

### Phase 6: Styling (3+ days)
Seed data. Logo. CSS, boosted with Bootstrap and Sass. Dimensionality.
Background. Reactive mouse. Fade effect for every main view container. Deletion
confirmation modal. Custom errors and 404 pages. Slide in event index items.
Autosize input fields.

### Bonus Features (TBD)
- [ ] Handle enter and esc keys on forms and search
- [ ] Infinite scroll
- [ ] FriendlyId
- [ ] Enable markdown in group and event descriptions
- [ ] User calendar
- [ ] Event comments
- [ ] User profiles that show the user's groups, past and upcoming events
- [ ] Create and search for groups and events with tags
- [ ] Add other users as group managers

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
