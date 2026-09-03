CREATE TABLE users (
id integer PRIMARY KEY AUTOINCREMENT,
email text not null unique,
user_name text not null,
password_hash text not null,
created_time datetime default CURRENT_TIMESTAMP
);

--creating the profile for the user, what they want to study, availible time etc,etc
CREATE TABLE profiles(
id integer PRIMARY KEY AUTOINCREMENT,
user_id integer unique references users(id) , -- the refernce goes to the users table and finds the id.
subject_studying text not null,
availible_time text not null,
bio text
);


--using match making to help people find the best study groups 
CREATE TABLE swipes (
id integer PRIMARY KEY AUTOINCREMENT,
swiper_id integer references users(id) not null,
target_id integer references users(id) not null,
decision text Check(decision in ('like', 'pass')) not null 
--the check syntax constraints the users decision to only like or pass.
);

CREATE TABLE matches (
id integer PRIMARY KEY AUTOINCREMENT,
user_a_id integer references users(id) not null,
user_b_id integer references users(id) not null,
matched_at datetime default CURRENT_TIMESTAMP
);

CREATE TABLE messages (
id integer PRIMARY KEY AUTOINCREMENT,
match_id integer references matches(id) not null,
sender_id integer references users(id) not null,
content text not null,
time_stamp datetime default CURRENT_TIMESTAMP
);