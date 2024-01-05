import {Button, Card, Form, Modal, Space, Table} from 'antd';
import {ColumnsType} from "antd/es/table";
import {useModel} from "@@/plugin-model/useModel";
import {useEffect} from "react";
import {ExclamationCircleOutlined} from "@ant-design/icons";

const ServiceClients = (props: any) => {
  const clientId = props.match.params.id;
  const serviceId = props.match.params.serviceId;

  const {
    isOpen,
    hideModal,
    showModal,
    getMemberList,
    getAccessRightsList,
    memberList,
    accessRightsList,
    removeAccessRightItem,
    removeAllAccessRightItem,
    formSubmitting,
    rowSelection,
    getAllService
  } = useModel('Clients.detailServiceClient');

  const confirm = (serviceCode: string) => {
    Modal.confirm({
      title: 'Remove access rights?',
      icon: <ExclamationCircleOutlined/>,
      content: 'Are you sure you want to remove access rights from this service client? ',
      okText: 'Yes',
      cancelText: 'Cancel',
      onOk: () => {
        removeAccessRightItem(clientId, serviceId, serviceCode);
      }
    });
  };

  const confirmAll = () => {
    Modal.confirm({
      title: 'Remove access rights?',
      icon: <ExclamationCircleOutlined/>,
      content: 'Are you sure you want to remove all access rights from this service client? ',
      okText: 'Yes',
      cancelText: 'Cancel',
      onOk: () => {
        removeAllAccessRightItem(clientId, serviceId);
      }
    });
  };

  const memberNameColumns: ColumnsType<any> = [
    {
      title: 'Member name / Group description',
      dataIndex: 'name',
    },
    {
      title: 'ID',
      dataIndex: 'id',
    },
  ];

  const accessRightsColumn: ColumnsType<any> = [
    {
      title: 'Service code',
      dataIndex: 'service_code',
    },
    {
      title: 'Title',
    },
    {
      title: 'Access Rights Given',
      dataIndex: 'rights_given_at',
    },
    {
      title: '',
      render: (val, rec) => {
        return (
          <Button className={'button-action'} onClick={() => confirm(rec.service_code)} ghost
                  type="text">Remove</Button>
        );
      }
    },
  ];

  useEffect(() => {
    getMemberList(clientId, serviceId);
    getAccessRightsList(clientId, serviceId);
    getAllService(clientId);
  }, [clientId, serviceId]);

  return (
    <>
      <Card style={{maxWidth: '900px', margin: 'auto'}} bodyStyle={{padding: "0px"}}>
        <div className="control-bar" style={{paddingLeft: '20px', paddingBottom: '50px', paddingRight: '20px'}}>
          <h1>{clientId}</h1>
        </div>
        <Table columns={memberNameColumns} dataSource={memberList} pagination={false}/>
        <div className="control-bar"
             style={{paddingTop: '40px', paddingLeft: '20px', paddingBottom: '40px', paddingRight: '20px'}}>
          <h2>
            Access rights
          </h2>

          <Space style={{justifyContent: 'flex-end'}}>
            <Button shape="round" onClick={() => confirmAll()}>
              Remove all
            </Button>
            <Button shape="round" onClick={() => showModal()}>
              Add service
            </Button>
          </Space>
        </div>

        <Table columns={accessRightsColumn} dataSource={accessRightsList} pagination={false}/>
      </Card>

      <Modal
        title='Add a subject'
        open={isOpen}
        onCancel={hideModal}
        okText="Add"
        width={600}
        cancelText="Cancel"
        className='hide-footer'
      >
        <Table
          rowSelection={{
            type: 'Checkbox',
            ...rowSelection,
          }}
          columns={memberNameColumns}
          dataSource={memberList}
          pagination={false}/>

        <Space style={{width: '100%', justifyContent: 'flex-end', paddingTop: '20px'}}>
          <Button onClick={hideModal}>Cancel</Button>
          <Button type="primary" loading={formSubmitting} htmlType='submit'>Add subject</Button>
        </Space>
      </Modal>
    </>
  );
};

export default ServiceClients;
