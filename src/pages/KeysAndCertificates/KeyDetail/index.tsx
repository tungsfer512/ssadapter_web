import {Button, Card, Col, Form, Input, Modal, Row, Space} from 'antd';
import './style.less';
import {CloseOutlined, ExclamationCircleOutlined} from "@ant-design/icons";
import {useModel} from "@@/plugin-model/useModel";
import {useEffect} from "react";
import rules from "@/utils/rules";

const KeyDetail = (props: any) => {
  const id = props.match.params.id;
  const model = useModel('KeysAndCertificates.signInAuthKeys');

  useEffect(() => {
    model.getKeyDetail(id);
  }, [id]);

  const confirmDeleteKey = (keyId: string) => {
    Modal.confirm({
      title: 'Delete key?',
      icon: <ExclamationCircleOutlined/>,
      content: `Are you sure that you want to delete this key and all associated certificates from server configuration? `,
      okText: 'Yes',
      cancelText: 'Cancel',
      onOk: () => {
        model.deleteKey(keyId);
      }
    });
  };

  return (
    <Form form={model.renameKeyForm} onFinish={() => model.renameKey(id)}>
      <Card bodyStyle={{height: '100%'}}>
        <div className="control-bar">
          <h1>
            Key Details
          </h1>

          <Button type="text" onClick={() => {
            model.backToPreviousPage();
          }}>
            <CloseOutlined/>
          </Button>
        </div>
        <div className="control-bar">
          <div>
          </div>
          <Button shape="round" onClick={() => {
            confirmDeleteKey(id);
          }}>
            Delete
          </Button>
        </div>
        <Row>
          <Col span="12">
            <Form.Item rules={[...rules.required]} name="name">
              <Input placeholder="Name"/>
            </Form.Item>
          </Col>
          <Col span="12"/>
          <Col span="12">
            <h2>Key information</h2>
          </Col>
          <Col span="12"/>
          <Col span="12">
            <Row>
              <Col span={6}>
                Key ID:
              </Col>
              <Col span={18}>
                {model.keyInformation?.id}
              </Col>
              <Col span={6}>
                Label:
              </Col>
              <Col span={18}>
                {model.keyInformation?.label}
              </Col>
              <Col span={6}>
                Read-only:
              </Col>
              <Col span={18}>
                false
              </Col>
            </Row>
          </Col>
        </Row>
        <Space style={{justifyContent: 'flex-end', marginTop: '40px'}} className="fullWidth">
          <Button shape="round"
                  onClick={() => {
                    model.backToPreviousPage();
                  }}>
            Cancel
          </Button>
          <Button shape="round" type="primary" htmlType="submit">
            Save
          </Button>
        </Space>
      </Card>
    </Form>
  );
};

export default KeyDetail;
