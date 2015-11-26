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
        return {}
    },

    componentDidMount : function () {
        this.setState(this.getValueLink(this.props).value);
    },

    onChange : function (prop) {
        return {
            value : this.state[prop],
            requestChange : (function (newValue) {
                var newState = this.state;
                newState[prop] = newValue;
                this.getValueLink(this.props).requestChange(this.state);
            }).bind(this)
        };
    },

    render : function () {
        return (
            <div>
                <input type="text" valueLink={this.onChange('prop1')}/>
                <input type="text" value={this.state.prop2} onChange={this.onChange("prop2").requestChange}/>
            </div>
        )
    }
});

module.exports = BigSubForm;