<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## GraphQL Url

[https://nest-graphql-szdm.onrender.com/graphql](https://nest-graphql-szdm.onrender.com/graphql)

## Websocket Url

[wss://nest-graphql-szdm.onrender.com](wss://nest-graphql-szdm.onrender.com)



## Clone the repository

git clone [https://github.com/manlikehenryy/nest-graphql.git](https://github.com/manlikehenryy/nest-graphql.git)

## After cloning, navigate to the root directory

## Create a .env file, copy the content of example.env to the .env file

  cp example.env .env

## Set env variables

  ```bash
DB_HOST = your_database_url
```
```bash
DB_PORT = your_database_port
```
```bash
DB_USER = your_databse_username
```
```bash
DB_PASS = your_databse_password
```
```bash
DB_NAME = your_databse_name
```
```bash
JWT_SECRET = your_jwt_secret
```


## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

# GraphQL API

## Signup

### Mutation

    mutation SignUp {
      signUp(signUpInput: { username: "donald", password: "d12oo2" }) {
        id
        username
      }
    }


## Signin

### Mutation

    mutation SignIn {
      signIn(signInInput: { username: "donald", password: "d12oo2" }) {
        accessToken
        username
      }
    }

# WEBSOCKET

## joinRoom

### Request

    
    {
      "event": "joinRoom",
      "data": {
      "username": "John",
      "room": "General"
    }
    }


### Response

    { "event": "message", 
      "data": {
        "message": "John joined the room", 
        "username": "John",
        "room": "General"
        } 
    }

## leaveRoom

### Request

    
    {
      "event": "leaveRoom",
      "data": {
      "username": "John",
      "room": "General"
    }
    }


### Response

    { 
      "event": "message", 
      "data": {
        "message": "John left the room", 
        "username": "John",
        "room": "General"
        } 
    }


## sendMessage

### Request

    
    {
      "event": "sendMessage",
      "data": {
        "sender": "John",
        "text": "Hello, everyone!",
        "timestamp": "2025-02-24T12:34:56Z"
      }
    }


### Response

    {
      "event": "message",
      "data": {
      "sender": "John",
      "text": "Hello, everyone!",
      "timestamp": "2025-02-24T12:34:56Z",
      "createdAt": "2025-02-24T12:34:56Z"
    }
    }

## getMessages

### Request

    
    {
      "event": "getMessages",
      "data": {
        "sender": "John",
        "text": "Hello, everyone!",
        "timestamp": "2025-02-24T12:34:56Z"
      }
    }


### Response

    {
      "event": "messages",
      "data": [
        {
      "sender": "John",
      "text": "Hello, everyone!",
      "timestamp": "2025-02-24T12:34:56Z",
      "createdAt": "2025-02-24T12:34:56Z"
    }
    ]
    }
