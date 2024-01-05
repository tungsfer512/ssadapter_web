import {Button, Card, Col, Form, Input, Row, Space} from 'antd';
import {useModel} from "@@/plugin-model/useModel";
import rules from "@/utils/rules";
import React from "react";

const AddClientStep3 = () => {
  const model = useModel('addClient.addClient');

	return (
    <Form form={model.step3Form} onFinish={async (values) => model.submitStep3Form(values)}>
      <Card>
        <Row>
          <Col span={16}>
            <h2>
              Key Label
            </h2>
            <p>
              You can define a label for the newly created SIGN key (not mandatory)
            </p>
          </Col>
          <Col span={8}>
            <Form.Item name="keyLabel" rules={[...rules.required]} >
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

export default AddClientStep3;
