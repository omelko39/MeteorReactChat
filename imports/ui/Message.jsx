import React, { Component, PropTypes } from 'react';

export default class Message extends Component {
    render() {
        return (
            <li>{this.props.msg.username} :    {this.props.msg.text}</li>
        );
    }
}

Message.propTypes = {
    msg: PropTypes.object.isRequired
};