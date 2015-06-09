# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create(username: "Black Widow", password: "Black Widow")
User.create(username: "Captain America", password: "Captain America")
User.create(username: "Thor", password: "Thor")
User.create(username: "Loki", password: "Loki")
User.create(username: "Sif", password: "Loki")
User.create(username: "Odin", password: "Loki")
User.create(username: "Green Arrow", password: "Green Arrow")
User.create(username: "Green Lantern", password: "Green Lantern")
User.create(username: "Batman", password: "Batman")

Group.create(name: "The Avengers", description: "We assemble.", creator: User.find_by({ username: "Captain America" }))
Group.create(name: "Asgardians", description: "We are gods.", creator: User.find_by({ username: "Thor"}))
Group.create(name: "Antiheroes", description: "We're so dark and cool.", creator: User.find_by({ username: "Batman"}))

Event.create(group: Group.find_by({ name: "The Avengers"}), title: "Assembly", datetime: "2015-06-20 10:00:00+00", location: "Avengers HQ", description: "Aliens are attacking, we must assemble and avenge!")
Event.create(group: Group.find_by({ name: "The Avengers"}), title: "After Party", datetime: "2015-06-10 20:00:00+00", location: "Avengers HQ", description: "Kick back after a hard round of world saving.")
Event.create(group: Group.find_by({ name: "The Avengers"}), title: "Training", datetime: "2015-06-20 10:00:00+00", location: "Nevada Desert", description: "A chance to hone our skills.")
Event.create(group: Group.find_by({ name: "The Avengers"}), title: "Teamwork Training", datetime: "2015-06-20 10:00:00+00", location: "Sierra Mountains", description: "Mostly for Stark.")
Event.create(group: Group.find_by({ name: "Asgardians"}), title: "Ego Pump", datetime: "2015-06-09 08:00:00+00", location: "Asgard", description: "We will regale each other with stories of our glorious triumphs.")
