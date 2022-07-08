import "./Message.css";
import React, { useEffect, useRef, useState } from "react";
import { CreateRequestMessage } from '../dto/RequestMessage';

const Messages = ({ connection, connected }) => {

  const [messages, setMessages] = useState([]);   // holds the message array of JSON objects
  const [rows, setRows] = useState([]);           // holds the messages formatted for display

  let myName = "";

  const onMessage = (connection ) => {
    connection.client.on('message', (topic, payload, packet) => {
      myName = document.getElementById("from").value;     // Get the from value from the DOM
      
      let msg = null;
      try {
        msg = JSON.parse(payload);
      }
      catch (err) {
        msg = CreateRequestMessage("unknown", "unknown", new Date().toString(), payload+"");
      }

      // Filter.  Only display message if myName equals from, to or unknown
      if(displayMessage(msg)) {
          messages.push(msg);
          setMessages(messages);
          setRows(formatMessages());
      }
    });
  }

  // Filter out messages
  const displayMessage = (msg) => {
    if(myName.length > 0 && msg.from.length > 0) {
      if(myName === "unknown" || myName === msg.from || myName === msg.to || msg.from === "unknown" || msg.to === "unknown") {
        return true;
      }
    }
    return false;
  }

  // Format the data for display 
  const formatDate = (date) => {
    let dt = new Date(date);

    let year = dt.getFullYear();
    let month = (dt.getMonth() + 1) < 10 ? "0" + (dt.getMonth() + 1) : dt.getMonth();
    let day = dt.getDate() < 10 ? "0" + dt.getDate() : dt.getDate();
    let hours = dt.getHours() < 10 ? "0" + dt.getHours() : dt.getHours();
    let minutes = dt.getMinutes() < 10 ? "0" + dt.getMinutes() : dt.getMinutes();
    let seconds = dt.getSeconds() < 10 ? "0" + dt.getSeconds() : dt.getSeconds();

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  // Format the messages for display
  const formatMessages = () => {
    let rows =[];
    if(messages.length > 0 ) {
      messages.map((msg, index) => {
        rows.push(
          <tr key={index}>
            <td className="colFrom">{msg.from}</td>
            <td className="colTo">{msg.to}</td>
            <td className="colDate">{formatDate(msg.date)}</td>
            <td>{msg.message}</td>
          </tr>
        );
      })
    }
    return rows;
  }

  useEffect(() => {
    if(connection && connection.client !== null) {
      onMessage(connection);
    }
  }, [connected]);

  return (
    <div id="messagesContainer">
      <div className="messagesTitle">
        <hr />
        <div className="container">
          <h3>Messages</h3>
        </div>
      </div>
      <table id="messagesTable" className="messagesTable">
        <tbody>
          {/* Suppress if no messages */}
          {messages.length > 0 ? (
            <tr>
              <th className="colFrom">From</th>
              <th className="colTo">To</th>
              <th className="colDate">Date</th>
              <th>Message</th>
            </tr>
          ) : 
            <tr><td className="noMessages">You have no messages</td></tr>
          }

          {rows}

        </tbody>
      </table>
    </div>
  );
};

export default Messages;
