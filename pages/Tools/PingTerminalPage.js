import { Card, Col, Row } from "antd";
import React from "react";
import Terminal from "terminal-in-react";
import PingTabBar from "../../components/pingTerminal/PingTabBar";

const PingTerminalPage = () => {
  const showMsg = () => "Hello World";
  return (
    <Row gutter={[8, 16]}>
      <Col span={6}>
        <PingTabBar />
      </Col>
      <Col span={18}>
        <Card>
          <Terminal
            color="green"
            backgroundColor="black"
            barColor="black"
            startState="maximised"
            showActions={false}
            style={{
              fontWeight: "bold",
              fontSize: "1em",
            }}
            allowTabs={false}
            commands={{
              "open-google": () =>
                window.open("https://www.google.com/", "_blank"),
              showmsg: showMsg,
              popup: () => alert("Terminal in React"),
            }}
            descriptions={{
              "open-google": "opens google.com",
              showmsg: "shows a message",
              alert: "alert",
              popup: "alert",
            }}
            msg="You can write anything here. Example - Hello! My name is Foo and I like Bar."
          />
        </Card>
      </Col>
    </Row>
  );
};

export default PingTerminalPage;
