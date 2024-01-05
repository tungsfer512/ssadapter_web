import {Button, Card, Col, Divider, Input, Modal, Row, Space, Spin} from "antd";
import KeyOutlined from "@ant-design/icons/KeyOutlined";
import {ExclamationCircleOutlined, ScheduleOutlined} from "@ant-design/icons";
import {useModel} from "@@/plugin-model/useModel";
import {useEffect} from "react";
import './style.less';

const SecurityServerTlsKey = () => {
  const model = useModel('KeysAndCertificates.securityServerTlsKey');

  const confirmGenerateKey = () => {
    Modal.confirm({
      title: 'Security Server TLS Key',
      icon: <ExclamationCircleOutlined/>,
      content: 'The system will generate a new Security Server TLS key and a self-signed certificate, replacing the existing key and certificate. ' +
        ' Security Server TLS key and certificate?',
      okText: 'Confirm',
      cancelText: 'Cancel',
      onOk: () => {
        model.generateKey();
      }
    });
  };

  useEffect(() => {
    model.getCertInfo();
  }, []);

  return (
    <>
      <div className="control-bar">
        <h2>Security Server TLS Key</h2>
        <Space>
          <Button shape="round" loading={model.generateKeyLoading} onClick={() => confirmGenerateKey()}>Generate
            key</Button>
          <Button shape="round">Import cert.</Button>
          <Button shape="round" loading={model.loadingExportCert} onClick={() => model.exportCert()}>Export
            cert.</Button>
        </Space>
      </div>

      <Spin spinning={model.getCertInfoLoading}>
        <Card>
          <p>
            TLS Key and Certificate
          </p>
          <Divider/>
          <div className={'flex-between'}>
            <Space>
              <KeyOutlined/>
              <span>Internal TLS Key</span>
            </Space>

            <Button className={'button-action'} ghost type="text" onClick={() => {model.setIsOpenGenerateTLSModal(true);}}>Generate CSR</Button>
          </div>
          <Divider/>
          <Space>
            <ScheduleOutlined/>
            <a onClick={() => model.setOpenCertInfoModal(true)}>
              {model.certInfo?.hash}
            </a>
          </Space>
        </Card>
      </Spin>

      <Modal
        visible={model.isOpenGenerateTLSModal}
        onCancel={() => model.setIsOpenGenerateTLSModal(false)}
        title="Generate TLS Certificate Signing Request"
        cancelText='Cancel'
        okText='Done'
        width={800}
      >
        1) First, provide a distinguished name
        <Row style={{marginTop: '40px'}}>
          <Col span={8}>
            <strong>Distinguished name</strong>
          </Col>
          <Col span={16}>
            <Input placeholder="CN=mysecurityserver.example.com, O=My Organization, C=CE"/>
          </Col>
        </Row>

        <div style={{marginTop: '40px'}} className={'flex-between'}>
          <span>2) Generate a new CSR and save it into a safe place</span>
          <Button shape="round">
            Generate CRS
          </Button>
        </div>
      </Modal>
      <Modal
        visible={model.isOpenCertInfoModal}
        onCancel={() => model.setOpenCertInfoModal(false)}
        footer={null}
        title="Certificate"
        width={800}
      >
        <div>
          <div>
            <p>
              Hash (SHA-1)
            </p>
            <p className='content'>
              {model.certInfo?.hash}
            </p>
          </div>

          <div className='certificate-info'>
            <p className='label'>
              Version:
            </p>
            <p className='content'>
              {model.certInfo?.version}
            </p>
          </div>
          <div className='certificate-info'>
            <p className='label'>
              Serial:
            </p>
            <p className='content'>
              {model.certInfo?.serial}
            </p>
          </div>
          <div className='certificate-info'>
            <p className='label'>
              Signature Algorithm:
            </p>
            <p className='content'>
              {model.certInfo?.signature_algorithm}
            </p>
          </div>
          <div className='certificate-info'>
            <p className='label'>
              Issuer Distinguished Name:
            </p>
            <p className='content'>
              {model.certInfo?.issuer_distinguished_name}
            </p>
          </div>
          <div className='certificate-info'>
            <p className='label'>
              Not Before:
            </p>
            <p className='content'>
              {model.certInfo?.not_before}
            </p>
          </div>
          <div className='certificate-info'>
            <p className='label'>
              Not After:
            </p>
            <p className='content'>
              {model.certInfo?.not_after}
            </p>
          </div>
          <div className='certificate-info'>
            <p className='label'>
              Subject Distinguished Name:
            </p>
            <p className='content'>
              {model.certInfo?.subject_alternative_names}
            </p>
          </div>
          <div className='certificate-info'>
            <p className='label'>
              Public Key Algorithm:
            </p>
            <p className='content'>
              {model.certInfo?.public_key_algorithm}
            </p>
          </div>
          <div className='certificate-info'>
            <p className='label'>
              RSA Public Key Modulus:
            </p>
            <p className='content'>
              {model.certInfo?.rsa_public_key_modulus}
            </p>
          </div>
          <div className='certificate-info'>
            <p className='label'>
              RSA Public Key Exponent:
            </p>
            <p className='content'>
              {model.certInfo?.rsa_public_key_exponent}
            </p>
          </div>
          <div className='certificate-info'>
            <p className='label'>
              Key Usages:
            </p>
            <p className='content'>
              {model.certInfo?.key_usages}
            </p>
          </div>
          <div className='certificate-info'>
            <p className='label'>
              Subject Alternative Names:
            </p>
            <p className='content'>
              {model.certInfo?.subject_alternative_names}
            </p>
          </div>
          <div className='certificate-info'>
            <p className='label'>
              Signature:
            </p>
            <p className='content'>
              {model.certInfo?.signature}
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SecurityServerTlsKey;
