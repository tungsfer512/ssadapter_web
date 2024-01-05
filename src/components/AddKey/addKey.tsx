import {Button, Col, Form, Input, Modal, Row, Select, Space, Steps} from "antd";
import {useEffect, useState} from 'react';
import {getCertServiceApi} from '@/services/KeyAndCertificateService/signAndAuthKeys';
import rules from '@/utils/rules';

const AddKey = (prop: any) => {
  const model = prop.model;
  const [current, setCurrent] = useState<number>(0);
  const [usageOptions] = useState([
    {label: 'SIGNING', value: 'SIGNING'},
    {label: 'AUTHENTICATION', value: 'AUTHENTICATION'}
  ]);
  const [CSRFormatOptions] = useState([
    {label: 'PEM', value: 'PEM'},
    {label: 'DER', value: 'DER'}
  ]);
  const [certService, setCertService] = useState();
  const [isUsageSigning, setIsUsageSigning] = useState<boolean>();

  const initStep2 = async (values: any) => {
    model.setValueStep1(values);
    setCurrent(current+1);
  };

  const initStep3 = async (values: any) => {
    model.setValueStep2(values);
    console.log(values);
    setCurrent(current+1);
  };

  const finishAddForm = async (values: any) => {
    model.setValueStep3(values);
  };

  useEffect(() => {
    getCertServiceApi().then(
      res => {
        const resData = res.data.data;
        if(resData) {
          setCertService(resData.map((item: any) => {
            return {
              label: item.name,
              value: item.name
            };
          }));
        }
      }
    );
  }, []);

  const changeUsageValue = (value: any) => {
    setIsUsageSigning(value == 'SIGNING');
  };

  const step1 = () => {
    return (
      <>
        field value is: {model.step1AddForm.getFieldValue('keyLabel')}
        <Form layout='vertical' form={model.step1AddForm} onFinish={async (values) => initStep2(values)}>
          <Row gutter={[5, 5]}>
            <Col span={12}>
              <h3>Key Label</h3>
              <p>You can define a label for the newly created SIGN key (not mandatory)</p>
            </Col>
            <Col span={12}>
              <Form.Item name="keyLabel">
                <Input placeholder="Key Label"/>
              </Form.Item>
            </Col>
          </Row>
          <Space style={{width: '100%', justifyContent: 'flex-end', marginTop: '20px'}}>
            <Button onClick={() => model.setOpenAddKeyModal(false)}>Cancel</Button>
            <Button htmlType='submit' type="primary">Continue</Button>
          </Space>
        </Form>
      </>
    );
  };

  const step2 = () => {
    return (
      <>
        <Form layout='vertical' form={model.step2AddForm}
              onFinish={async (values) => initStep3(values)}>
          <Row gutter={[5, 5]}>
            <Col span={12}>
              <h3>Usage</h3>
              <p>Usage policy of the certificate: signing messages or authenticating Security Server.</p>
            </Col>
            <Col span={12}>
              <Form.Item name="usage" rules={[...rules.required]}>
                <Select options={usageOptions} onChange={(value) => {changeUsageValue(value);}}/>
              </Form.Item>
            </Col>
            {
              isUsageSigning && (
                <>
                  <Col span={12}>
                    <h3>Client</h3>
                    <p>X-Road member the certificate will be issued for.</p>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="client" rules={[...rules.required]}>
                      <Select options={certService}/>
                    </Form.Item>
                  </Col>
                </>
              )
            }
            <Col span={12}>
              <h3>Certification Service</h3>
              <p>Certification Authority (CA) that will issue the certificate.</p>
            </Col>
            <Col span={12}>
              <Form.Item name="certService" rules={[...rules.required]}>
                <Select options={certService}/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <h3>CSR Format</h3>
              <p>Format of the certificate signing request according to the CA’s requirements.</p>
            </Col>
            <Col span={12}>
              <Form.Item name="CSRFormat" rules={[...rules.required]}>
                <Select options={CSRFormatOptions}/>
              </Form.Item>
            </Col>
          </Row>
          <Space style={{width: '100%', justifyContent: 'flex-end', marginTop: '20px'}}>
            <Button onClick={() => model.setOpenAddKeyModal(false)}>Cancel</Button>
            <Button onClick={() => setCurrent(current-1)}>Previous</Button>
            <Button htmlType='submit' type="primary">Continue</Button>
          </Space>
        </Form>
      </>
    );
  };

  const step3 = () => {
    return (
      <>
        <Form layout='vertical' form={model.step3AddForm} onFinish={async (values) => finishAddForm(values)}>
          <Row gutter={[5, 5]}>
            <Col span={12}>
              <h3>Member Code (CN) </h3>
            </Col>
            <Col span={12}>
              <Form.Item name="memberCode">
                <Input/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <h3>Serial Number </h3>
            </Col>
            <Col span={12}>
              <Form.Item name="serialNumber">
                <Input/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <h3>Country Code (C) </h3>
            </Col>
            <Col span={12}>
              <Form.Item name="countryCode">
                <Input/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <h3>Organization Name (O) </h3>
            </Col>
            <Col span={12}>
              <Form.Item rules={[...rules.required]} name="organizationName">
                <Input/>
              </Form.Item>
            </Col>
          </Row>
          <Space style={{width: '100%', justifyContent: 'flex-end', marginTop: '20px'}}>
            <Button onClick={() => model.setOpenAddKeyModal(false)}>Cancel</Button>
            <Button onClick={() => setCurrent(current-1)}>Previous</Button>
            <Button htmlType='submit' type="primary">Done</Button>
          </Space>
        </Form>
      </>
    );
  };


  const steps = [
    {
      title: 'Key details',
      content: step1(),
    },
    {
      title: 'CSR details',
      content: step2(),
    },
    {
      title: 'Generate CSR',
      content: step3(),
    },
  ];

  return (
    <>
      <Modal title={'Add key'}
             width={800}
             open={model.isOpenAddKeyModal}
             onCancel={() => model.setOpenAddKeyModal(false)}
             className='hide-footer'>
        <Steps current={current} items={steps}/>
        <div className="steps-content">{steps[current].content}</div>
      </Modal>
    </>
  );
};
export default AddKey;
