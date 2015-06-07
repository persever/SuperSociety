# Phase 2: Viewing Group and Event Shows

## Rails
### Models

### Controllers
Api::GroupsController (show)
Api::EventsController (show)

### Views
groups/show.json.jbuilder
events/show.json.jbuilder

## Backbone
### Models
* Group (parses nested `events` association)
* Event

### Collections
* Groups
* Events

### Views
* GroupShow (composite view, contains EventsIndex subview or EventShow subview)
* EventShow

## Gems/Libraries
