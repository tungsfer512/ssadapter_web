import {Button, Card, Col, Form, Input, Row, Select, Space} from 'antd';
import {useModel} from "@@/plugin-model/useModel";
import rules from "@/utils/rules";
import React from "react";

const AddClientStep4 = () => {
  const model = useModel('addClient.addClient');

  const csrFormatOption = [
    {
      label: 'PEM',
      value: 'PEM'
    },
    {
      label: 'DER',
      value: 'DER'
    }
  ];

  return (
    <Form form={model.step4Form} onFinish={async (values) => model.submitStep4Form(values)}>
      <Card>
        <Row>
          <Col span={16}>
            <h2>
              Usage
            </h2>
            <p>
              Usage policy of the certificate: signing messages or authenticating Security Server.
            </p>
          </Col>
          <Col span={8}>
            <Form.Item name="usage" rules={[...rules.required]}>
              <Input disabled={true}/>
            </Form.Item>
          </Col>

          <Col span={16}>
            <h2>
              Client
            </h2>
            <p>
              X-Road member the certificate will be issued for.
            </p>
          </Col>
          <Col span={8}>
            <Form.Item name="client" rules={[...rules.required]}>
              <Input disabled={true}/>
            </Form.Item>
          </Col>

          <Col span={16}>
            <h2>
              Certification Service
            </h2>
            <p>
              Certification Authority (CA) that will issue the certificate.
            </p>
          </Col>
          <Col span={8}>
            <Form.Item name="certService" rules={[...rules.required]}>
              <Select className="fullWidth" options={model.certServices}/>
            </Form.Item>
          </Col>

          <Col span={16}>
            <h2>
              CSR Format
            </h2>
            <p>
              Format of the certificate signing request according to the CA’s requirements.
            </p>
          </Col>
          <Col span={8}>
            <Form.Item name="csrFormat" rules={[...rules.required]}>
              <Select className="fullWidth" options={csrFormatOption}/>
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

export default AddClientStep4;
