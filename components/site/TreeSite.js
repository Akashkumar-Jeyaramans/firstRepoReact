import { Input, Card, Button } from 'antd'; 

import React from 'react';

import TreeList from '../../utils/Comman/CustomTreeCondition/TreeList';
import TreeConditon from '../../utils/Comman/CustomTreeCondition/CustomTreeCondition'

const { Search } = Input;

const TreeSite=()=>{

    return(
     
      <div className="myDemo">
      <Card bordered={true} >
      <Search
       className="searchBox"
       size="middle"
       allowClear
       placeholder="Search"
     />
      </Card>
      <Button block type="primary" htmlType="submit">Manage Site</Button>
      <Card bordered={true} >
      <TreeConditon/>
      <TreeList/>
      </Card>
      </div>

        )
    }

export default TreeSite;