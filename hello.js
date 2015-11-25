"use strict";
import React from 'react'
import LinkedStateMixin from 'react-addons-linked-state-mixin'
const { Component } = React;


const BigSubForm = React.createClass({

    mixins : [LinkedStateMixin],

    getValueLink : function (props) {
        return props.valueLink || {
                value : props.value,
                requestChange : props.onChange
            };
    },

    getInitialState : function () {
        return {
            prop1 : null,
            prop2 : null
        }
    },

    componentDidMount : function () {
        this.setState(this.getValueLink(this.props).value);
    },

    onChange : function (prop) {
        return {
            value : this.state[prop],
            requestChange : (function (newValue) {
                this.linkState(prop).requestChange(newValue);
                var newState = this.state;
                newState[prop] = newValue;
                this.props.valueLink.requestChange(newState);
            }).bind(this)
        };
    },

    render : function () {
        return (
            <div>
                <input type="text" valueLink={this.onChange('prop1')}/>
                <input type="text" valueLink={this.onChange('prop2')}/>
            </div>
        )
    }
});

const HelloLinkState = React.createClass({

    mixins : [LinkedStateMixin],

    onSubmit : function (event) {
        event.preventDefault();
        console.log(this.state);
    },

    getInitialState : function () {
        return {
            message : "",
            subform : {
                prop1 : "ici",
                prop2 : "ailleurs",
            }
        }
    },

    render : function () {
        return (
            <form onSubmit={this.onSubmit}>
                <label>Hello</label>
                <input type="text" valueLink={this.linkState('message')}/>
                <BigSubForm valueLink={this.linkState('subform')}/>
                <input type="submit"/>
            </form>
        )
    }
});

var ReactDOM = require('react-dom');

ReactDOM.render(<HelloLinkState/>, document.getElementById('example') );
