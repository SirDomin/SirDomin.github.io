import React, { Component } from 'react';
import './App.css';
import MessagePane from './MessagePane';
import { getMessages, saveMessage, onNewMessage, getDate } from './dbConnect/index';

class App extends Component {
    constructor(){
        super();
        this.state = {
            messages: []
        };
        this.onSendMessage = this.onSendMessage.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    componentDidMount(){
        getMessages().then(messages => this.setState({messages}));
        onNewMessage(new_message => {
            const messages = [...this.state.messages.reverse(), new_message].reverse();
            this.setState({messages});
        });
    }
    onSendMessage(name, message){
            if(!name||!message){
                alert("Nickname and message MUST be set");
                return;
            }
        var id;
        try{
            id = this.state.messages.reverse()[this.state.messages.length-1].id +1;
        }catch(err){
            console.log(err);
            id = 0;
        }

        const new_message = {
            id: id ,
            author: name,
            text: message
        };
        saveMessage(new_message);
        const messages = [...this.state.messages.reverse(), new_message].reverse();
        this.setState({messages});
    }
  render() {
    return (

      <div className="App">
          <MessagePane messages={this.state.messages} onSendMessage={this.onSendMessage}/>

      </div>
    );
  }
}

export default App;
