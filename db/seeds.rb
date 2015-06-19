User.create(username: "Black Widow", password: "supersecretpassword", photo_url: "http://res.cloudinary.com/dgzqgdlmj/image/upload/v1434228250/blackwidow_gyaoc1.jpg")
User.create(username: "Black Canary", password: "supersecretpassword", photo_url: "http://res.cloudinary.com/dgzqgdlmj/image/upload/v1434228252/blackcanary_tlim3x.jpg")
User.create(username: "Batgirl", password: "supersecretpassword", photo_url: "http://res.cloudinary.com/dgzqgdlmj/image/upload/v1434228251/batgirl_l5bizp.jpg")
User.create(username: "Batman", password: "supersecretpassword", photo_url: "http://res.cloudinary.com/dgzqgdlmj/image/upload/v1434228250/batman_s8jbos.jpg")
User.create(username: "Captain America", password: "supersecretpassword", photo_url: "http://res.cloudinary.com/dgzqgdlmj/image/upload/v1434228252/cap_qxltxj.jpg")
User.create(username: "Catwoman", password: "supersecretpassword", photo_url: "http://res.cloudinary.com/dgzqgdlmj/image/upload/v1434228252/catwoman_gaythe.jpg")
User.create(username: "Daredevil", password: "supersecretpassword", photo_url: "http://res.cloudinary.com/dgzqgdlmj/image/upload/v1434228252/daredevil_agjzu9.jpg")
User.create(username: "Deadpool", password: "supersecretpassword", photo_url: "http://res.cloudinary.com/dgzqgdlmj/image/upload/v1434228250/deadpool_lvk6zl.jpg")
User.create(username: "Elektra", password: "supersecretpassword", photo_url: "http://res.cloudinary.com/dgzqgdlmj/image/upload/v1434228253/elektra_vkxrzl.jpg")
User.create(username: "The Flash", password: "supersecretpassword", photo_url: "http://res.cloudinary.com/dgzqgdlmj/image/upload/v1434228251/flash_axct5j.jpg")
User.create(username: "Green Arrow", password: "supersecretpassword", photo_url: "http://res.cloudinary.com/dgzqgdlmj/image/upload/v1434229523/arrow_d84mta.jpg")
User.create(username: "Hawkeye", password: "supersecretpassword", photo_url: "http://res.cloudinary.com/dgzqgdlmj/image/upload/v1434229523/hawkeye_b8x3gy.jpg")
User.create(username: "The Hulk", password: "supersecretpassword", photo_url: "http://res.cloudinary.com/dgzqgdlmj/image/upload/v1434228252/hulk_v6gmy1.jpg")
User.create(username: "Invisible Woman", password: "supersecretpassword", photo_url: "http://res.cloudinary.com/dgzqgdlmj/image/upload/v1434228250/invisiblegirl_f5fkp3.jpg")
User.create(username: "Iron Man", password: "supersecretpassword", photo_url: "http://res.cloudinary.com/dgzqgdlmj/image/upload/v1434228250/ironman_uulv5r.jpg")
User.create(username: "Thor", password: "supersecretpassword", photo_url: "http://res.cloudinary.com/dgzqgdlmj/image/upload/v1434228252/thor_wpgzjs.jpg")
User.create(username: "Rogue", password: "supersecretpassword", photo_url: "http://res.cloudinary.com/dgzqgdlmj/image/upload/v1434228249/rogue_bdx4a7.jpg")
User.create(username: "Sif", password: "supersecretpassword", photo_url: "http://res.cloudinary.com/dgzqgdlmj/image/upload/v1434228249/sif_byx5s5.jpg")
User.create(username: "Spiderman", password: "supersecretpassword", photo_url: "http://res.cloudinary.com/dgzqgdlmj/image/upload/v1434228252/spiderman_kiw3if.jpg")
User.create(username: "Storm", password: "supersecretpassword", photo_url: "http://res.cloudinary.com/dgzqgdlmj/image/upload/v1434228251/storm_yut9dl.jpg")
User.create(username: "Supergirl", password: "supersecretpassword", photo_url: "http://res.cloudinary.com/dgzqgdlmj/image/upload/v1434228252/supergirl_qbuflw.jpg")
User.create(username: "Superman", password: "supersecretpassword", photo_url: "http://res.cloudinary.com/dgzqgdlmj/image/upload/v1434228253/superman_imxyvh.jpg")
User.create(username: "Wolverine", password: "supersecretpassword", photo_url: "http://res.cloudinary.com/dgzqgdlmj/image/upload/v1434228250/wolverine_golwaw.jpg")
User.create(username: "Wonder Woman", password: "supersecretpassword", photo_url: "http://res.cloudinary.com/dgzqgdlmj/image/upload/v1434228249/wonderwoman_ct9sxu.jpg")

