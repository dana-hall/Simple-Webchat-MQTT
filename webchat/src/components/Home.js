import React, { useState } from "react";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import MqttSetup from "./MqttSetup";

const Home = () => {
  
  let connectionDef = {
    client: null,
    broker: "",
    topic: ""
  }
  
  const [connection, setConnection] = useState(connectionDef);
  const [connected, setConnected] = useState(0);

  const subscribe = (connection) => {
    setConnection(connection);
    console.log(`Home:subscribe: Connection: Broker: ${connection.broker}, Topic: ${connection.topic}`);
    connection.client.subscribe(connection.topic, function (err) {
      if (err) {
        console.log("ERR: ", err.message);
      }
    })
    setConnected(Math.random());
  }

    return (
      <>
      <div className="container">
        <MqttSetup connection={connection} subscribe={subscribe} />
        <MessageInput connection={connection} />
        <Messages connection={connection} connected={connected}/>
      </div>
      </>
    );
};

export default Home;
