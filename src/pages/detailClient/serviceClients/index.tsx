import {Button, Card, Table} from 'antd';
import {PlusCircleOutlined} from "@ant-design/icons";
import {ColumnsType} from "antd/es/table";
import {IDataType} from "@/models/addClient/addClient";
import {useModel} from "@@/plugin-model/useModel";
import {useEffect} from "react";
import {history} from "@@/core/history";
import ClientAddSubject from "@/components/ClientAddSubject";

const ServiceClients = (props: any) => {
  const clientId = props.path;
  const model = useModel('Clients.serviceClients');

  useEffect(() => {
    model.getClientServiceInfo(clientId);
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
        <Button type="primary" shape="round" icon={<PlusCircleOutlined />} onClick={model.showModal}>Add subject</Button>
      </div>
      <Card bodyStyle={{ padding: '0px' }}>
        <Table columns={columns} dataSource={model.data} pagination={false}/>
      </Card>

      <ClientAddSubject model={model} clientId={clientId}/>
    </>
  );
};

export default ServiceClients;
