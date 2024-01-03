import {Button, Col, Form, Input, Modal, Row, Select, Space, Steps} from "antd";
import {useState} from "react";
import rules from "@/utils/rules";
import {useForm} from "antd/es/form/Form";

export default (prop: any) => {
  const [current, setCurrent] = useState<number>(0);
  const model = prop.model;
  const [step1Form] = useForm<any>();
  const [step2Form] = useForm<any>();

  const finishStep1Form = (valIn: any) => {

  };

  const step1 = () => {
    return (
      <Form form={step1Form} onFinish={async (values) => finishStep1Form(values)}>
        <Row gutter={[5, 5]}>
          <Col span={12}>
            <h3>Usage</h3>
            <p>Usage policy of the certificate: signing messages or authenticating Security Server.</p>
          </Col>
          <Col span={12}>
            <Form.Item name="usage" rules={[...rules.required]}>
              <Select></Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <h3>Certification Service</h3>
            <p>Certification Authority (CA) that will issue the certificate.</p>
          </Col>
          <Col span={12}>
            <Form.Item name="usage" rules={[...rules.required]}>
              <Select></Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <h3>CSR Format</h3>
            <p>Format of the certificate signing request according to the CA’s requirements.</p>
          </Col>
          <Col span={12}>
            <Form.Item name="usage" rules={[...rules.required]}>
              <Select></Select>
            </Form.Item>
          </Col>
        </Row>
        <Space style={{width: '100%', justifyContent: 'flex-end', marginTop: '20px'}}>
          <Button onClick={() => model.setIsOpenGenerateCsr(false)}>Cancel</Button>
          <Button htmlType="submit" type="primary">Continue</Button>
        </Space>
      </Form>
    );
  };

  const step2 = () => {
    return (
      <Form form={step2Form}>
        <Row gutter={[5, 5]}>
          <Col span={12}>
            <h3>Serial Number </h3>
          </Col>
          <Col span={12}>
            <Form.Item name="usage" rules={[...rules.required]}>
              <Input/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <h3>Country Code (C) </h3>
          </Col>
          <Col span={12}>
            <Form.Item name="usage" rules={[...rules.required]}>
              <Input/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <h3>Server DNS name (CN) </h3>
          </Col>
          <Col span={12}>
            <Form.Item name="usage" rules={[...rules.required]}>
              <Input/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <h3>Organization Name (O) </h3>
          </Col>
          <Col span={12}>
            <Form.Item name="usage" rules={[...rules.required]}>
              <Input/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <p>Generate a new CSR and save it into a safe place. </p>
          </Col>
          <Col span={12}>
            <Form.Item name="usage" rules={[...rules.required]}>
              <Button shape="round" type="primary" style={{float: "right"}}>
                Generate CSR
              </Button>
            </Form.Item>
          </Col>
        </Row>
        <Space style={{width: '100%', justifyContent: 'flex-end', marginTop: '20px'}}>
          <Button onClick={() => model.setIsOpenGenerateCsr(false)}>Cancel</Button>
          <Button onClick={() => setCurrent(current-1)}>Previous</Button>
          <Button onClick={() => model.setIsOpenGenerateCsr(false)} type="primary">Done</Button>
        </Space>
      </Form>
    );
  };

  const steps = [
    {
      title: '',
      content: step1(),
    },
    {
      title: '',
      content: step2(),
    }
  ];

  return (
    <>
      <Modal title={'Generate CSR'}
             width={800}
             open={model.isOpenGenerateCsr}
             onCancel={() => model.setIsOpenGenerateCsr(false)}
             className='hide-footer'>
        <Steps current={current} items={steps}/>
        <div className="steps-content">{steps[current].content}</div>
      </Modal>
    </>
  );
};
