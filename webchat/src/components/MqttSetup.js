import "./Message.css";
import React, { useState } from "react";
import mqtt from "mqtt";

const MqttSetup = ({ connection, subscribe }) => {
  
  // Constant for button label
  const BUTTON = {
    CONNECT: "Connect",
    DISCONNECT: "Disconnect"
  }

  const [buttonLabel, setButtonLabel] = useState(BUTTON.CONNECT);

  const clickHandler = () => {
    connection.broker = document.getElementById("broker").value;
    connection.topic = document.getElementById("topic").value;

    // Toggle the Connect/Disconnect button and client connection.
    if(buttonLabel === BUTTON.CONNECT) {
      setButtonLabel(BUTTON.DISCONNECT);
      connect(connection);
    }
    else {
      setButtonLabel(BUTTON.CONNECT);
      connection.client.end();
    }
  }

  const connect = (connection ) => {
    connection.client = mqtt.connect(`ws://${connection.broker}:9001`);
    connection.client.on('connect', function () {
      subscribe(connection);
    })
    connection.client.on('close', function () {
      console.log("connection is closed");
    })
    connection.client.on('error', function (error) {
      console.log("error on connection: " + error);
    })
  }

  return (
    <>
    <div className="vertical-align">
      <div className="messageInput">
        <table id="mqttSetupTable">
          <tbody>
            <tr>
              <td style={{width: '68px'}}>Broker:</td>
              <td>
                {/* <input id="broker" className="input" type="text" placeholder="Broker" readOnly value="localhost"/> */}
                <input id="broker" className="input" type="text" placeholder="Broker" />
              </td>
            </tr>
            <tr>
              <td>Topic: </td>
              {/* <td><input id="topic" className="input" type="text" placeholder="Topic" value="erie" readOnly/></td> */}
              <td><input id="topic" className="input" type="text" placeholder="Topic" /></td>
            </tr>
            <tr>
              <td style={{width: '68px'}}></td>
              <td>
                <div style={{paddingTop: '5px'}}>
                  <button id="connectBtn" className="button connectBtn"
                    onClick={clickHandler}>{buttonLabel}</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div style={{paddingTop: '15px'}}>
          <hr />
        </div>
      </div>
    </div>
    </>
  );
};

export default MqttSetup;
