Chatty App
=====================

A minimalitic chat app, with support to access the giphy.com API

# Setup
1. Clone from Github
2. Install all dependencies using npm install
3. 'cd' into 'chattyApp/chatty_server' and run 'npm start' to start the websocket server on localhost:3001
4. 'cd' into 'chattyApp/ and run 'npm start' to start the Chatty server on localhost:3000
5. Navigate to localhost:3000 and start chatting!!

## Features
### Giphy Chatbot
There is a very simple chat bot that will send a random giphy to the chat when any user sends the correct command. To activate the chat bot, type "\giphy" followed by a space and then a tag to filter the results. So for example: "\giphy pizza" would return a random pizza themed gif from Giphy.
!["Screenshot of \giphy chatbot"](https://github.com/imack5/chattyApp/blob/master/docs/Screen%20Shot%202018-05-18%20at%207.16.10%20PM.png?raw=true)
!["Result of the \giphy command"](https://github.com/imack5/chattyApp/blob/master/docs/Screen%20Shot%202018-05-18%20at%207.16.58%20PM.png?raw=true)

### User Experience
#### First arriving at the site
!["First arriving at the site"](https://github.com/imack5/chattyApp/blob/master/docs/Screen%20Shot%202018-05-18%20at%206.42.04%20PM.png?raw=true)

#### Username verification
Shows error on too short of a username.
!["Shows error"](https://github.com/imack5/chattyApp/blob/master/docs/Screen%20Shot%202018-05-18%20at%206.42.28%20PM.png?raw=true)

Shows success on a username of atleast 3 characters.
!["Shows success"](https://github.com/imack5/chattyApp/blob/master/docs/Screen%20Shot%202018-05-18%20at%206.42.21%20PM.png?raw=true)

#### Joining the chat
When a user first joins the chat their name is displayed and the "Users Online increases by 1"
!["User joined"](https://github.com/imack5/chattyApp/blob/master/docs/Screen%20Shot%202018-05-18%20at%206.42.43%20PM.png)

#### Messaging with other users
The chat appears differently depending on the user. The current user's messages show up on the right side of the screen and in a lighter green, whereas the other users show up on the left side and in white.
!["Shows conversations between two users"](https://github.com/imack5/chattyApp/blob/master/docs/Screen%20Shot%202018-05-18%20at%207.11.43%20PM.png?raw=true)

!["User chats"](https://github.com/imack5/chattyApp/blob/master/docs/Screen%20Shot%202018-05-18%20at%207.14.32%20PM.png?raw=true)

!["More user chats"](https://github.com/imack5/chattyApp/blob/master/docs/Screen%20Shot%202018-05-18%20at%207.14.17%20PM.png?raw=true)

#### User changing their name
When a user changes their name, the app displays a notification
!["User change name"](https://github.com/imack5/chattyApp/blob/master/docs/Screen%20Shot%202018-05-18%20at%207.15.20%20PM.png?raw=true)

#### Adding images to the chat
By having an image url anywhere in a message, you can display the image that it links to.
!["Adding images to chat"](https://github.com/imack5/chattyApp/blob/master/docs/Screen%20Shot%202018-05-18%20at%207.17.46%20PM.png?raw=true)

!["Result of adding image URL"](https://github.com/imack5/chattyApp/blob/master/docs/Screen%20Shot%202018-05-18%20at%207.18.00%20PM.png?raw=true)






## Dependencies
* babel-core
* babel-loader
* babel-preset-es2015
* babel-preset-react
* css-loader
* node-sass
* sass-loader
* style-loader
* webpack-dev-server
* React
* Webpack
* react-bootstrap
* Bootstrap V3.3.7
* React-DOM
* sockjs-client
* webpack
* node-fetch
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
