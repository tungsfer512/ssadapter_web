import {Button, Card, Checkbox, Col, Form, Input, Modal, Row, Select, Space, Table, Tag} from 'antd';
import './style.less';
import {PlusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {ColumnsType} from "antd/es/table";
import {DataType, ISubSysInfo} from "@/models/Clients/tableClient";
import {history} from 'umi';
import {useModel} from "@@/plugin-model/useModel";
import rules from "@/utils/rules";

const ClientsPage = () => {
  const {
    data,
    isAddSubsysModalOpen,
    showAddSubSysModal,
    handleCancel,
    form,
    onFormLayoutChange,
    formItemLayout,
    formLayout,
    formSubmiting,
    handleAddSubsystem
  } = useModel('Clients.tableClient');

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      sorter: (a, b) => 1,
      render: (val, rec) => {
        return (
          <>
            <a onClick={(event) => {
              history.push(`/clients/${rec.id}`);
            }}>
              {rec.subsystem_code || rec.name}
            </a>
            {
              rec.owner && <Tag color='green' style={{marginLeft: '10px'}}>
                Owner
              </Tag>}
          </>
        );
      }
    },
    {
      title: 'Id',
      dataIndex: 'id',
      sorter: (a, b) => 1,
    },
    {
      title: 'Status',
      sorter: (a, b) => 1,
      render: (val, rec) => {
        return (
          <p>{rec.status == 'REGISTERED' && 'REGISTERED'
            || rec.status == 'DELETION_IN_PROGRESS' && 'DELETION IN PROGRESS'
            || rec.status == 'REGISTRATION_IN_PROGRESS' && 'REGISTRATION IN PROGRESS'
            || rec.status == 'SAVED' && 'SAVED'}</p>
        );
      }
    },
    {
      title: '',
      render: (val, rec) => {
        return (
          rec.owner && <Button className={'button-action'} onClick={() => showAddSubSysModal(rec)} ghost type="text" icon={<PlusCircleOutlined/>}>Add subsystem</Button>
          || rec.status == 'SAVED' && <Button className={'button-action'} onClick={() => showAddSubSysModal(rec)} ghost type="text">Register</Button>
        );
      }
    },
  ];
  return (
    <>
      <div className='control-bar'>
        <div className='control-bar-left'>
          <h1 className='page-title'>Clients</h1>
        </div>
        <div className='control-bar-right'>
          <Space>
            <Button shape="round" icon={<PlusOutlined/>} onClick={() => {
              history.push("add-member");
            }}>
              Add member
            </Button>
            <Button type="primary" shape="round" icon={<PlusOutlined/>} onClick={() => {
              history.push("add-client");
            }}>
              Add client
            </Button>
          </Space>
        </div>
      </div>

      <Card bodyStyle={{padding: "0px"}}>
        <Table columns={columns} dataSource={data} pagination={false}/>
      </Card>

      <Modal title="Add subsystem"
             okText="Add subsystem"
             cancelText="Cancel"
             width={800}
             className='hide-footer'
             open={isAddSubsysModalOpen}
             onCancel={handleCancel}>

        <Form style={{marginTop: '1rem'}}
              {...formItemLayout}
              layout={formLayout}
              form={form}
              initialValues={{layout: formLayout}}
              onValuesChange={onFormLayoutChange}
              onFinish={async (values) => handleAddSubsystem(values as ISubSysInfo)}
        >
          <Card bordered={false}>
            <Row>
              <Col span={16}>
                <div>Specify the details of the Member you want to add.</div>
                <div>If the Member is already existing, you can select it from the Global list.</div>
              </Col>
            </Row>
            <Row>
              <Col span={16}>
                <h2>
                  Member Name
                </h2>
                <p>
                  Name of the member organization.
                </p>
              </Col>
              <Col span={8}>
                <Form.Item rules={[...rules.required]} name="memberName">
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
                <Form.Item rules={[...rules.required]} name="memberClass">
                  {/* eslint-disable-next-line react/jsx-no-undef */}
                  <Select
                    disabled={true}
                    placeholder="Member Class"
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
                <Form.Item rules={[...rules.required]} name="memberCode" >
                  <Input placeholder="Member Code" disabled={true}/>
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
                <Form.Item rules={[...rules.required]} name="subsystemCode">
                  <Input placeholder="Subsystem Code"/>
                </Form.Item>
              </Col>

              <Col span={16}>
                <h2>
                  Register subsystem
                </h2>
              </Col>
              <Col span={8}>
                <Form.Item name="registerSubsystem">
                  <Checkbox />
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Space style={{width: '100%', justifyContent: 'flex-end'}}>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="primary" loading={formSubmiting} htmlType='submit'>Add subsystem</Button>
          </Space>
        </Form>
      </Modal>
    </>
  );
};

export default ClientsPage;
