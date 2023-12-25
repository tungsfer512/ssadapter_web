import {useState} from "react";
import {
  deleteAccessRight,
  getAccessRightsListApi,
  getAllServiceApi,
  getMemberListApi
} from "@/services/cliensService/api";
import {message} from "antd";
import {useForm} from "antd/es/form/Form";

export default () => {
  const [isOpen, setOpen] = useState<boolean>();
  const [memberList, setMemberList] = useState<IMemberList[]>([]);
  const [accessRightsList, setAccessRightsList] = useState<any>();
  const [addServiceForm] = useForm<any>();
  const [formSubmitting, setFormSubmitting] = useState<boolean>();

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

  const getMemberList = async (clientId: string, serviceId: string) => {
    try {
      const result = await getMemberListApi({clientId, serviceId});
      const resData = result.data.data;
      if(resData) {
        console.log([resData]);
        setMemberList([resData]);
      }
    } catch (err) {
      Promise.reject(err);
    }
  };

  const getAccessRightsList = async (clientId: string, serviceId: string) => {
    try {
      const result = await getAccessRightsListApi({clientId, serviceId});
      const resData = result.data.data;
      if(resData) {
        console.log(resData);
        setAccessRightsList(resData);
      }
    } catch (err) {
      Promise.reject(err);
    }
  };

  const removeAccessRightItem = async (clientId: string, serviceId: string, service_code: string) => {
    try {
      const data = {items:[{service_code:service_code}]};
      await deleteAccessRight({clientId, serviceId, data});
      message.success('Xóa thành công');
      getAccessRightsList(clientId, serviceId);
    } catch (err) {
      message.error('Có lỗi xảy ra');
      Promise.reject(err);
    }
  };

  const removeAllAccessRightItem = async (clientId: string, serviceId: string) => {
    try {
      const data = {items:accessRightsList.map((item: any) => {return {service_code: item.service_code};})};
      await deleteAccessRight({clientId, serviceId, data});
      message.success('Xóa thành công');
      getAccessRightsList(clientId, serviceId);
    } catch (err) {
      message.error('Có lỗi xảy ra');
      Promise.reject(err);
    }
  };

  const getAllService = async (clientId: any) => {
    try {
      const data = await getAllServiceApi(clientId);
      console.log(data);
    } catch (err) {
      message.error('Có lỗi xảy ra');
      Promise.reject(err);
    }
  };

  return {
    isOpen,
    hideModal,
    showModal,
    getMemberList,
    getAccessRightsList,
    memberList,
    accessRightsList,
    removeAccessRightItem,
    removeAllAccessRightItem,
    addServiceForm,
    formSubmitting,
    getAllService,
    rowSelection,
  };
};

export interface IMemberList {
  id: string,
  name: string,
  rights_given_at: string
  service_client_type: string
}
