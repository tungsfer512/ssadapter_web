import {useEffect, useState} from 'react';
import {addSubSystem, getClientTable, IAddSubSystemReq, registerClientApi} from '@/services/cliensService/api';
import {Form, message} from "antd";

type LayoutType = Parameters<typeof Form>[0]['layout'];

export interface DataType {
  key?: React.Key;
  name: string;
  id: string;
  status: string;
  subsystem_code: string;
  owner: string;
  instance_id: string;
  member_class: string;
  member_code: string;
}

export interface ISubSysInfo {
  memberName: string,
  memberClass: string,
  memberCode: string,
  subsystemCode: string,
  registerSubsystem: boolean
}

export default () => {
  const [data, setData] = useState<DataType[]>([]);
  const [isAddSubsysModalOpen, setIsAddSubsysModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>('horizontal');
  const [formSubmiting, setFormSubmiting] = useState<boolean>(false);
  const [loadingGetClient, setLoadingGetClient] = useState<boolean>(false);
  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout);
  };

  const formItemLayout =
    formLayout === 'horizontal' ? { labelCol: { span: 8 }, wrapperCol: { span: 16 } } : null;
  const showAddSubSysModal = (rec: DataType) => {
    form.setFieldsValue({
      memberName: rec.name,
      memberClass: rec.member_class,
      memberCode: rec.member_code,
      subsystemCode: rec.subsystem_code
    });
    setIsAddSubsysModalOpen(true);
  };

  const handleCancel = () => {
    setIsAddSubsysModalOpen(false);
    form.resetFields();
  };

  const getClient = () => {
    setLoadingGetClient(true);
    getClientTable().then(
      res => {
        const dataTable = res.data.data.map((item: any) => {
          return {
            key: item.id,
            name: item.member_name,
            id: item.id,
            status: item.status,
            subsystem_code: item.subsystem_code,
            owner: item.owner,
            instance_id: item.instance_id,
            member_class: item.member_class,
            member_code: item.member_code
          };
        });
        console.log(dataTable);
        setData(dataTable);
      }
    ).finally(() => {setLoadingGetClient(false)});
  };

  const handleAddSubsystem = (subSysInputData: ISubSysInfo) => {
    const req: IAddSubSystemReq = {
      client: {member_class: subSysInputData.memberClass, member_code: subSysInputData.memberCode, member_name: subSysInputData.memberName, subsystem_code: subSysInputData.subsystemCode},
      ignore_warnings: !subSysInputData.registerSubsystem,
    };
    addSubSystem(req).then(
      res => {
        handleCancel();
        getClient();
        message.success('Create new sub system successfully');
      },
      err => {
        handleCancel();
        getClient();
        message.success('Create new sub system successfully');
      }
    );
  };

  const registerClient = async (clientId: string) => {
    try {
      const res = await registerClientApi({clientId: clientId});
      if(res) {
        message.success('Client registration request sent successfully ');
        getClient();
      }
    } catch (err) {
      Promise.reject(err);
    }
  };

  useEffect(() => {
    getClient();
  }, []);

  return {
    data,
    isAddSubsysModalOpen,
    showAddSubSysModal,
    handleCancel,
    form,
    onFormLayoutChange,
    formItemLayout,
    formLayout,
    formSubmiting,
    handleAddSubsystem,
    getClient,
    registerClient,
    loadingGetClient
  };
};

export interface ISubsystem {
  memberName: string,
  memberClass: string,
  memberCode: string,
  subsystemCode: string,
  owner: boolean
}

export interface ICertificate {
  key: number,
  signCertificate: string,
  serialNumber: string,
  state: number,
  expires: string,
  hash: string
}

