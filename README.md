# Simple-Webchat-MQTT
A simple chat program to learn MQTT.  Uses a Node command line client as well as a browser webchat client.

Standalone simple web client written in React. Talks to a MQTT broker via MQTT.js calls.

## Pre-requisites
### MQTT
  - Install open source Mosquitto broker from the Eclipse foundation. https://mosquitto.org/download/
  - Also you can install the mosquitto tools.  This gives you a publisher and subscriber to use and test with.
### MQTT.js
  - The MQTT.js library is used for the javascript MQTT client.
### Node
  - Install node.

## Installation
 - cd to the webchat directory and enter: npm install
 - cd to the commandline chat directory and enter: npm install

## To Run
### commandline chat
  - cd to the commandline chat directory and enter: </br>
      node client -t <topic> -name <user-name> </br>
      then enter your message

### webchat
  - cd to the webchat directory and enter: </br>
    npm start </br>

    Runs the app in the development mode.  Open [http://localhost:3000](http://localhost:3000) to view it in the browser.</br>
    The page will reload if you make edits.  You will also see any lint errors in the console.</br>

    Once you are up and running, enter your broker and topic.  Press the connect button.</br>
    Enter the from, to and message.  Press the Send button.
