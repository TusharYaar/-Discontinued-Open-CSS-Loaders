# Open CSS Loaders

## About

This is the application deployed on Digital Ocean's app platform.
The Structure of the application is:

- Node.js : Backend API
- MySQL : Database
- HTML/CSS/jQuery : Frontend

The aim of the project is to provide a number of css loaders for your web page, So you can concentrate on what matters the most.

---

## Instructions to Deploy to App Platform

[![Deploy to DO](https://mp-assets1.sfo2.digitaloceanspaces.com/deploy-to-do/do-btn-blue-ghost.svg)](https://cloud.digitalocean.com/apps/new?repo=https://github.com/TusharYaar/Open-CSS-Loaders/tree/master&refcode=db49dfda85b6)

You can use the Deploy to DigitalOcean button to deploy this repo directly to App Platform.

### Important Notes on Deployment

- Add a dev database when deploying
- make sure to add the environment variables when deploying the application

---

## Environment Variables

| Name              | Value              |
| ----------------- | ------------------ |
| DATABASE_URL      | ${db.DATABASE_URL} |
| DATABASE_PASSWORD | ${db.PASSWORD}     |
| DATABASE_USER     | ${db.USERNAME}     |
| DATABASE_NAME     | ${db.DATABASE}     |

## Local Deployment

First make sure you have node.js and Node Package Manager (npm) installed.

1. Clone the Repository by `git clone URL`
1. Run `npm install` to donwload all the required packages.
1. Create a .env file and add the Following values in it

```
DATABASE_URL = //url to your local MySQL server
DATABASE_PASSWORD = // Password in the database Eg. password
DATABASE_USER = // Username in the database    Eg. root
DATABASE_NAME = // Database You want to connect to   Eg. Flight Database
```

4. Run `node app.js` or `nodemon app.js` if you have nodemon installed.
1. Goto [localhost:3000](http://localhost:3000) to see the app working.
