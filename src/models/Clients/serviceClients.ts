import {useState} from "react";
import {Form} from "antd";
import {getAllServiceClient, getMemberTableApi, getServiceDescription} from "@/services/clientDetailService/api";

export default () => {
  const [data, setData] = useState<ServiceClientsTable[]>([]);
  const [isOpen, setOpen] = useState<boolean>();
  const [addSubjectForm] = Form.useForm();
  const [formSubmiting, setFormSubmiting] = useState<boolean>();
  const [currentAddSubject, setCurrentAddSubject] = useState<number>(0);
  const [step1Data, setStep1Data] = useState([]);
  const [step1Selected, setStep1Selected] = useState([]);
  const [step2Data, setStep2Data] = useState([]);
  const [step2Selected, setStep2Selected] = useState([]);
  const [clientIdIn, setClientIdIn] = useState();
  const hideModal = () => {
    setOpen(false);
  };

  const showModal = () => {
    setOpen(true);
  };

  const getClientServiceInfo = (clientId: any) => {
    if (clientId) {
      setClientIdIn(clientId);
      getAllServiceClient(clientId).then(
        res => {
          const resData = res.data.data;
          if (resData) {
            setData(resData.map((item: any) => {
              return {
                key: item.id,
                name: item.name,
                id: item.id
              };
            }));
          }
        }
      );
    }
  };

  const handleAddSubsystem = (values: any) => {

  };

  const step1SelectionRow = {
    onChange: (selectedRowKeys: React.Key[], selectedRow: any) => {
      console.log(selectedRow);
      setStep1Selected(selectedRow);
    },
  };

  const step2SelectionRow = {
    onChange: (selectedRowKeys: React.Key[], selectedRow: any) => {
      console.log(selectedRow);
      setStep2Selected(selectedRow);
    },
  };

  const getValueOfStep1 = async (clientId: string) => {
    try {
      const res = await getMemberTableApi(clientId);
      const resData = res.data.data;
      if(resData) {
        setStep1Data(resData.map((item: any) => {
          return {
            key: item.id,
            memberName: item.name,
            id: item.id
          };
        }));
      }
    } catch (err) {
      Promise.reject(err);
    }
  };

  const getValueOfStep2 = async (clientId: string) => {
    try {
      const res = await getServiceDescription(clientId);
      const resData = res.data.data;
      if(resData) {
        let temp = [];
        resData.forEach((item: any) => {
          if(item.services) {
            item.services.forEach((service: any) => {
              temp.push({
                key: service.service_code,
                service_code: service.service_code,
                title: ''
              });
            });
          }
        });
        setStep2Data(temp);
      }
    } catch (err) {
      Promise.reject(err);
    }
  };

  const addNewSubject = async () => {
    try {
      getClientServiceInfo(clientIdIn);
      hideModal();
    } catch (err) {
      Promise.reject(err);
    }
  };

  return {
    data,
    isOpen,
    hideModal,
    showModal,
    addSubjectForm,
    handleAddSubsystem,
    formSubmiting,
    getClientServiceInfo,
    currentAddSubject,
    setCurrentAddSubject,
    step1SelectionRow,
    getValueOfStep1,
    step1Data,
    step1Selected,
    getValueOfStep2,
    step2Data,
    step2SelectionRow,
    step2Selected,
    addNewSubject
  };
};

export interface ServiceClientsTable {
  key: any,
  name: string,
  id: string
}
