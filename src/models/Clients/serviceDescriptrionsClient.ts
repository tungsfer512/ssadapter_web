import { useState } from "react";
import {
  getServiceDescriptrions,
  enableClientService,
  disableClientService,
  editServiceDescriptrions,
} from "@/services/service-descripstrions/api";
import { message } from "antd";
import { useForm } from "antd/es/form/Form";

export default () => {
  const [isOpenModalREST, setOpenModalREST] = useState<boolean>();
  const [isOpenModalDetails, setOpenModalDetails] = useState<boolean>();
  const [serviceList, setServiceList] = useState<IService[]>([]);
  const [recordService, setRecordService] = useState<any>(null);
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

  const hideModalREST = () => {
    setOpenModalREST(false);
  };

  const showModalREST = () => {
    setOpenModalREST(true);
  };
  const hideModalDetails = () => {
    setOpenModalDetails(false);
  };

  const showModalDetails = () => {
    setOpenModalDetails(true);
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

  const editServiceDescriptrionsAll = async (payload: any) => {
    try {
      const result = await editServiceDescriptrions(payload);
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
    isOpenModalREST,
    hideModalREST,
    showModalREST,
    isOpenModalDetails,
    hideModalDetails,
    showModalDetails,
    getServiceDescriptrionsAll,
    serviceList,
    setServiceList,
    enableClientServiceAll,
    disableClientServiceAll,
    editServiceDescriptrionsAll,
    recordService, setRecordService,
  };
};

export interface IService {
  id: string,
  service_code: string,
  url: string
  timeout: string
}
