import { Button, Card, Checkbox, Form, Input, Select, Tabs } from "antd";
import React from "react";

const { TabPane } = Tabs;

const PingTabBar = () => {
  const renderTabBar = (props, DefaultTabBar) => (
    <DefaultTabBar {...props} className="terminal-tab-bar" />
  );
  return (
    <Card>
      <Tabs defaultActiveKey="1" centered renderTabBar={renderTabBar}>
        <TabPane tab="Ping" key="1">
          <Form
            layout="vertical"
            size="middle"
            initialValues={{
              destinationIp: "10.6.50.4",
              originRouter: "singapore",
              originNode: "singapore",
              egressIterface: "wan0",
              requestSize: "56",
              timeout: "3",
              packetFragment: false,
            }}
          >
            <Form.Item
              name="destinationIp"
              label="Destination IP"
              rules={[
                {
                  required: true,
                  message: "Please input your destination IP!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="originRouter"
              label="Origin Router"
              rules={[
                {
                  required: true,
                  message: "Please select your origin router!",
                },
              ]}
            >
              <Select>
                <Select.Option value="">None</Select.Option>
                <Select.Option value="singapore">Singapore</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="originNode"
              label="Origin Node"
              rules={[
                {
                  required: true,
                  message: "Please select your origin node!",
                },
              ]}
            >
              <Select>
                <Select.Option value="">None</Select.Option>
                <Select.Option value="singapore">Singapore</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="egressIterface" label="Egress Interface">
              <Select>
                <Select.Option value="">None</Select.Option>
                <Select.Option value="wan0">wan0</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="gatewayIpAddress" label="Gateway IP Address">
              <Input />
            </Form.Item>
            <Form.Item
              name="requestSize"
              label="Request Size"
              rules={[
                {
                  required: true,
                  message: "Please select your request size!",
                },
              ]}
            >
              <Input suffix="Bytes" />
            </Form.Item>
            <Form.Item name="packetFragment" valuePropName="checked">
              <Checkbox>Prevent packet fragmentation</Checkbox>
            </Form.Item>
            <Form.Item name="timeout" label="Timeout">
              <Input suffix="Seconds" />
            </Form.Item>
            <Form.Item style={{ textAlign: "end" }}>
              <Button type="primary" htmlType="submit">
                Start
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane tab="Service Ping" key="2">
          Content of Service Ping works !
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default PingTabBar;