# Iron Man
# Batman
# Thor

Group.create(name: "The Avengers", description: "We assemble. For battles, and parties.", creator: User.find_by({ username: "Captain America" }), photo_url: "http://res.cloudinary.com/dgzqgdlmj/image/upload/v1434228251/avengers_joeenr.jpg")
Group.create(name: "Asgardians", description: "The gods who guard the realms of men.", creator: User.find_by({ username: "Thor"}), photo_url: "http://res.cloudinary.com/dgzqgdlmj/image/upload/v1434228249/asgardians_bz0th0.jpg")
Group.create(name: "Antiheroes", description: "We're dark and brooding. Yeah.", creator: User.find_by({ username: "Batman"}), photo_url: "http://res.cloudinary.com/dgzqgdlmj/image/upload/v1434228253/antiheroes_hqjoha.jpg")
Group.create(name: "Billionaire Heroes", description: "The only thing bigger than our wallets is our egos.", creator: User.find_by({ username: "Iron Man"}), photo_url: "http://res.cloudinary.com/dgzqgdlmj/image/upload/v1434228251/billionaires_eudczj.jpg")
Group.create(name: "Gamers", description: "Because fictional fights can take the edge off the real ones. (And it's fun to play your teammates. I play Cap better than Cap does.)", creator: User.find_by({ username: "Deadpool"}), photo_url: "http://res.cloudinary.com/dgzqgdlmj/image/upload/v1434228251/gamers_vjvzj9.jpg")
Group.create(name: "I Have Powers Because Science", description: "Seems legit, right?", creator: User.find_by({ username: "Spiderman"}), photo_url: "http://res.cloudinary.com/dgzqgdlmj/image/upload/v1434235810/mutant_ucqzsi.jpg")
Group.create(name: "Potluckers", description: "Food to fuel your muscles, and friends to fuel your soul.", creator: User.find_by({ username: "Supergirl"}), photo_url: "http://res.cloudinary.com/dgzqgdlmj/image/upload/v1434235811/potluckers_u63tco.jpg")
Group.create(name: "Running Club", description: "Gotta stay in shape!", creator: User.find_by({ username: "Batgirl"}), photo_url: "http://res.cloudinary.com/dgzqgdlmj/image/upload/v1434228251/running_y4bqvm.jpg")
Group.create(name: "Superheroes in Tech", description: "Using innovative technology to look cool. Also to help people, but mostly to look cool.", creator: User.find_by({ username: "Iron Man"}), photo_url: "http://res.cloudinary.com/dgzqgdlmj/image/upload/v1434228252/superheroesintech_i9ioun.jpg")
Group.create(name: "X-Men", description: "Mutant and proud!", creator: User.find_by({ username: "Rogue"}), photo_url: "http://res.cloudinary.com/dgzqgdlmj/image/upload/v1434228249/xmen_hwpsch.jpg")

Event.create(group: Group.find_by({ name: "The Avengers"}), title: "Assembly", datetime: "2015-08-10 10:00:00-07", location: "Avengers HQ", description: "The enemy is here, we must assemble!")
Event.create(group: Group.find_by({ name: "The Avengers"}), title: "Epic CGI Battle", datetime: "2015-08-10 11:00:00-07", location: "New York", description: "Don't forget to bring your slow-motion effects.")
Event.create(group: Group.find_by({ name: "The Avengers"}), title: "After Party", datetime: "2015-08-10 20:00:00-07", location: "Avengers HQ", description: "Kick back after a hard round of world saving.")
Event.create(group: Group.find_by({ name: "The Avengers"}), title: "Training", datetime: "2015-09-20 10:00:00-07", location: "Nevada Desert", description: "A chance to hone our skills.")
Event.create(group: Group.find_by({ name: "The Avengers"}), title: "Teamwork Training", datetime: "2015-09-27 10:00:00-07", location: "Sierra Mountains", description: "Mostly for Stark.")

Event.create(group: Group.find_by({ name: "Asgardians"}), title: "Revels", datetime: "2015-06-09 20:00:00-07", location: "Asgard", description: "We will regale each other with stories of our glorious triumphs.")

