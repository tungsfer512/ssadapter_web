import { useState } from "react";
import {
  getServiceDescriptrions,
  enableClientService,
  disableClientService,
  editServiceDescriptrions,
  deleteServiceDescriptrions,
  AddClientServiceREST,
  AddClientServiceWSDL,
  getInforService,
  getAccessRightsListApi,
  deleteAccessRight,
  getAllServiceApi,
  editSerciceById,
  xroadInstances,
  memberClasses,
  memberClassesById,
  serviceClientCandidates,
  addServiceClientOfService,
  getEndpointsById,
  addEndpoint,
  editEndpoint,
  deleteEndpoint,
  getAccessRightsListEndpoints,
  deleteAccessRightEndpoints,
  addAccessRightEndpoints,
} from "@/services/service-descripstrions/api";
import { Form, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { IMemberList } from "./detailServiceClient";

export default () => {
  const [isOpenModalREST, setOpenModalREST] = useState<boolean>();
  const [isOpenModalFormSubject, setOpenModalFormSubject] = useState<boolean>();
  const [isOpen, setOpenModal] = useState<boolean>();
  const [isOpenModalWSDL, setOpenModalWSDL] = useState<boolean>();
  const [isOpenModalDetails, setOpenModalDetails] = useState<boolean>();
  const [isOpenModalEndpoint, setOpenModalEndpoint] = useState<boolean>();
  const [serviceList, setServiceList] = useState<IService[]>([]);
  const [recordService, setRecordService] = useState<any>(null);
  const [recordClientsService, setRecordClientsServiceService] = useState<any>(null);

  const [memberList, setMemberList] = useState<IMemberList[]>([]);
  const [accessRightsList, setAccessRightsList] = useState<any>();
  const [formSubmitting, setFormSubmitting] = useState<boolean>();
  const [formServiceParameters, setFormServiceParameters] = Form.useForm();
  const [formServiceEndpoints, setFormServiceEndpoints] = Form.useForm();
  const [formSubject, setFormSubject] = Form.useForm();

  const [xroadInstancesList, setXroadInstancesList] = useState<any>();
  const [memberClassesList, setMemberClassesList] = useState<any>();
  const [memberClassesByIdList, setMemberClassesByIdList] = useState<any>();

  const [acessRightEndpoints, setAcessRightEndpoints] = useState<any>();
  const [recordAcessRightEndpoints, setRecordAcessRightEndpoints] = useState<any>(null);

  const [serviceClientCandidatesList, setServiceClientCandidatesList] = useState<any>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>({});

  const [selectedRowKeysEndpoints, setSelectedRowKeysEndpoints] = useState<any>({});

  const [endPoints, setEndPoints] = useState<any>();
  const [recordEndpoints, setRecordEndpoints] = useState<any>(null);
  const [isEditEndpoint, setIsEditEndpoint] = useState<boolean>(false);

  const [filter, setFilter] = useState<any>({
    instance: '',
    member_class: '',
    member_group_code: '',
    member_name_group_description: '',
    service_client_type: '',
    subsystem_code: '',
  });


  // const rowSelection = {
  //   onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
  //     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  //   },
  //   getCheckboxProps: (record: any) => ({
  //     disabled: record.name === 'Disabled User', // Column configuration not to be checked
  //     name: record.name,
  //   }),
  // };

  const hideModalREST = () => {
    setOpenModalREST(false);
  };

  const showModalREST = () => {
    setOpenModalREST(true);
  };
  const hideModalFormSubject = () => {
    setOpenModalFormSubject(false);
  };

  const showModalFormSubject = () => {
    setOpenModalFormSubject(true);
  };
  const hideModal = () => {
    setOpenModal(false);
  };

  const showModal = () => {
    setOpenModal(true);
  };

  const hideModalWSDL = () => {
    setOpenModalWSDL(false);
  };

  const showModalWSDL = () => {
    setOpenModalWSDL(true);
  };

  const hideModalDetails = () => {
    setOpenModalDetails(false);
  };

  const showModalDetails = () => {
    setOpenModalDetails(true);
  };
  const hideModalEndpoint = () => {
    setOpenModalEndpoint(false);
  };

  const showModalEndpoint = () => {
    setOpenModalEndpoint(true);
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

  const AddClientServiceRESTAll = async (payload: any) => {
    try {
      const result = await AddClientServiceREST(payload);
      const resData = result;
      console.log(resData);
      if (resData?.status === 201) {
        message.success("OK");
      }
    } catch (err) {
      Promise.reject(err);
    }
  };

  const AddClientServiceWSDLAll = async (payload: any) => {
    try {
      const result = await AddClientServiceWSDL(payload);
      const resData = result;
      console.log(resData);
      if (resData?.status === 201) {
        message.success("OK");
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

  const deleteServiceDescriptrionsAll = async (payload: any) => {
    try {
      const result = await deleteServiceDescriptrions(payload);
      const resData = result;
      console.log(resData);
      if (resData?.status === 204) {
        message.success("OK");
      }
    } catch (err) {
      Promise.reject(err);
    }
  };

  const getMemberList = async (clientId: string, serviceId: string) => {
    try {
      const result = await getInforService({ clientId, serviceId });
      const resData = result.data.data;
      if (resData) {
        console.log(resData);
        setMemberList(resData);
        setRecordClientsServiceService(resData);
        formServiceParameters.setFieldsValue({
          ...resData,
        });
      }
    } catch (err) {
      Promise.reject(err);
    }
  };

  const getAccessRightsList = async (clientId: string, serviceId: string) => {
    try {
      const result = await getAccessRightsListApi({ clientId, serviceId });
      console.log(result);

      const resData = result.data.data;
      if (resData) {
        console.log(resData);
        setAccessRightsList(resData || []);
      }
    } catch (err) {
      Promise.reject(err);
    }
  };

  const editSerciceByIdAll = async (payload: any) => {
    try {
      const result = await editSerciceById(payload);
      const resData = result;
      console.log(resData);
      if (resData?.status === 200) {
        message.success("OK");
      }
    } catch (err) {
      Promise.reject(err);
    }
  };

  const removeAccessRightItem = async (clientId: string, serviceId: string, record: any) => {
    try {
      const data = { items: [{ id: record.id, name: record.name, service_client_type: record.service_client_type, rights_given_at: record.rights_given_at }] };
      await deleteAccessRight({ clientId, serviceId, data });
      message.success('Xóa thành công');
      getAccessRightsList(clientId, serviceId);
    } catch (err) {
      message.error('Có lỗi xảy ra');
      Promise.reject(err);
    }
  };

  const removeAllAccessRightItem = async (clientId: string, serviceId: string) => {
    try {
      const data = { items: accessRightsList.map((item: any) => { return { id: item.id, name: item.name, service_client_type: item.service_client_type }; }) };
      await deleteAccessRight({ clientId, serviceId, data });
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

  const getXroadInstances = async () => {
    try {
      const data = await xroadInstances();
      console.log(data);
      if (data?.data?.data) {
        setXroadInstancesList(data?.data?.data);
      }
    } catch (err) {
      message.error('Có lỗi xảy ra');
      Promise.reject(err);
    }
  };

  const getMemberClasses = async () => {
    try {
      const data = await memberClasses();
      console.log(data);
      if (data?.data?.data) {
        setMemberClassesList(data?.data?.data);
      }
    } catch (err) {
      message.error('Có lỗi xảy ra');
      Promise.reject(err);
    }
  };

  const getMemberClassesById = async (id: string) => {
    try {
      const data = await memberClassesById(id);
      console.log(data);
      if (data?.data?.data) {
        setMemberClassesByIdList(data?.data?.data);
      }
    } catch (err) {
      message.error('Có lỗi xảy ra');
      Promise.reject(err);
    }
  };

  const searchServiceClientCandidates = async (payload: any) => {
    try {
      const data = await serviceClientCandidates(payload);
      console.log(data);
      if (data?.data?.data) {
        setServiceClientCandidatesList(data?.data?.data);
      }
    } catch (err) {
      message.error('Có lỗi xảy ra');
      Promise.reject(err);
    }
  };

  const addServiceClientOfServiceAll = async (payload: any) => {
    try {
      const data = await addServiceClientOfService(payload);
      console.log(data);
      if (data?.data?.data) {
        message.success('Thêm thành công');
      }
    } catch (err) {
      message.error('Có lỗi xảy ra');
      Promise.reject(err);
    }
  };

  const getEndpointsByIdAll = async (serviceId: string) => {
    try {
      const data = await getEndpointsById(serviceId);
      console.log(data?.data?.data?.endpoints);
      if (data?.data?.data) {
        setEndPoints(data?.data?.data?.endpoints);
      }
    } catch (err) {
      message.error('Có lỗi xảy ra');
      Promise.reject(err);
    }
  };

  const addEndpointAll = async (serviceId: string) => {
    try {
      const data = await addEndpoint(serviceId);
      console.log(data?.data?.data?.endpoints);
      if (data.status == 201) {
        message.success('Thêm thành công');
      }
    } catch (err) {
      message.error('Có lỗi xảy ra');
      Promise.reject(err);
    }
  };

  const editEndpointAll = async (serviceId: string) => {
    try {
      const data = await editEndpoint(serviceId);
      if (data.status === 200) {
        message.success('Sửa thành công');
      }
    } catch (err) {
      message.error('Có lỗi xảy ra');
      Promise.reject(err);
    }
  };

  const deleteEndpointAll = async (serviceId: string) => {
    try {
      const data = await deleteEndpoint(serviceId);
      if (data.status === 204) {
        message.success('Xoá thành công');
      }
    } catch (err) {
      message.error('Có lỗi xảy ra');
      Promise.reject(err);
    }
  };

  const getAccessRightsListEndpointsAll = async (endpointId: string) => {
    try {
      const data = await getAccessRightsListEndpoints(endpointId);
      console.log(data?.data?.data);
      if (data?.data?.data) {
        setAcessRightEndpoints(data?.data?.data);
      }
    } catch (err) {
      message.error('Có lỗi xảy ra');
      Promise.reject(err);
    }
  };

  const deleteAccessRightEndpointsAll = async (endpointId: string, record: any) => {
    try {
      const data = { items: [{ id: record.id, name: record.name, service_client_type: record.service_client_type, rights_given_at: record.rights_given_at }] };
      await deleteAccessRightEndpoints({ endpointId, data });
      message.success('Xóa thành công');
      getAccessRightsListEndpointsAll(endpointId);
    } catch (err) {
      message.error('Có lỗi xảy ra');
      Promise.reject(err);
    }
  };

  const deleteAccessRightEndpointsAllAll = async (endpointId: string) => {
    try {
      const data = { items: acessRightEndpoints.map((item: any) => { return { id: item.id, name: item.name, service_client_type: item.service_client_type }; }) };
      await deleteAccessRightEndpoints({ endpointId, data });
      message.success('Xóa thành công');
      getAccessRightsListEndpointsAll(endpointId);
    } catch (err) {
      message.error('Có lỗi xảy ra');
      Promise.reject(err);
    }
  };

  const addAccessRightEndpointsAll = async (payload: any) => {
    try {
      console.log(payload);
      await addAccessRightEndpoints(payload);
      message.success('Thêm thành công');
    } catch (err) {
      message.error('Có lỗi xảy ra');
      Promise.reject(err);
    }
  };

  return {
    isOpen,
    hideModal,
    showModal,
    isOpenModalREST,
    hideModalREST,
    showModalREST,
    isOpenModalWSDL,
    hideModalWSDL,
    showModalWSDL,
    isOpenModalDetails,
    hideModalDetails,
    showModalDetails,
    isOpenModalEndpoint,
    hideModalEndpoint,
    showModalEndpoint,
    isOpenModalFormSubject,
    hideModalFormSubject,
    showModalFormSubject,
    getServiceDescriptrionsAll,
    AddClientServiceRESTAll,
    AddClientServiceWSDLAll,
    serviceList,
    setServiceList,
    enableClientServiceAll,
    disableClientServiceAll,
    editServiceDescriptrionsAll,
    deleteServiceDescriptrionsAll,
    recordService, setRecordService,
    recordClientsService, setRecordClientsServiceService,
    getMemberList,
    memberList,
    getAccessRightsList,
    editSerciceByIdAll,
    accessRightsList,
    removeAccessRightItem,
    removeAllAccessRightItem,
    formSubmitting,
    formServiceParameters,
    formSubject,
    getAllService,
    getXroadInstances,
    xroadInstancesList,
    getMemberClasses,
    memberClassesList,
    getMemberClassesById,
    memberClassesByIdList,
    filter, setFilter,
    searchServiceClientCandidates,
    serviceClientCandidatesList,
    addServiceClientOfServiceAll,
    selectedRowKeys, setSelectedRowKeys,
    endPoints,
    getEndpointsByIdAll,
    formServiceEndpoints,
    addEndpointAll,
    editEndpointAll,
    deleteEndpointAll,
    recordEndpoints, setRecordEndpoints,
    isEditEndpoint, setIsEditEndpoint,
    acessRightEndpoints,
    getAccessRightsListEndpointsAll,
    deleteAccessRightEndpointsAll,
    addAccessRightEndpointsAll,
    selectedRowKeysEndpoints, setSelectedRowKeysEndpoints,
    deleteAccessRightEndpointsAllAll,
  };
};

export interface IService {
  id: string,
  service_code: string,
  url: string
  timeout: string
}
