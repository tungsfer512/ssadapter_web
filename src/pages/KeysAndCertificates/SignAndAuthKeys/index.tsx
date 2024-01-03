import {Button, Card, Col, Collapse, Form, Input, Modal, Row, Space, Upload} from "antd";
import {
  CheckCircleOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  ImportOutlined,
  LogoutOutlined,
  PlusOutlined,
  ScheduleOutlined
} from "@ant-design/icons";
import {useModel} from "@@/plugin-model/useModel";
import {ICertificateSigning, ICertInfo, IkeyInfo, ITokenInfo} from "@/models/KeysAndCertificates/signInAuthKeys";
import KeyOutlined from "@ant-design/icons/KeyOutlined";
import {useEffect} from "react";
import AddKey from "@/components/AddKey/addKey";
import GenerateCsr from "@/components/GenerateCsr";

const {Panel} = Collapse;
const SignAndAuthKeys = () => {
  const model = useModel('KeysAndCertificates.signInAuthKeys');

  useEffect(() => {
    model.getTokenInfo();
  }, []);

  const genExtra = () => (
    <Space>
      <CheckCircleOutlined className={'text-success'}/>
      <strong>No issues</strong>
    </Space>
  );

  const confirmDeleteCsr = (certId: string, keyId: string) => {
    Modal.confirm({
      title: 'Delete CSR?',
      icon: <ExclamationCircleOutlined/>,
      content: `Are you sure that you want to delete this CSR? ?`,
      okText: 'Yes',
      cancelText: 'Cancel',
      onOk: () => {
        model.deleteCsr({keyId: keyId, csrId: certId});
      }
    });
  };

  const renderCertInfo = (certInfos: ICertInfo[]) => {
    return certInfos.map(
      certInfo => {
        return (
          <>
            <Row className={'table-row'}>
              <Col span={4}>
                <Space style={{paddingLeft: '30px'}} className={'text-primary'}>
                  <ScheduleOutlined />
                  <span>{certInfo.certificate_details.subject_common_name} {certInfo.certificate_details.serial}</span>
                </Space>
              </Col>
              <Col span={8}>
              </Col>
              <Col span={3}>
                <span>{certInfo.ocsp_status}</span>
              </Col>
              <Col span={3}>
                <span>{certInfo.certificate_details.not_after}</span>
              </Col>
              <Col span={3}>
                <strong>{certInfo.status}</strong>
              </Col>
              <Col span={3}>
              </Col>
            </Row>
          </>
        );
      }
    );
  };

  const renderCertSigning = (certSigning: ICertificateSigning[], keyId: string) => {
    return certSigning.map(
      certInfo => {
        return (
          <>
            <Row className={'table-row'}>
              <Col span={4}>
                <Space style={{paddingLeft: '30px'}}>
                  <ScheduleOutlined />
                  <span>Request</span>
                </Space>
              </Col>
              <Col span={17}>
                {certInfo.id}
              </Col>
              <Col span={3}>
                <Button type="text" ghost className="button-action" style={{float: "right"}} onClick={() => confirmDeleteCsr(certInfo.id, keyId)}>Delete CSR</Button>
              </Col>
            </Row>
          </>
        );
      }
    );
  };

  const renderKeyInfo = (keyInfos: IkeyInfo[]) => {
    return keyInfos.map(
      (keyInfo: IkeyInfo) => {
        return (
          <>
            <Row className={'table-row'}>
              <Col span={20}>
                <Space className={'text-primary'} style={{paddingLeft: '15px'}}>
                  <span><KeyOutlined/></span>
                  <span>{keyInfo.name}</span>
                </Space>
              </Col>
              <Col span={4}>
                <div style={{float: 'right'}}><Button onClick={() => {model.setIsOpenGenerateCsr(true);}} type='text' className={'button-action'}>Generate CSR</Button></div>
              </Col>
            </Row>
            {renderCertInfo(keyInfo.certificates)}
            {renderCertSigning(keyInfo.certificate_signing_requests, keyInfo.id)}
          </>
        );
      }
    );
  };

  const tokenDetailModal = () => {
    return (
      <Modal title={'Token details'}
             width={800}
             open={model.isOpenEditTokenModal}
             onCancel={() => model.setOpenEditTokenModal(false)}
             className='hide-footer'>
        <Row>
          <Col span={10}>
            <h3>Token information</h3>
            <Row>
              <Col span={12}>
                Token ID:
              </Col>
              <Col span={12}>
                0
              </Col>
              <Col span={12}>
                Type:
              </Col>
              <Col span={12}>
                SOFTWARE
              </Col>
            </Row>
          </Col>
          <Col span={14}>
            <Form>
              <Row>
                <Col span={24}>
                  <Form.Item name="keyLabel">
                    <Input placeholder="Friendly name"/>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item name="keyLabel">
                    <Input placeholder="Old pin"/>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item name="keyLabel">
                    <Input placeholder="New pin"/>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item name="keyLabel">
                    <Input placeholder="Confirm new pin"/>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Modal>
    );
  };

  const confirm = () => {
    Modal.confirm({
      title: 'Log out',
      icon: <ExclamationCircleOutlined/>,
      content: `Log out of the token? `,
      okText: 'Yes',
      cancelText: 'Cancel',
      onOk: () => {

      }
    });
  };

  return (
    <>
      <div className="control-bar">
        <h2>SIGN and AUTH Keys</h2>
      </div>

      {
        model.tokenInfo?.map((item: ITokenInfo) => {
          return (
            <>
              <Card>
                <div className="control-bar">
                  <h3 className={'text-primary'}>
                    <span>Token: {item.name} </span>
                    <Button type={"text"} shape="round" onClick={() => model.setOpenEditTokenModal(true)}><EditOutlined/></Button>
                  </h3>

                  <Space style={{justifyContent: 'flex-end'}}>
                    <Button shape="round" icon={<PlusOutlined/>} onClick={() => model.setOpenAddKeyModal(true)}>
                      Add key
                    </Button>
                    <Upload {...model.importCertProp}>
                      <Button shape="round" icon={<ImportOutlined/>}>
                        Import cert
                      </Button>
                    </Upload>
                    <Button shape="round" icon={<LogoutOutlined/>} onClick={() => confirm()}>
                      Logout
                    </Button>
                  </Space>
                </div>

                <Collapse>
                  <Panel className="no-padding" header="AUTH Keys and Certificates" key="1" extra={genExtra()}>
                    <div style={{padding: '16px'}}>
                      <Row>
                        <Col span={4}>
                          <strong>NAME</strong>
                        </Col>
                        <Col span={8}>
                          <strong>ID</strong>
                        </Col>
                        <Col span={3}>
                          <strong>OCSP</strong>
                        </Col>
                        <Col span={3}>
                          <strong>EXPIRES</strong>
                        </Col>
                        <Col span={3}>
                          <strong>STATUS</strong>
                        </Col>
                        <Col span={3}>
                        </Col>
                      </Row>
                      {renderKeyInfo(item.keys.filter(keyInfo => {return keyInfo.usage === "AUTHENTICATION";}))}
                    </div>
                  </Panel>
                  <Panel className="no-padding" header="SIGN Keys and Certificates" key="2" extra={genExtra()}>
                    <div style={{padding: '16px'}}>
                      <Row>
                        <Col span={4}>
                          <strong>NAME</strong>
                        </Col>
                        <Col span={8}>
                          <strong>ID</strong>
                        </Col>
                        <Col span={3}>
                          <strong>OCSP</strong>
                        </Col>
                        <Col span={3}>
                          <strong>EXPIRES</strong>
                        </Col>
                        <Col span={3}>
                          <strong>STATUS</strong>
                        </Col>
                        <Col span={3}>
                        </Col>
                      </Row>
                      {renderKeyInfo(item.keys.filter(keyInfo => {return keyInfo.usage === 'SIGNING';}))}
                    </div>
                  </Panel>
                </Collapse>
              </Card>
              {tokenDetailModal()}
              <AddKey model={model}/>
              <GenerateCsr model={model}/>
            </>
          );
        })
      }
    </>
  );
};

export default SignAndAuthKeys;
