import {Button, Card, Form, Modal, Space, Table} from 'antd';
import {PlusCircleOutlined} from "@ant-design/icons";
import {ColumnsType} from "antd/es/table";
import {IDataType} from "@/models/addClient/addClient";
import {useModel} from "@@/plugin-model/useModel";

const LocalGroups = () => {

  const {data,
    isOpen,
    hideModal,
    showModal,
    addLocalGroupForm,
    handleAddSubsystem,
    formSubmiting} = useModel('Clients.localGroup');

  const columns: ColumnsType<IDataType> = [
    {
      title: 'Code',
      dataIndex: 'code',
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Member Count',
      dataIndex: 'memberCount',
    },
    {
      title: 'Updated',
      dataIndex: 'updated',
    }
  ];

  return (
    <>
      <div className="control-bar">
        <div>
        </div>
        <Button type="primary" shape="round" icon={<PlusCircleOutlined />} onClick={showModal}>Add group</Button>
      </div>
      <Card bodyStyle={{ padding: '0px' }}>
        <Table columns={columns} dataSource={data} pagination={false}/>
      </Card>

      <Modal
        title='Add Local Group'
        open={isOpen}
        onCancel={hideModal}
        okText="Add"
        cancelText="Cancel"
        className='hide-footer'
      >
        <Form style={{marginTop: '1rem'}}
              className='hide-bottom'
              form={addLocalGroupForm}
              onFinish={async (values) => handleAddSubsystem(values as any)}
        >

          <Space style={{width: '100%', justifyContent: 'flex-end'}}>
            <Button onClick={hideModal}>Cancel</Button>
            <Button type="primary" loading={formSubmiting} htmlType='submit'>Add subsystem</Button>
          </Space>
        </Form>
      </Modal>
    </>
  );
};

export default LocalGroups;
