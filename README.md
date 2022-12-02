# OneHome Project

## What is it?

This project was made as part of the IPM (portuguese for Human-Computer Interaction) subject.

The objective was to create a functional prototype of an application that would help landlords
managing the houses they rent to other people.

## What does it do?

The system allows you to create and edit houses, add events to each house, manage their inventories
and also features a todo list for each one of them.

## Requirements

- NodeJS >= 18.X.X
- serve (installed via `npm install serve`)

## How do I run it?

To run the project on your machine, open two terminal instances, one on the `frontend` 
and the other on the `backend` folders.

On the `backend` folder, run `npm install` and `npm start`.
By default, the backend should be running on port `3000`.

On the `frontend` folder, there are two options:

- Run `npm install` and then `npm start`
- Run `npm run build` to build a deployment folder (may take a few minutes), 
and then use `serve -s build` to start the server and copy the url to a browser


**Note:** The backend already uses an existing database with a single user. You can use the username `admin` with
password `admin` to log in, or you can create a new account with your custom credentials.
The database doesn't possess any other object besides the user, so you'll have to create them yourself.