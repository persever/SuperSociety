# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150608194908) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "attendings", force: :cascade do |t|
    t.integer "user_id",  null: false
    t.integer "event_id", null: false
  end

  create_table "events", force: :cascade do |t|
    t.integer  "group_id",    null: false
    t.string   "title",       null: false
    t.date     "date",        null: false
    t.time     "time",        null: false
    t.string   "location",    null: false
    t.string   "description", null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "events", ["group_id", "title"], name: "index_events_on_group_id_and_title", using: :btree

  create_table "groups", force: :cascade do |t|
    t.integer  "creator_id",     null: false
    t.string   "name",           null: false
    t.string   "description",    null: false
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.string   "filepicker_url"
  end

  add_index "groups", ["name"], name: "index_groups_on_name", using: :btree

  create_table "subscriptions", force: :cascade do |t|
    t.integer "user_id",  null: false
    t.integer "group_id", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "username",        null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "filepicker_url"
  end

  add_index "users", ["username"], name: "index_users_on_username", using: :btree

end
