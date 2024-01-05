import {useState} from "react";
import {Form} from "antd";
import {getAllServiceClient} from "@/services/clientDetailService/api";

export default () => {
  const [data, setData] = useState<ServiceClientsTable[]>([]);
  const [isOpen, setOpen] = useState<boolean>();
  const [addSubjectForm] = Form.useForm();
  const [formSubmiting, setFormSubmiting] = useState<boolean>();
  const hideModal = () => {
    setOpen(false);
  };

  const showModal = () => {
    setOpen(true);
  };

  const getClientServiceInfo = (clientId: any) => {
    if (clientId) {
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

  return {
    data,
    isOpen,
    hideModal,
    showModal,
    addSubjectForm,
    handleAddSubsystem,
    formSubmiting,
    getClientServiceInfo,
  };
};

export interface ServiceClientsTable {
  key: any,
  name: string,
  id: string
}
