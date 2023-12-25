import {useState} from "react";
import {createApiKeys, editRoles, getAllApiKeys, revokeKeyApi} from "@/services/KeyAndCertificateService/apiKeys";
import {CheckboxValueType} from "antd/es/checkbox/Group";
import {message} from "antd";
import {useForm} from "antd/es/form/Form";

export default () => {
  const [securityTlsData, setSecurityTlsData] = useState<IListApiKeys[]>([]);
  const [isModalOpen, setModalOpen] = useState<boolean>();
  const [selectedRow, setSelectedRow] = useState<IListApiKeys>();
  const [listSelected, setListSelected] = useState<any[]>([]);
  const [isModalAddOpen, setModalAddOpen] = useState<boolean>();
  const [current, setCurrent] = useState(0);
  const [listAddSelected, setListAddSelected] = useState<any[]>([]);
  const [loadingGenerateKey, setLoadingGenerateKey] = useState<boolean>(false);
  const [keyDetailForm] = useForm<IKeyDetailForm>();
  const [keyDetail, setKeyDetail] = useState<any>();
  const [loadingEditBtn, setLoadingEditBtn] = useState<boolean>();
  const [loadingTableApiKey, setLoadingTableApikey] = useState<boolean>();

  const options = [
    {label: 'Registration Officer', value: 'XROAD_REGISTRATION_OFFICER'},
    {label: 'Server Observer', value: 'XROAD_SECURITYSERVER_OBSERVER'},
    {label: 'Service Administrator', value: 'XROAD_SERVICE_ADMINISTRATOR'},
    {label: 'System Administrator', value: 'XROAD_SYSTEM_ADMINISTRATOR'},
    {label: 'Security Officer', value: 'XROAD_SECURITY_OFFICER'},
  ];

  const getListApiKeys = async () => {
    try {
      setLoadingTableApikey(true);
      const res = await getAllApiKeys().finally(() => setLoadingTableApikey(false));
      const resData = res.data.data;
      if (resData) {
        setSecurityTlsData(resData);
      }
    } catch (err) {
      Promise.reject(err);
    }
  };

  const openEditModal = (rec: IListApiKeys) => {
    setSelectedRow(rec);
    setListSelected(rec.roles);
    setModalOpen(true);
  };

  const handleOk = async () => {
    const keyId = selectedRow?.id;
    const listRolesSelected = listSelected;

    if (keyId) {
      try {
        setLoadingEditBtn(true);
        const res = await editRoles(keyId, {roles: listRolesSelected}).finally(() => setLoadingEditBtn(false));
        if (res) {
          message.success(`API key with ID ${keyId} saved `);
          getListApiKeys();
          setModalOpen(false);
        }
      } catch (err) {
        Promise.reject(err);
      }
    }
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  const changeSelectPermission = (checkedValues: CheckboxValueType[]) => {
    setListSelected(checkedValues);
  };

  const changeSelectAddPermission = (checkedValues: CheckboxValueType[]) => {
    setListAddSelected(checkedValues);
  };

  const revokeKey = async (keyId: number) => {
    try {
      const res = await revokeKeyApi(keyId);
      if (res) {
        message.success(`API key with ID ${keyId} successfully revoked `);
        getListApiKeys();
      }
    } catch (err) {
      Promise.reject(err);
    }
  };

  const openAddModal = (open: boolean) => {
    setModalAddOpen(open);
  };

  const setCurrentTab = (tabIndex: number) => {
    setCurrent(tabIndex);
  };

  const createKey = async () => {
    if(listAddSelected) {
      try {
        setLoadingGenerateKey(true);
        const res = await createApiKeys({roles: listAddSelected}).finally(() => setLoadingGenerateKey(false));
        const resData = res.data.data;
        if(resData) {
          message.success('API key successfully created');
          setKeyDetail(resData);
          getListApiKeys();
        }
      } catch (err) {
        Promise.reject(err);
      }
    }
  };

  return {
    securityTlsData,
    getListApiKeys,
    isModalOpen,
    handleOk,
    handleCancel,
    openEditModal,
    selectedRow,
    options,
    listSelected,
    changeSelectPermission,
    revokeKey,
    isModalAddOpen,
    openAddModal,
    current,
    listAddSelected,
    changeSelectAddPermission,
    setCurrentTab,
    createKey,
    loadingGenerateKey,
    keyDetailForm,
    keyDetail,
    loadingEditBtn,
    loadingTableApiKey,
  };
};

export interface IListApiKeys {
  id: number,
  roles: []
}

export interface IKeyDetailForm {
  apiKey: string,
  apiKeyId: string,
  rolesAssigned: []
}
