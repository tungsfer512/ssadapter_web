import {Button, Card, Modal, Space, Steps, Table} from "antd";
import './style.less';
import {ColumnsType} from "antd/es/table";
import {useEffect} from "react";
export default (props: any) => {
  const model = props.model;
  const clientId = props.clientId;

  const step1Column: ColumnsType<any> = [
    {
      title: 'Member name / Group description',
      dataIndex: 'memberName',
    },
    {
      title: 'ID',
      dataIndex: 'id',
    },
  ];

  const step2Column: ColumnsType<any> = [
    {
      title: 'Service code',
      dataIndex: 'service_code',
    },
    {
      title: 'Title',
      dataIndex: 'title',
    },
  ];

  const step1 = () => {
    return (
      <>
        <Table
          rowSelection={{
            type: 'radio',
            ...model.step1SelectionRow,
          }}
          columns={step1Column}
          dataSource={model.step1Data}
          pagination={false}
        />
        <Space style={{width: '100%', justifyContent: 'flex-end', marginTop: '20px'}}>
          <Button onClick={model.hideModal}>Cancel</Button>
          <Button type="primary" disabled={!(model.step1Selected.length>0)}
                  onClick={() => model.setCurrentAddSubject(model.currentAddSubject+1)}>Next</Button>
        </Space>
      </>
    );
  };

  const step2 = () => {
    return (
      <>
        <Card>
          <Table
            rowSelection={{
              type: 'Checkbox',
              ...model.step2SelectionRow,
            }}
            columns={step2Column}
            dataSource={model.step2Data}
            pagination={false}
          />
          <Space style={{width: '100%', justifyContent: 'flex-end', marginTop: '20px'}}>
            <Button onClick={model.hideModal}>Cancel</Button>
            <Button onClick={() => model.setCurrentAddSubject(model.currentAddSubject-1)}>Previous</Button>
            <Button type="primary" disabled={!(model.step2Selected.length>0)}
                    onClick={() => model.addNewSubject()}>Next</Button>
          </Space>
        </Card>
      </>
    );
  };


  const steps = [
    {
      title: 'Member / Group',
      content: step1(),
    },
    {
      title: 'Services',
      content: step2(),
    }
  ];

  useEffect(() => {
    model.getValueOfStep1(clientId);
    model.getValueOfStep2(clientId);
  }, []);

  return (
    <>
      <Modal
        title='Add a subject'
        open={model.isOpen}
        onCancel={model.hideModal}
        okText="Add"
        width={800}
        cancelText="Cancel"
        className='hide-footer'
      >
        <Steps current={model.currentAddSubject} items={steps}/>
        <div className="steps-content">{steps[model.currentAddSubject].content}</div>
      </Modal>
    </>
  );
};
