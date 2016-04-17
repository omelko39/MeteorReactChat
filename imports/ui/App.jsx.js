import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom'
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import { Message } from '../api/message.js';
import Msg from './Message.jsx';
import { Meteor } from 'meteor/meteor'

class App extends Component {
    constructor(props){
        super(props)
        this.state = {location: "UA"}
    }

    handleSubmit(event) {
        event.preventDefault();
        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
        Message.insert({
            text,
            createdAt: new Date(),
            location: this.state.location,
            username: Meteor.user().username
        });


        ReactDOM.findDOMNode(this.refs.textInput).value = '';
    }

    changeLocation(event) {
        console.log(event.target.value);
        this.setState({location: event.target.value})
    }

    renderMessages() {
        return this.props.messages
            .filter(el => {return el.location === this.state.location})
            .map((msg) => (
            <Msg key={msg._id} msg={msg} />
        ));
    }

    render() {
        return (
            <div className="container">
                <header>
                    <h1>Chat App</h1>



                    <AccountsUIWrapper />

                    {this.props.currentUser ?
                        <label className="hide-completed">
                            <select onChange={this.changeLocation.bind(this)} value={this.state.location}>

                                <option value="UA">UA</option>
                                <option value="USA">USA</option>
                                <option value="UK">UK</option>

                            </select>
                        </label> : ''
                    }


                    {this.props.currentUser ?
                    <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
                        <input
                            type="text"
                            ref="textInput"
                            placeholder="Type"
                        />
                    </form>: ''
                    }
                </header>

                {this.props.currentUser ?<ul>
                    {this.renderMessages()}
                </ul>: ''}
            </div>
        );
    }
}

App.propTypes = {
    messages: PropTypes.array.isRequired,
};

export default createContainer(() => {
    return {
        messages: Message.find({}, { sort: { createdAt: -1 } }).fetch(),
        currentUser: Meteor.user()
    };
}, App);