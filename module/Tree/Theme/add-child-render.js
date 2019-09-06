import React, { Component } from 'react';
import { Icon } from 'antd';
import PropTypes from 'prop-types';
import './add-child-render.scss';

export default class AddChildRender extends Component {
    static propTypes = {
        nodeData: PropTypes.object.isRequired,
        addChildToggle: PropTypes.func.isRequired,
        addChild: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.input = null;
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleAddChild = this.handleAddChild.bind(this);
    }

    componentDidMount() {
        this.input.focus();
    }

    handleInputChange(event) {
        this.setState({
            value: event.target.value
        });
    }

    handleAddChild() {
        let { nodeData, addChild, addChildToggle } = this.props,
            { value } = this.state;

        addChild(nodeData, { title: value });
        addChildToggle();
    }

    render() {
        let { addChildToggle } = this.props;

        return (
            <div className="add-child">
                <input
                    type="text"
                    ref={input => (this.input = input)}
                    value={this.state.value}
                    onChange={this.handleInputChange}
                />
                <span style={{ display: 'inline-block',backgroundColor:'#adcaff' }}>
                <Icon style={{ paddingLeft: 10 }} type="check" onClick={this.handleAddChild} />
                    <Icon
                        type="close"
                        style={{ paddingLeft: 10, paddingRight: 10 }}
                        onClick={addChildToggle}
                    />
                </span>
            </div>
        );
    }
}
