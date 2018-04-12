import React, {Component} from 'react';
import './index.css';

class Form extends Component {

    constructor(){
        super();
        this.state = {
            name: '',
            message: ''
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.updateName = this.updateName.bind(this);
        this.updateMessage = this.updateMessage.bind(this);
    }
    onSubmit(){

        const{name, message} = this.state;
        this.props.onSend(name, message);
        this.setState({message: ""});
        document.getElementsByClassName("inputText")[0].value = "";
    }
    updateName(event){

        this.setState({name: event.target.value.trim()});
    }
    updateMessage(event){
        this.setState({message: event.target.value.trim()});
    }
    render() {
        return (

        <div className="messagePane-form">
            <div className="messagePane-form-container">
                <p>
                    <input  type="text" className="inputName" placeholder="Nickname"  onChange={this.updateName}/>
                </p>
                <p>
                    <textarea className="inputText" placeholder="Enter your text here..."    onChange={this.updateMessage}/>
                </p>
                <button onClick={this.onSubmit} className="sendButton">Send</button>
            </div>
        </div>

        )
    };
}

Form.defaultProps={
    onSend: () => {alert()}
};
export default Form;