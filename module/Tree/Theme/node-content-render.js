import React, { Component } from 'react';
import { Icon } from 'antd';
import PropTypes from 'prop-types';
import './node-content-render.scss';

export default class NodeContentRender extends Component {
    static propTypes = {
        nodeData: PropTypes.object.isRequired,
        editable: PropTypes.bool.isRequired,
        expandChildren: PropTypes.func,
        deleteNode: PropTypes.func,
        changeActive: PropTypes.func,
        activeNodeId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        addChildToggle: PropTypes.func,
        modifyTitleToggle: PropTypes.func,
        getNodeInfo: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            iconHover: false
        };
    }

    hoverHandle(hoverStatus) {
        if (this.props.editable) {
            this.setState({
                iconHover: hoverStatus
            });
        }
    }

    componentWillMount() {
        let { expandChildren, nodeData } = this.props;
        if (window.location.pathname === '/knowledgeQuery/knowledge/lookmore/treelookmore/:tree') {
            if (
                nodeData.nodeParentId === '1' &&
                nodeData.children &&
                nodeData.children.length > 0
            ) {
                expandChildren(nodeData);
            }
        }
        if(window.location.pathname === '/lexicon/thesaurus'){
            if (
                nodeData.nodeParentId === '0' &&
                nodeData.children &&
                nodeData.children.length > 0
            ) {
                expandChildren(nodeData);
            }
        }
    }

    getActiveClassName() {
        let className = 'node-content';

        if (this.state.iconHover) {
            className += ' active';
        }

        if (this.props.activeNodeId + '' === this.props.nodeData.nodeId + '') {
            className += ' bg';
        }

        return className;
    }

    render() {
        let {
            expandChildren,
            nodeData,
            deleteNode,
            addChildToggle,
            modifyTitleToggle,
            getNodeInfo
        } = this.props;

        if (nodeData.deleteStatus === 'loading') {
            return 'deleting...';
        }
        return (
            <div
                className={this.getActiveClassName()}
                onMouseOver={e => this.hoverHandle(true)}
                onMouseOut={e => this.hoverHandle(false)}
            >
                {typeof nodeData.expanded === 'boolean' ? (
                    <Icon
                        type={nodeData.expanded ? 'down' : 'right'}
                        className="toggle-icon"
                        onClick={e => expandChildren(nodeData)}
                    />
                ) : null}
                <span
                    className="over"
                    onDoubleClick={e => typeof nodeData.expanded === 'boolean' ?expandChildren(nodeData):''}

                    onClick={() => {
                        this.props.changeActive(nodeData.nodeId);
                        getNodeInfo(nodeData);
                    }}
                    style={{ paddingRight: 10, fontSize: 16 }}
                >
                    {nodeData.title}
                </span>

                <span
                    style={{
                        backgroundColor: '#adcaff',
                        display: this.state.iconHover ? 'inline-block' : 'none'
                    }}
                    className={this.state.iconHover ? 'active' : ''}
                >
                    <Icon type="folder-add" onClick={addChildToggle} />
                    {nodeData.nodeParentId !== '0' && (
                        <Icon
                            type="delete"
                            style={{ marginLeft: 10 }}
                            onClick={() => deleteNode(nodeData)}
                        />
                    )}
                    <Icon type="edit" style={{ marginLeft: 10 }} onClick={modifyTitleToggle} />
                </span>
            </div>
        );
    }
}
