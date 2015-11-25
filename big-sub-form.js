"use strict";
import React from 'react'
import LinkedStateMixin from 'react-addons-linked-state-mixin'
const { Component } = React;

const BigSubForm = React.createClass({

    mixins : [LinkedStateMixin],

    displayName : 'BigSubForm',

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

    notifyParent : function (newState) {
        (this.props.valueLink ? this.props.valueLink.requestChange : this.props.onChange)(newState);
    },

    onChange : function (prop) {
        return {
            value : this.state[prop],
            requestChange : (function (newValue) {
                this.linkState(prop).requestChange(newValue);
                var newState = this.state;
                newState[prop] = newValue;
                this.notifyParent(this.state);
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

module.exports = BigSubForm;