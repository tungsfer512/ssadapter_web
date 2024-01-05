import {Button, Card, Col, Form, Modal, Row, Space, Table} from 'antd';
import {PlusCircleOutlined} from "@ant-design/icons";
import {ColumnsType} from "antd/es/table";
import {IDataType} from "@/models/addClient/addClient";
import {useModel} from "@@/plugin-model/useModel";
import React, {useEffect} from "react";
import {history} from "@@/core/history";

const ServiceClients = (props: any) => {
  const clientId = props.path;
  const {data,
    isOpen,
    hideModal,
    showModal,
    addSubjectForm,
    handleAddSubsystem,
    formSubmiting,
    getClientServiceInfo} = useModel('Clients.serviceClients');

  useEffect(() => {
    getClientServiceInfo(clientId);
  }, [clientId]);

  const columns: ColumnsType<IDataType> = [
    {
      title: 'Member name / Group description',
      dataIndex: 'name',
      render: (val, rec) => {
        return (
          <>
            <a onClick={(event) => {
              history.push(`./service-clients/${rec.id}`);
            }}>
              {rec.name}
            </a>
          </>
        );
      }
    },
    {
      title: 'ID',
      dataIndex: 'id',
    },
  ];

  return (
    <>
      <div className="control-bar">
        <div>
        </div>
        <Button type="primary" shape="round" icon={<PlusCircleOutlined />} onClick={showModal}>Add subject</Button>
      </div>
      <Card bodyStyle={{ padding: '0px' }}>
        <Table columns={columns} dataSource={data} pagination={false}/>
      </Card>

      <Modal
        title='Add a subject'
        open={isOpen}
        onCancel={hideModal}
        okText="Add"
        cancelText="Cancel"
        className='hide-footer'
      >
        <Form style={{marginTop: '1rem'}}
              className='hide-bottom'
              form={addSubjectForm}
              onFinish={async (values) => handleAddSubsystem(values as any)}
        >
          <Row>
            <Col span={16}>
              <h2>
                Member Class
              </h2>
              <p>
                Code identifying the member class (e.g., government agency, private enterprise etc.).
              </p>
            </Col>
          </Row>

          <Space style={{width: '100%', justifyContent: 'flex-end'}}>
            <Button onClick={hideModal}>Cancel</Button>
            <Button type="primary" loading={formSubmiting} htmlType='submit'>Add subject</Button>
          </Space>
        </Form>
      </Modal>
    </>
  );
};

export default ServiceClients;
