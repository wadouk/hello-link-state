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

    render : function () {
        return (
            <form onSubmit={this.onSubmit}>
                <label>Hello</label>
                <input type="text" valueLink={this.linkState('message')}/>
                <BigSubForm valueLink={this.linkState('subform')}/>
                <BigSubForm value={this.linkState("other").value} onChange={this.linkState("other").requestChange}/>
                <input type="submit"/>
            </form>
        )
    }
});

module.exports = HelloLinkState;