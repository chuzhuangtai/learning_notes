import React from 'react';
import PropTypes from 'prop-types';
import {
  Select,
} from 'antd';


const Option = Select.Option;

function CustomSelectComponent(props) {
  return (
    <Select
      showSearch 
      className="select-block" 
      style={{ marginBottom: '13px' }} 
      placeholder={props.placeholder}
      allowClear={props.allowClear}
      value={props.value}
      onChange={(value) => props.handleChangeQuery(value)}
      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 }
    >
      {
        props.lists && props.lists.map(item => (
          <Option key={item.value} value={item.value}>{ item.label }</Option>
        ))
      }
    </Select>
  )
}

CustomSelectComponent.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value:PropTypes.node,
  handleChangeQuery: PropTypes.func.isRequired,
  lists: PropTypes.array || undefined,
  allowClear: PropTypes.bool || true
}

export default CustomSelectComponent;