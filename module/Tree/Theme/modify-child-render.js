import React, { Component } from 'react';
import { Icon } from 'antd';
import PropTypes from 'prop-types';

export default class ModifyChildRender extends Component {
    static propTypes = {
        nodeData: PropTypes.object.isRequired,
        modifyTitleToggle: PropTypes.func.isRequired,
        modifyTitle: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.input = null;
        this.handleModifyTitle = this.handleModifyTitle.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        this.input.focus();
        this.setState({
            value: this.props.nodeData.title
        });
    }

    handleInputChange(event) {
        this.setState({
            value: event.target.value
        });
    }

    handleModifyTitle() {
        let { nodeData, modifyTitleToggle, modifyTitle } = this.props;

        modifyTitle(nodeData, this.state.value, modifyTitleToggle);
    }

    render() {
        let { modifyTitleToggle, nodeData } = this.props;

        return (
            <div className="modify-child">
                {nodeData.modifyStatus === 'loading' ? (
                    'loading...'
                ) : (
                    <input
                        type="text"
                        ref={input => (this.input = input)}
                        value={this.state.value}
                        onChange={this.handleInputChange}
                    />
                )}
                <span style={{ backgroundColor: '#adcaff', display: 'inline-block' }}>
                    <Icon
                        style={{ paddingLeft: 10 }}
                        type="check"
                        onClick={this.handleModifyTitle}
                    />
                    <Icon
                        type="close"
                        style={{ paddingLeft: 10, paddingRight: 10 }}
                        onClick={modifyTitleToggle}
                    />
                </span>
            </div>
        );
    }
}