Event.create(group: Group.find_by({ name: "Antiheroes"}), title: "Vigilante Dinner", datetime: "2015-08-10 20:00:00-07", location: "Wayne Manor", description: "Alternative to the party the Marvel kids are throwing.")

Event.create(group: Group.find_by({ name: "Billionaire Heroes"}), title: "Dinner", datetime: "2015-08-14 20:00:00-07", location: "Wayne Manor", description: "+1 allowed. Formal attire please, leave the costumes at home.")

Event.create(group: Group.find_by({ name: "Gamers"}), title: "Game Night", datetime: "2015-06-13 19:00:00-07", location: "Stark's House", description: "Lego Marvel")
Event.create(group: Group.find_by({ name: "Gamers"}), title: "Game Night", datetime: "2015-07-18 19:00:00-07", location: "Stark's House", description: "Ultimate Alliance")
Event.create(group: Group.find_by({ name: "Gamers"}), title: "Game Night", datetime: "2015-08-15 19:00:00-07", location: "Stark's House", description: "Mario Kart")
Event.create(group: Group.find_by({ name: "Gamers"}), title: "Game Night", datetime: "2015-09-19 19:00:00-07", location: "Stark's House", description: "Mortal Kombat vs. DC Universe")

Event.create(group: Group.find_by({ name: "Potluckers"}), title: "NY Potluck", datetime: "2015-07-18 13:00:00-07", location: "NY Central Park", description: "BYOP!")
Event.create(group: Group.find_by({ name: "Potluckers"}), title: "SF Potluck", datetime: "2015-07-25 13:00:00-07", location: "SF Golden Gate Park", description: "BYOP!")

Event.create(group: Group.find_by({ name: "Running Club"}), title: "Monday Run", datetime: "2015-08-10 07:00:00-07", location: "SF Ferry Building", description: "Barry, please stop coming to these. You're fast, we get it.")

Event.create(group: Group.find_by({ name: "Superheroes in Tech"}), title: "AI Development", datetime: "2015-08-10 06:00:00-07", location: "Avengers HQ / Stark Tower", description: "We think developing an AI with a moral compass sounds like a good idea. We can probably knock that out in a day.")

Event.create(group: Group.find_by({ name: "X-Men"}), title: "Graduation Setup", datetime: "2015-07-10 09:00:00-07", location: "Xavier School for Gifted Youngsters", description: "Today is an important day for these students. They finally get their costumes!")
Event.create(group: Group.find_by({ name: "X-Men"}), title: "Graduation Ceremony", datetime: "2015-07-10 11:00:00-07", location: "Xavier School for Gifted Youngsters", description: "Wolverine, if you want to help, stick with lifting heavy objects okay? We don't want any shredded certificates this year.")
Event.create(group: Group.find_by({ name: "X-Men"}), title: "Graduation Party", datetime: "2015-07-10 18:00:00-07", location: "Xavier School for Gifted Youngsters", description: "Congratulations grads!!")

Attending.create(event: Event.find_by({ title: "Assembly" }), user: User.find_by({ username: "Black Widow" }))
Attending.create(event: Event.find_by({ title: "Assembly" }), user: User.find_by({ username: "Captain America" }))
Attending.create(event: Event.find_by({ title: "Assembly" }), user: User.find_by({ username: "Hawkeye" }))
Attending.create(event: Event.find_by({ title: "Assembly" }), user: User.find_by({ username: "Iron Man" }))
Attending.create(event: Event.find_by({ title: "Assembly" }), user: User.find_by({ username: "Thor" }))

Attending.create(event: Event.find_by({ title: "Epic CGI Battle" }), user: User.find_by({ username: "Black Widow" }))
Attending.create(event: Event.find_by({ title: "Epic CGI Battle" }), user: User.find_by({ username: "Captain America" }))
Attending.create(event: Event.find_by({ title: "Epic CGI Battle" }), user: User.find_by({ username: "Hawkeye" }))
Attending.create(event: Event.find_by({ title: "Epic CGI Battle" }), user: User.find_by({ username: "The Hulk" }))
Attending.create(event: Event.find_by({ title: "Epic CGI Battle" }), user: User.find_by({ username: "Iron Man" }))
Attending.create(event: Event.find_by({ title: "Epic CGI Battle" }), user: User.find_by({ username: "Thor" }))
Attending.create(event: Event.find_by({ title: "Epic CGI Battle" }), user: User.find_by({ username: "Deadpool" }))
Attending.create(event: Event.find_by({ title: "Epic CGI Battle" }), user: User.find_by({ username: "Wolverine" }))
Attending.create(event: Event.find_by({ title: "Epic CGI Battle" }), user: User.find_by({ username: "Sif" }))
Attending.create(event: Event.find_by({ title: "Epic CGI Battle" }), user: User.find_by({ username: "Invisible Woman" }))
Attending.create(event: Event.find_by({ title: "Epic CGI Battle" }), user: User.find_by({ username: "Storm" }))
Attending.create(event: Event.find_by({ title: "Epic CGI Battle" }), user: User.find_by({ username: "Rogue" }))

