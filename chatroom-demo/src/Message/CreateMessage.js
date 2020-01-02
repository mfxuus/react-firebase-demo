import React, { Component } from 'react';
import './CreateMessage.css';
import Message from './Message';
import firebase from 'firebase';


export default class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      message: '',
      list: [],
    };

    this.messageRef = firebase.database().ref().child('messages');
    this.listenMessages();
  }

  handleChange(event) {
    this.setState({message: event.target.value});
  }

  handleSend() {
    if (this.state.message) {
      var newItem = {
        userName: this.props.user.email,
        message: this.state.message,
      }
      this.messageRef.push(newItem);
      this.setState({ message: '' });
    }
  }

  listenMessages() {
    this.messageRef
      .limitToLast(20)
      .on('value', message => {
        if (message.val()) {
          this.setState({
            list: Object.values(message.val()),
          });
        }
      });
  }

  render() {
    return (
      <div>
        {this.props.user ? 
          <div className="form">
            <div className="form__message">
              { this.state.list.map((item, index) =>
                <Message key={index} message={item} />
              )}
            </div>
            <div className="form__row">
              <input
                className="form__input"
                type="text"
                placeholder="Type message"
                value={this.state.message}
                onChange={this.handleChange.bind(this)}
              />
              <button
                className="form__button"
                onClick={this.handleSend.bind(this)}>
                Send
              </button>
            </div>
          </div>
        : <div className="form__row">
            <p>Sign In to enter the chat!</p>
          </div>
        }
      </div>
    );
  }
}