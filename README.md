<h1 align="center"> <a href="https://skid.rocks">skid.rocks</a> / <a href="https://skid.today">skid.today</a></h1>
<h3 align="center">Skid Today™ The worst Discord clone.</h1>

### Features
* **99.9% Discord Accuracy** (Looks and feels exactly like discord.)
* **No Paywalls** (Send animated gifs or vanity invite links with no fee.)
* **Multiple Domains** (Use the wide spread of domains to ensure access from anywhere!)
* **Never Works** (Heroku is a dogshit hosting site, do not use it.)

![image](https://user-images.githubusercontent.com/93608862/169815068-b7ffe23a-1eec-4d4e-b5cc-9e86d0a6b7e8.png)
![image](https://user-images.githubusercontent.com/93608862/169814722-9b15a685-d79b-4a62-a02d-a3ad87cd9b94.png)

### Install
* **Clone Repository** `gh repo clone ulnk/skid`
* **Install Dependencies** `yarn install` or `npm install`
* **Create .env file with <a href="https://www.mongodb.com/">MongoDB</a> database** `echo MONGODB=<url> > .env`
* **Start** `yarn start` or `node index.js`

### Libraries Used
* **React** (Frontend) <img alt="preview badge" src="https://img.shields.io/npm/v/react">
  * Redux Thunk
  * Axios
  * Router
  * Socket.io
  * Craco
* **Express** (Backend) <img alt="preview badge" src="https://img.shields.io/npm/v/express">
  * Socket.io
  * Cors
  * Mongoose (MongoDB)
  * Cookie Parser
  * Express Session

### Project Roadmap
* **Server Settings** (change name, icon, invite, etc.)
* ~~**Direct Messages** (this would include friends & invites)~~
* ~~**Server Member List** (roles, online & offline)~~
