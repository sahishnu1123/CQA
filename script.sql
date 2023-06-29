create table users(

    account_id serial primary key,
    display_name text not null,
    location text,
    about_me text,
    creation_date date not null,
    last_access_date date,
    password text not null
);

create table posts(

    post_id serial primary key,
    owner_id integer not null,
    last_editor_id integer,
    comments_count integer default 0,
    title text,
    tags int[],
    body text not null,
    creation_date date not null,
    last_edit_date date
);

create table comments(

    comment_id serial primary key,
    post_id integer not null,
    user_id integer not null,
    body text not null,
    creation_date date not null
);

create table votes(

    vote_id serial primary key,
    user_id integer not null,
    post_id integer not null,
    vote_type_id integer not null,
    creation_date date not null
);

create table tags(

    tag_id serial primary key,
    tag_name text not null,
    count integer default 0
);

