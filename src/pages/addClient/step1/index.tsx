import {Button, Card, Col, Form, Input, Modal, Row, Select, Space, Table} from 'antd';
import React from "react";
import rules from '@/utils/rules';
import {ColumnsType} from "antd/es/table";
import {useModel} from "@@/plugin-model/useModel";
import {IAddClientStep1Form, IDataType} from "@/models/addClient/addClient";

const AddClientStep1 = () => {
  const {
    step1Form,
    showModalSelectClient,
    onShowModalSelectClient,
    onSelectClient,
    onCancelModelSelectClient,
    submitStep1Form,
    listMemberClasses,
    cancel} = useModel('addClient.addClient');

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: IDataType[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
  };

  const columns: ColumnsType<IDataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Id',
      dataIndex: 'age',
    },
  ];


  return (
    <Form style={{marginTop: '1rem'}} form={step1Form} onFinish={async (values) => submitStep1Form(values as IAddClientStep1Form)}>
      <Card>
        <Row>
          <Col span={16}>
            <div>Specify the details of the Member you want to add.</div>
            <div>If the Member is already existing, you can select it from the Global list.</div>
          </Col>
          <Col span={8}>
            <Button shape="round" onClick={onShowModalSelectClient}>
              Select client
            </Button>
            <Modal title="Add client" open={showModalSelectClient} onOk={onSelectClient} onCancel={onCancelModelSelectClient}
                   bodyStyle={{padding: '0px'}}>
              <Table
                rowSelection={{
                  type: 'radio',
                  ...rowSelection,
                }}
                columns={columns}
                pagination={false}
              />
            </Modal>
          </Col>

          <Col span={16}>
            <h2>
              Member Name
            </h2>
            <p>
              Name of the member organization.
            </p>
          </Col>
          <Col span={8}>
            <Form.Item name='memberName'>
              <Input placeholder="Member Name" disabled={true}/>
            </Form.Item>
          </Col>

          <Col span={16}>
            <h2>
              Member Class
            </h2>
            <p>
              Code identifying the member class (e.g., government agency, private enterprise etc.).
            </p>
          </Col>
          <Col span={8}>
            <Form.Item name='memberClass' rules={[...rules.required]}>
              {/* eslint-disable-next-line react/jsx-no-undef */}
              <Select
                placeholder={'Member Class'}
                options={listMemberClasses}
              />
            </Form.Item>
          </Col>

          <Col span={16}>
            <h2>
              Member Code
            </h2>
            <p>
              Member code that uniquely identifies this X-Road member within its member class (e.g. business ID).
            </p>
          </Col>
          <Col span={8}>
            <Form.Item name='memberCode' rules={[...rules.required]}>
              <Input placeholder="Member Code"/>
            </Form.Item>
          </Col>

          <Col span={16}>
            <h2>
              Subsystem Code
            </h2>
            <p>
              Subsystem code that identifies an information system owned by the Member.
            </p>
          </Col>
          <Col span={8}>
            <Form.Item name='subsystemCode' rules={[...rules.required]}>
              <Input placeholder="Subsystem Code"/>
            </Form.Item>
          </Col>
        </Row>
      </Card>
      <Space style={{width: '100%', justifyContent: 'flex-end', marginTop: '20px'}}>
        <Button onClick={() => cancel()}>Cancel</Button>
        <Button type="primary" htmlType='submit'>Continue</Button>
      </Space>
    </Form>
  );
};

export default AddClientStep1;
