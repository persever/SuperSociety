# Phase 2: Viewing Group and Event Shows

## Rails
### Models

### Controllers
(Move GroupsController to) Api::GroupsController (show)
(Move EventsController to) Api::EventsController (show)

### Views

## Backbone
### Models
* Group (parses nested `events` association)
* Event
* Subscription
* Attending

### Collections
* Groups
* Events

### Views
* GroupShow (composite view, contains EventsIndex subview or EventShow subview)
* EventShow
* SubscriptionButton
* AttendingButton

## Gems/Libraries
