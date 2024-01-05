import {Button, Card, Col, Modal, Row, Space, Steps, Table} from "antd";
import {ExclamationCircleOutlined, PlusCircleOutlined} from "@ant-design/icons";
import {useModel} from "@/.umi/plugin-model/useModel";
import {useEffect} from "react";
import Checkbox from "antd/es/checkbox";
import './style.less';
import CopyOutlined from "@ant-design/icons/CopyOutlined";

const ApiKeys = () => {
  const apiKeysModels = useModel('KeysAndCertificates.ApiKeys');

  useEffect(
    () => {
      apiKeysModels.getListApiKeys();
    }, []
  );

  const step1 = (
    <>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <h3>Select roles</h3>
          <p>Please select the roles associated with the API key. The roles define the permissions granted to the API
            key. </p>
        </Col>
        <Col span={12}>
          <Checkbox.Group className='checkbox-vertical'
                          options={apiKeysModels.options}
                          onChange={apiKeysModels.changeSelectAddPermission}
                          defaultValue={apiKeysModels.listAddSelected}/>
        </Col>
      </Row>

      <div className="steps-action">
        <Button style={{margin: '0 8px'}} onClick={() => apiKeysModels.openAddModal(false)}>
          Cancel
        </Button>
        <Button type="primary" onClick={() => apiKeysModels.setCurrentTab(1)}
                disabled={!Boolean(apiKeysModels.listAddSelected.length > 0)}>
          Next
        </Button>
      </div>
    </>
  );

  const step2 = (
      <>
        <div>
          <div className="control-bar"
               style={{paddingBottom: '40px'}}>
            <h4>
              Key Details
            </h4>

            <Space style={{justifyContent: 'flex-end'}}>
              <Button shape="round"
                      loading={apiKeysModels.loadingGenerateKey}
                      disabled={apiKeysModels.keyDetail}
                      onClick={() => apiKeysModels.createKey()}>
                Create key
              </Button>
            </Space>
          </div>

          <Row gutter={[16, 16]}>
            <Col span={8}>
              <h3>API key </h3>
            </Col>
            <Col span={12}>
              <p>{apiKeysModels.keyDetail?.key}</p>
            </Col>
            <Col span={4}>
              {
                apiKeysModels.keyDetail?.key? (
                  <>
                    <Button
                      onClick={() => {navigator.clipboard.writeText(apiKeysModels.keyDetail.key)}}
                      type="text"
                      ghost
                      className='button-action'
                      icon={<CopyOutlined />}>
                      Copy
                    </Button>
                  </>
                ): (<></>)
              }
            </Col>
            <Col span={8}>
              <h3>API key ID </h3>
            </Col>
            <Col span={14}>
              <p>{apiKeysModels.keyDetail?.id}</p>
            </Col>
            <Col span={8}>
              <h3>Roles assigned </h3>
            </Col>
            <Col span={14}>
              <p>{apiKeysModels.keyDetail?.roles.map(
                (item: string) => {
                  if (item === 'XROAD_REGISTRATION_OFFICER') {
                    return 'Registration Officer';
                  } else if (item === 'XROAD_SECURITYSERVER_OBSERVER') {
                    return 'Server Observer';
                  } else if (item === 'XROAD_SERVICE_ADMINISTRATOR') {
                    return 'Service Administrator';
                  } else if (item === 'XROAD_SYSTEM_ADMINISTRATOR') {
                    return 'System Administrator';
                  } else if (item === 'XROAD_SECURITY_OFFICER') {
                    return 'Security Officer';
                  }
                  return '';
                }
              ).join(', ')}</p>
            </Col>
          </Row>

          <p>NOTE: save the API key in a secure place. The API key is visible only at the time of key generation. It will not be presented again and cannot be retrieved later. </p>
        </div>

        <div className="steps-action">
          <Button style={{}} onClick={() => apiKeysModels.openAddModal(false)}>
            Cancel
          </Button>
          <Button style={{margin: '0 8px'}} onClick={() => apiKeysModels.setCurrentTab(0)}>
            Previous
          </Button>
          <Button type="primary" onClick={() => apiKeysModels.openAddModal(false)}
                  disabled={!apiKeysModels.keyDetail}>
            Finish
          </Button>
        </div>
      </>
    )
  ;

  const steps = [
    {
      title: 'Roles',
      content: step1
    },
    {
      title: 'Key Details',
      content: step2,
    }
  ];

  const confirm = (keyId: number) => {
    Modal.confirm({
      title: 'Are you sure?',
      icon: <ExclamationCircleOutlined/>,
      content: `Are you sure you want to revoke the API key with ID ${keyId}? `,
      okText: 'Yes',
      cancelText: 'Cancel',
      onOk: () => {
        apiKeysModels.revokeKey(keyId);
      }
    });
  };

  const securityTlsColumn = [
    {
      title: 'Id',
      dataIndex: 'id',
    },
    {
      title: 'Roles',
      render: (val: any, rec: any) => {
        return (
          <>
            {val.roles.map(
              (item: string) => {
                if (item === 'XROAD_REGISTRATION_OFFICER') {
                  return 'Registration Officer';
                } else if (item === 'XROAD_SECURITYSERVER_OBSERVER') {
                  return 'Server Observer';
                } else if (item === 'XROAD_SERVICE_ADMINISTRATOR') {
                  return 'Service Administrator';
                } else if (item === 'XROAD_SYSTEM_ADMINISTRATOR') {
                  return 'System Administrator';
                } else if (item === 'XROAD_SECURITY_OFFICER') {
                  return 'Security Officer';
                }
                return '';
              }
            ).join(', ')}
          </>
        );
      }
    },
    {
      title: '',
      render: (val: any, rec: any) => {
        return (
          <Button className={'button-action'} ghost type="text"
                  onClick={() => apiKeysModels.openEditModal(rec)}>Edit</Button>
        );
      }
    },
    {
      title: '',
      render: (val: any, rec: any) => {
        return (
          <Button className={'button-action'} ghost type="text" onClick={() => confirm(rec.id)}>Revoke key</Button>
        );
      }
    },
  ];

  return (
    <>
      <>
        <div className="control-bar">
          <h2>API Keys </h2>
          <Button type="primary" shape="round" icon={<PlusCircleOutlined/>}
                  onClick={() => apiKeysModels.openAddModal(true)}>Create API key</Button>
        </div>

        <Card bodyStyle={{padding: '0px'}}>
          <Table columns={securityTlsColumn} dataSource={apiKeysModels.securityTlsData} loading={apiKeysModels.loadingTableApiKey}/>
        </Card>

        <Modal title={`Edit API Key (ID: ${apiKeysModels.selectedRow?.id}) `}
               open={apiKeysModels.isModalOpen}
               onOk={apiKeysModels.handleOk}
               onCancel={apiKeysModels.handleCancel}
               okText="Save"
               cancelText="Cancel"
               okButtonProps={{loading: apiKeysModels.loadingEditBtn}}>
          <p>Roles associated with the API key: </p>

          <Checkbox.Group className='checkbox-vertical'
                          options={apiKeysModels.options}
                          onChange={apiKeysModels.changeSelectPermission}
                          defaultValue={apiKeysModels.listSelected}/>
        </Modal>

        <Modal title={'Create API key'}
               width={800}
               open={apiKeysModels.isModalAddOpen}
               className='hide-footer' onCancel={() => apiKeysModels.openAddModal(false)}>
          <Steps current={apiKeysModels.current} items={steps}/>

          <div className="steps-content">{steps[apiKeysModels.current].content}</div>
        </Modal>
      </>
    </>
  );
};

export default ApiKeys;
