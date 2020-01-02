import React, { Component } from 'react';
import logo from './assets/logo.png';
import './App.css';
import CreateMessage from './Message/CreateMessage.js';
import firebase from 'firebase';
import firebaseConfig from './config';

firebase.initializeApp(firebaseConfig);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      email: "",
      password: ""
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
    });
  }

  handleSignIn() {
    firebase.auth().signInWithEmailAndPassword(
      this.state.email, this.state.password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
  }

  handleSignUp() {
    firebase.auth().createUserWithEmailAndPassword(
      this.state.email, this.state.password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
  }

  handleLogOut() {
    firebase.auth().signOut();
  }

  updateEmailValue(evt) {
    this.setState({
      email: evt.target.value
    });
  }

  updatePasswordValue(evt) {
    this.setState({
      password: evt.target.value
    });
  }

  render() {
    return (
      <div className="app">
        <div className="app__header">
          <img src={logo} className="app__logo" alt="logo" />

          <h2>
            React + Firebase Demo Chatroom
          </h2>

          { !this.state.user ? (
            <div>
              <div className="input-area">
                <div className="input-row">
                  <label>Email</label>
                  <input
                    value={this.state.email} onChange={evt => this.updateEmailValue(evt)}
                  />
                </div>
                <div className="input-row">
                  <label>Password</label>
                  <input
                    value={this.state.password} onChange={evt => this.updatePasswordValue(evt)}
                  />
                </div>
              </div>

              <button
                className="app__button"
                onClick={this.handleSignIn.bind(this)}>
                Sign in
              </button>
              <button
                className="app__button"
                onClick={this.handleSignUp.bind(this)}>
                Sign Up
              </button>
            </div>

          ) : (

            <div>
              <h4>Welcome, {this.state.user.email}!</h4>
              <button
                className="app__button"
                onClick={this.handleLogOut.bind(this)}>
                Logout
              </button>
            </div>
          )}

        </div>

        <div className="app__list">
          <CreateMessage user={this.state.user} />
        </div>

        <div className="app__footer">
          <p>Source code available <a href="https://github.com/mfxuus/react-firebase-demo">here</a>. Michael F. Xu Demo Project.</p>
        </div>
      </div>
    );
  }
}
export default App;