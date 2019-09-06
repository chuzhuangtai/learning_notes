import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TreeNode from './TreeNode';
import theme from './Theme';
import './index.css';

let nodeCount = 0;

class Tree extends Component {
    static propTypes = {
        treeData: PropTypes.arrayOf(PropTypes.object).isRequired,
        expandAll: PropTypes.bool,
        editable: PropTypes.bool,
        initialActiveNodeId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        theme: PropTypes.object,
        asyncLoadNode: PropTypes.bool,
        addChildRequest: PropTypes.func,
        modifyTitleRequest: PropTypes.func,
        deleteNodeRequest: PropTypes.func,
        getChildRequest: PropTypes.func,
        getNodeInfo: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            treeData: this.expandActiveNodeAncestor(
                this.props.initialActiveNodeId,
                this.travelTree(this.props.treeData)
            ),
            activeNodeId: this.props.initialActiveNodeId
        };
        this.addChild = this.addChild.bind(this);
        this.modifyTitle = this.modifyTitle.bind(this);
        this.deleteNode = this.deleteNode.bind(this);
        this.expandChildren = this.expandChildren.bind(this);
        this.travelTree = this.travelTree.bind(this);
        this.expandActiveNodeAncestor = this.expandActiveNodeAncestor.bind(this);
        this.changeActive = this.changeActive.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            activeNodeId: nextProps.initialActiveNodeId
        })
        this.setState((prevState, props) => {
            return {
                treeData: this.expandActiveNodeAncestor(
                    prevState.activeNodeId,
                    this.travelTree(nextProps.treeData)
                )
            };
        });
    }

    travelTree(treeData, path = '') {
        treeData.map((nodeData, index) => {
            if (path === '') {
                nodeData.path = path + index;
            } else {
                nodeData.path = path + '-' + index;
            }

            if (typeof nodeData.isModifying === 'undefined') {
                nodeData.modifyStatus = 'pending';
            }

            if (typeof nodeData.isDeleting === 'undefined') {
                nodeData.deleteStatus = 'pending';
            }

            if (nodeData.children && nodeData.children.length > 0) {
                if (typeof nodeData.expanded === 'undefined') {
                    nodeData.expanded = this.props.expandAll;
                }
                this.travelTree(nodeData.children, nodeData.path);
            }

            nodeCount++;

            return nodeData;
        });

        return treeData;
    }

    // 对于默认活动的节点，自动展开其父节点
    expandActiveNodeAncestor(nodeId, treeData) {
        // 如果 expandAll 为 true, 那就什么也不做
        if (this.props.expandAll) return treeData;

        let path = this.getNodePropertyById(nodeId, 'path', treeData),
            pathArray = [],
            ancestorNodeIds = [];

        if (typeof path === 'string') {
            pathArray = path.split('-');
        }

        for (let i = pathArray.length - 1; i > 0; i--) {
            let ancestorPath = pathArray.slice(0, i).join('-');
            ancestorNodeIds.push(this.getNodeByPath(ancestorPath, treeData).nodeId);
        }

        for (let i = 0, len = ancestorNodeIds.length; i < len; i++) {
            this.setNodePropertyById(ancestorNodeIds[i], 'expanded', true, treeData);
        }

        return treeData;
    }

    getNodeByPath(path, treeData) {
        let pathArray = path.split('-'),
            node = null;

        for (let i = 0, len = pathArray.length; i < len; i++) {
            if (node === null) {
                node = treeData[parseInt(pathArray[i], 10)];
            } else {
                node = node.children[parseInt(pathArray[i], 10)];
            }
        }

        return node;
    }

    getNodePropertyById(nodeId, property, treeData) {
        let targetValue;

        function recursive(nodeId, property, treeData) {
            // 深度优先遍历，查找属性值
            for (let i = 0, len = treeData.length; i < len; i++) {
                if (targetValue !== undefined) break;

                if (treeData[i]['nodeId'] + '' === nodeId + '') {
                    targetValue = treeData[i][property];
                    return;
                }

                if (treeData[i]['children'] && treeData[i]['children'].length > 0) {
                    recursive(nodeId, property, treeData[i]['children']);
                }
            }
        }

        recursive(nodeId, property, treeData);

        return targetValue;
    }

    // Warn: 即使该节点原本没有要设置的 property，也会设置
    // Case：obj 并不存在 a 属性，设置后 obj 会新增 a 属性
    setNodePropertyById(nodeId, property, targetValue, treeData) {
        let modified = false;
        function recursive(nodeId, property, targetValue, treeData) {
            for (let i = 0, len = treeData.length; i < len; i++) {
                if (modified) break;
                if (treeData[i]['nodeId'] + '' === nodeId + '') {
                    treeData[i][property] = targetValue;
                    modified = true;
                    return;
                }
                if (treeData[i]['children'] && treeData[i]['children'].length > 0) {
                    recursive(nodeId, property, targetValue, treeData[i]['children']);
                }
            }
        }

        recursive(nodeId, property, targetValue, treeData);
        return modified;
    }

    changeActive(nodeId) {
        this.setState({
            activeNodeId: nodeId
        });
    }

    addChild(parentNode, newChildInfo) {
        let { addChildRequest } = this.props;

        if (addChildRequest) {
            addChildRequest(parentNode, newChildInfo).then(
                value => {
                    addLocal.bind(this)(parentNode, value);
                },
                error => {
                    console.error('Add Child Node Error!');
                }
            );
        } else {
            addLocal.bind(this)(parentNode, newChildInfo);
        }

        function addLocal(parentNode, newChildInfo) {
            let newChildNode;

            if (newChildInfo.nodeId) {
                newChildNode = newChildInfo;
            } else {
                newChildNode = {
                    nodeId: nodeCount + 1,
                    title: newChildInfo.title
                };
            }

            parentNode.children
                ? parentNode.children.push(newChildNode)
                : (parentNode.children = [newChildNode]);

            nodeCount = 0;
            this.travelTree(this.state.treeData);
            this.setState({
                treeData: this.state.treeData
            });
        }
    }

    modifyTitle(node, newTitle, callback) {
        let { modifyTitleRequest } = this.props;

        if (modifyTitleRequest) {
            let modifyPromise = modifyTitleRequest(node, newTitle);

            node.modifyStatus = 'loading';
            this.setState({
                treeData: this.state.treeData
            });

            modifyPromise.then(
                value => {
                    node.modifyStatus = 'fulfilled';
                    this.setState({
                        treeData: this.state.treeData
                    });
                    modifyLocal.bind(this)(node, newTitle);
                },
                error => {
                    node.modifyStatus = 'rejected';
                    this.setState({
                        treeData: this.state.treeData
                    });
                    console.error('Modify Node Title Error');
                }
            );
        } else {
            modifyLocal.bind(this)(node, newTitle);
        }

        function modifyLocal(node, newTitle) {
            node.title = newTitle;
            node.modifyStatus = 'pending';
            this.setState({
                treeData: this.state.treeData
            });
            callback();
        }
    }

    deleteNode(node) {
        let pathArray = node.path.split('-'),
            parentPathArray = pathArray.slice(0, pathArray.length - 1),
            parentPath = parentPathArray.join('-'),
            parentNode =
                parentPath !== ''
                    ? this.getNodeByPath(parentPath, this.state.treeData)
                    : this.state.treeData,
            { deleteNodeRequest } = this.props,
            deleteConfirm = window.confirm('确认删除该节点？');

        if (!deleteConfirm) {
            return;
        }

        if (deleteNodeRequest) {
            node.deleteStatus = 'loading';
            this.setState({
                treeData: this.state.treeData
            });
            deleteNodeRequest(node).then(
                value => {
                    node.deleteStatus = 'fulfilled';
                    this.setState({
                        treeData: this.state.treeData
                    });
                    deleteLocal.bind(this)(node, parentNode);
                },
                error => {
                    node.deleteStatus = 'rejected';
                    this.setState({
                        treeData: this.state.treeData
                    });
                    console.error('Delete Node Error.');
                }
            );
        } else {
            deleteLocal.bind(this)(node, parentNode);
        }

        function deleteLocal(node, parentNode) {
            // Does it have children?
            if (node.children) {
            }

            if (parentNode.children) {
                parentNode.children = parentNode.children.filter(nodeData => {
                    return nodeData.nodeId !== node.nodeId;
                });
                if (parentNode.children.length === 0) {
                    delete parentNode.children;
                    delete parentNode.expanded;
                }
            } else {
                // parentNode is root
                var newTreeData = parentNode.filter(nodeData => {
                    return nodeData.nodeId !== node.nodeId;
                });
            }

            nodeCount = 0;
            if (newTreeData) {
                this.travelTree(newTreeData);
                this.setState({
                    treeData: newTreeData
                });
            } else {
                this.travelTree(this.state.treeData);
                this.setState({
                    treeData: this.state.treeData
                });
            }
        }
    }

    expandChildren(node) {
        node.expanded = !node.expanded;
        this.setState({
            treeData: this.state.treeData
        });

        if (this.props.asyncLoadNode && this.props.getChildRequest) {
        }
    }

    recursiveRender(treeData) {
        return treeData.map(nodeData => {
            if (nodeData.children) {
                return (
                    <TreeNode
                        key={nodeData.nodeId}
                        nodeData={nodeData}
                        activeNodeId={this.state.activeNodeId}
                        theme={this.props.theme}
                        editable={this.props.editable}
                        getNodeInfo={this.props.getNodeInfo}
                        addChild={this.addChild}
                        changeActive={this.changeActive}
                        modifyTitle={this.modifyTitle}
                        deleteNode={this.deleteNode}
                        expandChildren={this.expandChildren}
                    >
                        {nodeData.expanded ? this.recursiveRender(nodeData.children) : null}
                    </TreeNode>
                );
            }

            return (
                <TreeNode
                    key={nodeData.nodeId}
                    nodeData={nodeData}
                    activeNodeId={this.state.activeNodeId}
                    theme={this.props.theme}
                    editable={this.props.editable}
                    getNodeInfo={this.props.getNodeInfo}
                    addChild={this.addChild}
                    changeActive={this.changeActive}
                    modifyTitle={this.modifyTitle}
                    deleteNode={this.deleteNode}
                    expandChildren={this.expandChildren}
                />
            );
        });
    }

    render() {
        return <div className="tree">{this.recursiveRender(this.state.treeData)}</div>;
    }
}

Tree.defaultProps = {
    expandAll: false,
    initialActiveNodeId: 0,
    theme,
    editable: true
};

export { Tree, TreeNode };
