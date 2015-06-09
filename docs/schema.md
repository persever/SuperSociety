# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, unique
password_digest | string    | not null
session_token   | string    | not null, unique
filepicker_url  | string    |


## groups
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
creator_id      | integer   | not null, foreign key (references users)
name            | string    | not null, unique
description     | string    | not null
filepicker_url  | string    |

## events
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
group_id        | integer   | not null, foreign key (references groups)
title           | string    | not null
datetime        | datetime  | not null
location        | string    | not null
description     | string    | not null

##subscriptions
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
user_id         | integer   | not null, foreign key (references users)
group_id        | integer   | not null, foreign key (references groups)

##attendings
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
user_id         | integer   | not null, foreign key (references users)
event_id        | integer   | not null, foreign key (references events)
