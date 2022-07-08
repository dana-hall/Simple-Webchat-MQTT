import "./Message.css";
import React from "react";
import { CreateRequestMessage } from '../dto/RequestMessage';

const MessageInput = ({ connection }) => {

  const clickHandler = () => {
    let msg = CreateRequestMessage(document.getElementById("from").value
          ,document.getElementById("to").value
          ,new Date().toString()
          ,document.getElementById("message").value);

    if(connection.client) {
      connection.client.publish(connection.topic, JSON.stringify(msg));    // send message to broker
    }

  }

  return (
    <div className="vertical-align">
      <div className="messageInput">
        <table id="messageInputTable">
          <tbody>
            <tr>
              <td>From: </td>
              <td>
                {/* <input id="from" className="input" type="text" placeholder="From" readOnly value="Dana"/> */}
                <input id="from" className="input" type="text" placeholder="From"/>
              </td>
            </tr>
            <tr>
              <td>To: </td>
              {/* <td><input id="to" className="input" type="text" placeholder="To" readOnly value="Fred"/></td> */}
              <td><input id="to" className="input" type="text" placeholder="To" /></td>
            </tr>
            <tr>
              <td>Message: </td>
              {/* <td><input id="message" className="input message" type="text" placeholder="Message" readOnly value="Let's go Brandon" /></td> */}
              <td><input id="message" className="input message" type="text" placeholder="Message" /></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="buttonWrapper">
        <button id="sendBtn" className="button sendBtn"
          onClick={clickHandler}>Send</button>
      </div>
    </div>
  );
};

export default MessageInput;
