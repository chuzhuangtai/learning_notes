import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class TreeNode extends Component {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.element),
    nodeData: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    editable: PropTypes.bool.isRequired,
    activeNodeId: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    addChild: PropTypes.func,
    modifyTitle: PropTypes.func,
    deleteNode: PropTypes.func,
    changeActive: PropTypes.func,
    expandChildren: PropTypes.func,
    getNodeInfo: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {
      addChildHold: false,
      modifyTitleHold: false,
    }
    this.addChildToggle = this.addChildToggle.bind(this)
    this.modifyTitleToggle = this.modifyTitleToggle.bind(this)
  }

  addChildToggle(event) {
    this.setState((prevState) => ({addChildHold: !prevState.addChildHold}))
  }

  modifyTitleToggle(event) {
    this.setState(prevState => ({modifyTitleHold: !prevState.modifyTitleHold}))
  }

  render() {
    let {children, expandChildren, nodeData, editable, activeNodeId, modifyTitle, changeActive, deleteNode, addChild, getNodeInfo} = this.props,
    {addChildHold, modifyTitleHold} = this.state,
    {NodeContentRender, AddChildRender, ModifyChildRender} = this.props.theme

    return (
      <div className="tree-node">
        <div className="node-info">
          {
            modifyTitleHold 
              ? <ModifyChildRender
                  nodeData={nodeData}
                  modifyTitle={modifyTitle}
                  modifyTitleToggle={this.modifyTitleToggle}
                />
              : <NodeContentRender
                  nodeData={nodeData}
                  editable={editable}
                  expandChildren={expandChildren}
                  deleteNode={deleteNode}
                  changeActive={changeActive}
                  activeNodeId={activeNodeId}
                  addChildToggle={this.addChildToggle}
                  modifyTitleToggle={this.modifyTitleToggle}
                  getNodeInfo={getNodeInfo}
                />
          }
          {
            addChildHold 
              ? <AddChildRender
                  nodeData={nodeData}
                  addChild={addChild}
                  addChildToggle={this.addChildToggle}
                />
              : null
          }
        </div>
        {children}
      </div>
    )
  }
}
