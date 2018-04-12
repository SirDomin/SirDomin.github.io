import React from 'react';
import './index.css';
import Form from "./Form";


const Message = ({author, text}) => (
    <div className="message">
        <div className="message-author">{author}</div>
        <div className="message-text">{text}</div>
    </div>
);

const List = ({messages}) => (
    <div className="Message-pane-list">

        {messages.map(({id, author,text}) => <Message key={id} author = {author} text = {text}/> )}
    </div>
);
const MessagePane = ({messages, onSendMessage}) => (
    <div className="messagePane">
        <List messages = {messages}/>
        <Form onSend = {onSendMessage}/>
    </div>

);

export default MessagePane;