Attending.create(event: Event.find_by({ title: "After Party" }), user: User.find_by({ username: "Black Widow" }))
Attending.create(event: Event.find_by({ title: "After Party" }), user: User.find_by({ username: "Captain America" }))
Attending.create(event: Event.find_by({ title: "After Party" }), user: User.find_by({ username: "Hawkeye" }))
Attending.create(event: Event.find_by({ title: "After Party" }), user: User.find_by({ username: "Iron Man" }))
Attending.create(event: Event.find_by({ title: "After Party" }), user: User.find_by({ username: "Thor" }))
Attending.create(event: Event.find_by({ title: "After Party" }), user: User.find_by({ username: "Deadpool" }))

Attending.create(event: Event.find_by({ title: "Teamwork Training" }), user: User.find_by({ username: "Captain America" }))

Attending.create(event: Event.find_by({ title: "Revels" }), user: User.find_by({ username: "Thor" }))
Attending.create(event: Event.find_by({ title: "Revels" }), user: User.find_by({ username: "Sif" }))

Attending.create(event: Event.find_by({ title: "Vigilante Dinner" }), user: User.find_by({ username: "Batman" }))
Attending.create(event: Event.find_by({ title: "Vigilante Dinner" }), user: User.find_by({ username: "Catwoman" }))
Attending.create(event: Event.find_by({ title: "Vigilante Dinner" }), user: User.find_by({ username: "Green Arrow" }))
Attending.create(event: Event.find_by({ title: "Vigilante Dinner" }), user: User.find_by({ username: "Deadpool" }))

Attending.create(event: Event.find_by({ title: "Dinner" }), user: User.find_by({ username: "Batman" }))
Attending.create(event: Event.find_by({ title: "Dinner" }), user: User.find_by({ username: "Iron Man" }))
Attending.create(event: Event.find_by({ title: "Dinner" }), user: User.find_by({ username: "Green Arrow" }))

Attending.create(event: Event.find_by({ title: "Game Night", datetime: "2015-06-13 19:00:00-07" }), user: User.find_by({ username: "Deadpool" }))
Attending.create(event: Event.find_by({ title: "Game Night", datetime: "2015-06-13 19:00:00-07" }), user: User.find_by({ username: "Iron Man" }))
Attending.create(event: Event.find_by({ title: "Game Night", datetime: "2015-06-13 19:00:00-07" }), user: User.find_by({ username: "Batgirl" }))
Attending.create(event: Event.find_by({ title: "Game Night", datetime: "2015-06-13 19:00:00-07" }), user: User.find_by({ username: "Hawkeye" }))
Attending.create(event: Event.find_by({ title: "Game Night", datetime: "2015-06-13 19:00:00-07" }), user: User.find_by({ username: "Spiderman" }))
Attending.create(event: Event.find_by({ title: "Game Night", datetime: "2015-06-13 19:00:00-07" }), user: User.find_by({ username: "Womder Woman" }))

Attending.create(event: Event.find_by({ title: "Game Night", datetime: "2015-07-18 19:00:00-07" }), user: User.find_by({ username: "Deadpool" }))
Attending.create(event: Event.find_by({ title: "Game Night", datetime: "2015-07-18 19:00:00-07" }), user: User.find_by({ username: "Captain America" }))
Attending.create(event: Event.find_by({ title: "Game Night", datetime: "2015-07-18 19:00:00-07" }), user: User.find_by({ username: "Spiderman" }))

