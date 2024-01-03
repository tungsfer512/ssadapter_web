import {Button, Card, Col, Form, Input, Row, Space} from 'antd';
import {useModel} from "@@/plugin-model/useModel";
import rules from "@/utils/rules";
import React from "react";

const AddClientStep5 = () => {
  const model = useModel('addClient.addClient');

	return (
    <Form form={model.step5Form} onFinish={async (values) => {model.submitStep5Form(values)}}>
      <Card>
        <Row>
          <Col span={16}>
            <h2>
              Member Code (CN)
            </h2>
          </Col>
          <Col span={8}>
            <Form.Item name="memberCode" rules={[...rules.required]}>
              <Input disabled={true}/>
            </Form.Item>
          </Col>

          <Col span={16}>
            <h2>
              Country Code (C)
            </h2>
          </Col>
          <Col span={8}>
            <Form.Item name="countryCode" rules={[...rules.required]}>
              <Input disabled={true}/>
            </Form.Item>
          </Col>

          <Col span={16}>
            <h2>
              Serial Number
            </h2>
          </Col>
          <Col span={8}>
            <Form.Item name="serialNumber" rules={[...rules.required]}>
              <Input disabled={true}/>
            </Form.Item>
          </Col>

          <Col span={16}>
            <h2>
              Organization Name (O)
            </h2>
          </Col>
          <Col span={8}>
            <Form.Item name="orgName" rules={[...rules.required]}>
              <Input/>
            </Form.Item>
          </Col>
        </Row>
      </Card>
      <Space style={{width: '100%', justifyContent: 'flex-end', marginTop: '20px'}}>
        <Button onClick={() => model.cancel()}>Cancel</Button>
        <Button onClick={model.prevStep}>Back</Button>
        <Button htmlType="submit" type="primary">Continue</Button>
      </Space>
    </Form>
	);
};

export default AddClientStep5;
