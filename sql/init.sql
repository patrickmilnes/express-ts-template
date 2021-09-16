create database some_database;
create user api_user with password 'password';

\c some_database

create table some_table (
  id uuid primary key not null,
  name text not null
);

