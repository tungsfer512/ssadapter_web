import { useState } from "react";
import {
  getServiceDescriptrions,
  enableClientService,
  disableClientService
} from "@/services/service-descripstrions/api";
import { message } from "antd";
import { useForm } from "antd/es/form/Form";

export default () => {
  const [isOpen, setOpen] = useState<boolean>();
  const [serviceList, setServiceList] = useState<IService[]>([]);
  const [addServiceForm] = useForm<any>();

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record: any) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };

  const hideModal = () => {
    setOpen(false);
  };

  const showModal = () => {
    setOpen(true);
  };

  const getServiceDescriptrionsAll = async (id: string) => {
    try {
      const result = await getServiceDescriptrions(id);
      const resData = result.data.data;
      if (resData) {
        console.log(resData);
        setServiceList(resData);
      }
    } catch (err) {
      Promise.reject(err);
    }
  };

  const enableClientServiceAll = async (id: any) => {
    try {
      const result = await enableClientService(id);
      const resData = result;
      console.log(resData);

      if (resData?.status === 200) {
        message.success("OK");
      }
    } catch (err) {
      Promise.reject(err);
    }
  };

  const disableClientServiceAll = async (payload: any) => {
    try {
      const result = await disableClientService(payload);
      const resData = result;
      console.log(resData);
      if (resData?.status === 200) {
        message.success("OK");
      }
    } catch (err) {
      Promise.reject(err);
    }
  };

  return {
    isOpen,
    hideModal,
    showModal,
    getServiceDescriptrionsAll,
    serviceList,
    enableClientServiceAll,
    disableClientServiceAll,
  };
};

export interface IService {
  id: string,
  service_code: string,
  url: string
  timeout: string
}
