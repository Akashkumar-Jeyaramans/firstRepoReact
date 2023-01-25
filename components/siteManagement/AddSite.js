import { Button , Form, Input, Col, Select, Card, Space } from 'antd';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { createTree, retrieveSite } from '../../features/treeSlice';

import '../../styles/pages/SiteManagement.css'

const { Option } = Select;

const AddSite = () => {
  const initialUserState = {
    name: "",
    hierarchy: "global/"+"",
    type:"",
    latitude:"",
    longitude:"",
    geolocation:""
  };

  const [tree, setTree] = useState(initialUserState);
  const [form] = Form.useForm();
  const [checked, setChecked] = useState(false);
  const [text, setText] = useState("");
  const [search, setSearch] = useState('');
  const [suggestion, setSuggestion] = useState([]);

  const sitesTree = useSelector(state => state.sitesTree);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveSite());
  }, []);

  let dataTree;
  for (var i = 0; i < sitesTree.length; i++) {
  const getHierarchy = sitesTree[i].hierarchy
  if (getHierarchy!=undefined){
  const filter = sitesTree.filter((data) => data.hierarchy.includes(search));
  dataTree = filter.map((data, i) => data.hierarchy);
  }
  }

  const handleInputChange = event => {
    const { name, value } = event.target;
    setTree({ ...tree, [name]: value });
  };

  const handleInputC = (event) => {
    const { name, value } = event.target;
    let matches =[]
    if (event.target.value.length>0){
      matches=dataTree.filter(user=>{
        const regex = new RegExp(`${{value}}`);
        return user.match(value)
      })
    }
    setSuggestion(matches)
    setTree({ ...tree, [name]: value });
  };

  const onSuggestHandler = (value)=>{
    setTree({...tree, hierarchy: value});
    setSuggestion([]);
  }

  function handleInput(e) { 
    setTree({...tree, type: e});
  }

  const saveTutorial = () => {
    const { name, hierarchy,type,latitude,longitude } = tree;

    dispatch(createTree({ name, hierarchy,type,latitude,longitude }))
      .unwrap()
      .then(data => {
        setTree({
          name: data.name,
          hierarchy: data.hierarchy,
          type:data.type,
          latitude:data.latitude,
          longitude:data.longitude,
        });
        form.resetFields();
      })
      .catch(e => {
      });
  };
 
  return (
    <>

 <Card bordered={true}>
    <Form 
      id='category-editor-form'
      form={form}
      onFinish={saveTutorial}
      onSubmit={saveTutorial}
      name="user"
      initialValues={{
        remember: true,
      }}
      autoComplete="off"
    >

        <div className='content'>
        <Form.Item
          label="Geolocation"
          name="geolocation"
        >
          <input
          name="checkbox"
          type="checkbox"
          checked={checked}
          onChange={() => {
                if(checked){
                  setText('')
                }
            setChecked(!checked)
              }
           }
        />
        </Form.Item>

        <div className='padding1'>
        <Form.Item
          label="Lat"
          name="latitude"
        >
        <div className='padding'>
          <Col span={10}>
         <Input value={tree.longitude} disabled={checked} onChange={handleInputChange}  name="longitude" placeholder="0.0"/>
          </Col>
        </div>
        </Form.Item>
        </div>

        <Form.Item
          label="Long"
          name="longitude"
        >   
        <div className='padding'>
          <Col span={10}>
          <Input value={tree.longitude} disabled={checked} onChange={handleInputChange}  name="longitude" placeholder="0.0"/>
          {/* <SearchOutlined /> */}
          </Col>
        </div> 
        </Form.Item>

        <Form.Item
          name="type"
          >
          <Select
            placeholder="Deployment method"
            value={tree.type}
            onChange={handleInput}
          >
            <Option value="draf">Draf</Option>
            <Option value="remote">Remote</Option>
            <Option value="direct">Direct</Option>
          </Select>
        </Form.Item>
        </div>

        <div className='content'>
        <Form.Item
          label="Hirarcy"
          name="hierarchy"
          rules={[
            {
              required: true,
              pattern: new RegExp(
                /^\global(\/[a-zA-Z0-9]+)*$/
              ),
              message: "Must contain global/location"
            }
          ]}
        >
        <div className='padding1'>
          <Input value={tree.hierarchy} defaultValue={tree} key={`${tree}` } onChange={handleInputC}  name="hierarchy"/>
          {suggestion && suggestion.map((suggestion, i) =>
          <div key={i} className='suggestion' onClick={()=>onSuggestHandler(suggestion)}>{suggestion}</div>
          )}
        </div>
        </Form.Item>
   
    
        <div className='padding'>
          <Form.Item
            label="Site Name"
            name="name"
          >
            <Input value={tree.name} onChange={handleInputChange}  name="name"/>
          </Form.Item>
          </div>

        <div className='padding2'>
        <Space>
          <Button type="primary" htmlType="submit" >
            Add
          </Button>
          <Button htmlType="submit">
          <Link to="/">Back</Link>
          </Button>
          </Space>
        </div>
        
        </div>
        </Form>
        </Card>
    </>
  
  );
};

export default AddSite;