Attending.create(event: Event.find_by({ title: "Game Night", datetime: "2015-08-15 19:00:00-07" }), user: User.find_by({ username: "Deadpool" }))
Attending.create(event: Event.find_by({ title: "Game Night", datetime: "2015-08-15 19:00:00-07" }), user: User.find_by({ username: "Iron Man" }))
Attending.create(event: Event.find_by({ title: "Game Night", datetime: "2015-08-15 19:00:00-07" }), user: User.find_by({ username: "Batman" }))
Attending.create(event: Event.find_by({ title: "Game Night", datetime: "2015-08-15 19:00:00-07" }), user: User.find_by({ username: "The Flash" }))
Attending.create(event: Event.find_by({ title: "Game Night", datetime: "2015-08-15 19:00:00-07" }), user: User.find_by({ username: "Supergirl" }))
Attending.create(event: Event.find_by({ title: "Game Night", datetime: "2015-08-15 19:00:00-07" }), user: User.find_by({ username: "Hawkeye" }))
Attending.create(event: Event.find_by({ title: "Game Night", datetime: "2015-08-15 19:00:00-07" }), user: User.find_by({ username: "Black Widow" }))

Attending.create(event: Event.find_by({ title: "Game Night", datetime: "2015-09-19 19:00:00-07" }), user: User.find_by({ username: "Deadpool" }))

Attending.create(event: Event.find_by({ title: "SF Potluck" }), user: User.find_by({ username: "Supergirl" }))
Attending.create(event: Event.find_by({ title: "SF Potluck" }), user: User.find_by({ username: "The Flash" }))
Attending.create(event: Event.find_by({ title: "SF Potluck" }), user: User.find_by({ username: "Thor" }))

Attending.create(event: Event.find_by({ title: "NY Potluck" }), user: User.find_by({ username: "Supergirl" }))
Attending.create(event: Event.find_by({ title: "NY Potluck" }), user: User.find_by({ username: "The Flash" }))
Attending.create(event: Event.find_by({ title: "NY Potluck" }), user: User.find_by({ username: "Batgirl" }))
Attending.create(event: Event.find_by({ title: "NY Potluck" }), user: User.find_by({ username: "Daredevil" }))
Attending.create(event: Event.find_by({ title: "NY Potluck" }), user: User.find_by({ username: "Elektra" }))
Attending.create(event: Event.find_by({ title: "NY Potluck" }), user: User.find_by({ username: "Black Canary" }))
Attending.create(event: Event.find_by({ title: "NY Potluck" }), user: User.find_by({ username: "Captain America" }))
Attending.create(event: Event.find_by({ title: "NY Potluck" }), user: User.find_by({ username: "Invisible Woman" }))
Attending.create(event: Event.find_by({ title: "NY Potluck" }), user: User.find_by({ username: "Spiderman" }))

Attending.create(event: Event.find_by({ title: "Monday Run" }), user: User.find_by({ username: "The Flash" }))
Attending.create(event: Event.find_by({ title: "Monday Run" }), user: User.find_by({ username: "Spiderman" }))
Attending.create(event: Event.find_by({ title: "Monday Run" }), user: User.find_by({ username: "Batgirl" }))

Attending.create(event: Event.find_by({ title: "AI Development" }), user: User.find_by({ username: "Iron Man" }))
Attending.create(event: Event.find_by({ title: "AI Development" }), user: User.find_by({ username: "The Hulk" }))

Attending.create(event: Event.find_by({ title: "Graduation Ceremony" }), user: User.find_by({ username: "Rogue" }))
Attending.create(event: Event.find_by({ title: "Graduation Ceremony" }), user: User.find_by({ username: "Storm" }))
Attending.create(event: Event.find_by({ title: "Graduation Ceremony" }), user: User.find_by({ username: "Wolverine" }))

Attending.create(event: Event.find_by({ title: "Graduation Party" }), user: User.find_by({ username: "Rogue" }))
Attending.create(event: Event.find_by({ title: "Graduation Party" }), user: User.find_by({ username: "Storm" }))
Attending.create(event: Event.find_by({ title: "Graduation Party" }), user: User.find_by({ username: "Wolverine" }))
Attending.create(event: Event.find_by({ title: "Graduation Party" }), user: User.find_by({ username: "Deadpool" }))

Subscription.create(group: Group.find_by({ name: "The Avengers" }), user: User.find_by({ username: "Black Widow" }))
Subscription.create(group: Group.find_by({ name: "The Avengers" }), user: User.find_by({ username: "Captain America" }))
Subscription.create(group: Group.find_by({ name: "The Avengers" }), user: User.find_by({ username: "Hawkeye" }))
Subscription.create(group: Group.find_by({ name: "The Avengers" }), user: User.find_by({ username: "The Hulk" }))
Subscription.create(group: Group.find_by({ name: "The Avengers" }), user: User.find_by({ username: "Iron Man" }))
Subscription.create(group: Group.find_by({ name: "The Avengers" }), user: User.find_by({ username: "Thor" }))


