"use strict";
import React from 'react'
import LinkedStateMixin from 'react-addons-linked-state-mixin'
import BigSubForm from './big-sub-form'
const { Component } = React;

const HelloLinkState = React.createClass({

    mixins : [LinkedStateMixin],

    displayName : 'HelloLinkState',

    onSubmit : function (event) {
        event.preventDefault();
        console.log(this.state);
    },

    getInitialState : function () {
        return {
            message : "",
            subform : {
                prop1 : "ici",
                prop2 : "ailleurs"
            },
            other : {prop1 : "riri", prop2 : "fifi"}
        }
    },

    changeSubForm2 : function (name) {
        return (function (newValue) {
            const newState = this.state;
            newState[name] = newValue;
            this.setState(newState);
        }).bind(this);
    },

    render : function () {
        return (
            <form onSubmit={this.onSubmit}>
                <label>Hello</label>
                <input type="text" valueLink={this.linkState('message')}/>
                <BigSubForm valueLink={this.linkState('subform')}/>
                <BigSubForm value={this.state.other} onChange={this.changeSubForm2('other')}/>
                <input type="submit"/>
            </form>
        )
    }
});

module.exports = HelloLinkState;