import { UploadOutlined } from "@ant-design/icons/lib/icons";
import { Button, Card, Col, message, Row, Space, Upload } from "antd";
import React, { useState } from "react";
import florPlanImg from "../../assets/images/Floor-Plan.jpg";
import ImageMarker from "react-image-marker";

const FlorePlanPage = () => {
  const [imageUrlFlorePlan, setImageUrlFlorePlan] = useState(florPlanImg);
  const [lastSelected, setlastSelected] = useState([]);
  const [markers, setMarkers] = useState([
    {
      top: 10, //10% of the image relative size from top
      left: 50, //50% of the image relative size from left
    },
  ]);
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleOnChangeUpload = (info) => {
    if (info.file.status === "uploading") {
      console.log(info);
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImageUrlFlorePlan(imageUrl);
      });
    }
  };
  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };
  const handleClearAllSelection = () => {
    setMarkers([]);
    setlastSelected([]);
  };

  return (
    <Card>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Space>
            <Upload
              accept=".jpg, .jpeg, .png"
              beforeUpload={beforeUpload}
              showUploadList={false}
              onChange={handleOnChangeUpload}
              maxCount={1}
              customRequest={dummyRequest}
            >
              <Button type="primary" icon={<UploadOutlined />}>
                Upload Floor Image
              </Button>
            </Upload>
            <Button type="primary" onClick={handleClearAllSelection}>
              Clear
            </Button>
          </Space>
          <pre className="language-bash">
            {JSON.stringify(lastSelected, null, 2)}
          </pre>
        </Col>
        <Col span={24}>
          <ImageMarker
            src={imageUrlFlorePlan}
            markers={markers}
            onAddMarker={(marker) => {
              setMarkers([...markers, marker]);
              setlastSelected([marker]);
            }}
            extraClass="flore-image-class"
          />
        </Col>
      </Row>
    </Card>
  );
};

export default FlorePlanPage;