Subscription.create(group: Group.find_by({ name: "Asgardians" }), user: User.find_by({ username: "Thor" }))
Subscription.create(group: Group.find_by({ name: "Asgardians" }), user: User.find_by({ username: "Sif" }))

Subscription.create(group: Group.find_by({ name: "Antiheroes" }), user: User.find_by({ username: "Batman" }))
Subscription.create(group: Group.find_by({ name: "Antiheroes" }), user: User.find_by({ username: "Green Arrow" }))
Subscription.create(group: Group.find_by({ name: "Antiheroes" }), user: User.find_by({ username: "Deadpool" }))
Subscription.create(group: Group.find_by({ name: "Antiheroes" }), user: User.find_by({ username: "Catwoman" }))
Subscription.create(group: Group.find_by({ name: "Antiheroes" }), user: User.find_by({ username: "Black Canary" }))

Subscription.create(group: Group.find_by({ name: "Billionaire Heroes" }), user: User.find_by({ username: "Batman" }))
Subscription.create(group: Group.find_by({ name: "Billionaire Heroes" }), user: User.find_by({ username: "Green Arrow" }))
Subscription.create(group: Group.find_by({ name: "Billionaire Heroes" }), user: User.find_by({ username: "Iron Man" }))


Subscription.create(group: Group.find_by({ name: "Gamers" }), user: User.find_by({ username: "Deadpool" }))
Subscription.create(group: Group.find_by({ name: "Gamers" }), user: User.find_by({ username: "Iron Man" }))
Subscription.create(group: Group.find_by({ name: "Gamers" }), user: User.find_by({ username: "Batgirl" }))
Subscription.create(group: Group.find_by({ name: "Gamers" }), user: User.find_by({ username: "Hawkeye" }))
Subscription.create(group: Group.find_by({ name: "Gamers" }), user: User.find_by({ username: "The Flash" }))

Subscription.create(group: Group.find_by({ name: "I Have Powers Because Science" }), user: User.find_by({ username: "Spiderman" }))
Subscription.create(group: Group.find_by({ name: "I Have Powers Because Science" }), user: User.find_by({ username: "The Hulk" }))
Subscription.create(group: Group.find_by({ name: "I Have Powers Because Science" }), user: User.find_by({ username: "The Flash" }))
Subscription.create(group: Group.find_by({ name: "I Have Powers Because Science" }), user: User.find_by({ username: "Invisible Woman" }))
Subscription.create(group: Group.find_by({ name: "I Have Powers Because Science" }), user: User.find_by({ username: "Storm" }))
Subscription.create(group: Group.find_by({ name: "I Have Powers Because Science" }), user: User.find_by({ username: "Rogue" }))
Subscription.create(group: Group.find_by({ name: "I Have Powers Because Science" }), user: User.find_by({ username: "Wolverine" }))

Subscription.create(group: Group.find_by({ name: "Potluckers" }), user: User.find_by({ username: "Supergirl" }))
Subscription.create(group: Group.find_by({ name: "Potluckers" }), user: User.find_by({ username: "The Flash" }))

Subscription.create(group: Group.find_by({ name: "Running Club" }), user: User.find_by({ username: "The Flash" }))
Subscription.create(group: Group.find_by({ name: "Running Club" }), user: User.find_by({ username: "Black Canary" }))
Subscription.create(group: Group.find_by({ name: "Running Club" }), user: User.find_by({ username: "Captain America" }))
Subscription.create(group: Group.find_by({ name: "Running Club" }), user: User.find_by({ username: "Batgirl" }))


Subscription.create(group: Group.find_by({ name: "Superheroes in Tech" }), user: User.find_by({ username: "Iron Man" }))
Subscription.create(group: Group.find_by({ name: "Superheroes in Tech" }), user: User.find_by({ username: "Batman" }))

Subscription.create(group: Group.find_by({ name: "X-Men" }), user: User.find_by({ username: "Storm" }))
Subscription.create(group: Group.find_by({ name: "X-Men" }), user: User.find_by({ username: "Rogue" }))
Subscription.create(group: Group.find_by({ name: "X-Men" }), user: User.find_by({ username: "Wolverine" }))
