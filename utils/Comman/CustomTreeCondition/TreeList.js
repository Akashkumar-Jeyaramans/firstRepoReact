import React, { useState } from 'react';
import {Tree} from 'antd'; 
const TreeList=(props)=>{

    return(
          
    <div>
      <Tree
      showIcon
        className="datatree"
        autoExpandParent={props.autoExpandParent}  
        onExpand={props.onExpand}
        expandedKeys={props.expand}
        treeData={props.data}
        >
      </Tree>
     </div>
        )
    }

export default TreeList;