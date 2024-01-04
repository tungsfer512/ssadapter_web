import {useState} from "react";
import {useForm} from "antd/es/form/Form";
import {
  apiImportCert,
  deleteCsrApi,
  deleteKeyApi,
  getKeyDetailApi,
  getTokenApi, renameKeyApi
} from "@/services/KeyAndCertificateService/signAndAuthKeys";
import {message, UploadProps} from "antd";
import {history} from 'umi';


export default () => {
  const [tokenInfo, setTokenInfo] = useState<ITokenInfo[]>();
  const [loadingTokenInfo, setLoadingTokenInfo] = useState<boolean>();
  const [isOpenEditTokenModal, setOpenEditTokenModal] = useState<boolean>();
  const [isOpenAddKeyModal, setOpenAddKeyModal] = useState<boolean>();
  const [isOpenGenerateCsr, setIsOpenGenerateCsr] = useState<boolean>();
  const [step1AddForm] = useForm();
  const [step2AddForm] = useForm();
  const [step3AddForm] = useForm();
  const [valueStep1, setValueStep1] = useState();
  const [valueStep2, setValueStep2] = useState();
  const [valueStep3, setValueStep3] = useState();
  const [keyInformation, setKeyInformation] = useState<any>();
  const [renameKeyForm] = useForm();
  const getTokenInfo = async () => {
    setLoadingTokenInfo(true);
    try {
      const res = await getTokenApi();
      const resData = res.data.data;
      if (resData) {
        setTokenInfo(resData);
      }
    } catch (err) {
      Promise.reject(err);
    } finally {
      setLoadingTokenInfo(false);
    }
  };

  const finishAddForm = async (req: ICsrGenerateRequest)=> {
    console.log(req);
  };

  const importCertProp: UploadProps = {
    name: 'file',
    action: apiImportCert,
    headers: {},
    onChange(info) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        getTokenInfo();
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const deleteCsr = async (req: {keyId: string, csrId: string}) => {
    try {
      const res = await deleteCsrApi(req);
      if(res) {
        message.success('CSR deleted ');
        getTokenInfo();
      }
    } catch (err) {
      Promise.reject(err);
    }
  };


  const getKeyDetail = async (keyId: string) => {
    try {
      const res = await getKeyDetailApi(keyId);
      const resData = res.data.data;
      if(resData) {
        setKeyInformation(resData);
        renameKeyForm.setFieldValue('name', resData.name);
      }
    } catch (err) {
      Promise.reject(err);
    }
  };

  const backToPreviousPage = () => {
    history.goBack();
    getTokenInfo();
  };

  const deleteKey = async (keyId: string) => {
    try {
      const res = await deleteKeyApi(keyId);
      if(res) {
        message.success('Key deleted ');
        backToPreviousPage();
      }
    } catch (err) {
      Promise.reject(err);
    }
  };

  const renameKey = async (keyId: string) => {
    try {
      const reqTemp = keyInformation;
      reqTemp.name = renameKeyForm.getFieldValue('name');
      const res = await renameKeyApi(keyId, reqTemp);
      if(res) {
        message.success('Key saved ');
        backToPreviousPage();
      }
    } catch (err) {
      Promise.reject(err);
    }
  };

  return {
    tokenInfo,
    getTokenInfo,
    loadingTokenInfo,
    isOpenEditTokenModal,
    setOpenEditTokenModal,
    isOpenAddKeyModal,
    setOpenAddKeyModal,
    step1AddForm,
    step2AddForm,
    step3AddForm,
    valueStep1,
    valueStep2,
    valueStep3,
    setValueStep1,
    setValueStep2,
    setValueStep3,
    finishAddForm,
    isOpenGenerateCsr,
    setIsOpenGenerateCsr,
    importCertProp,
    deleteCsr,
    getKeyDetail,
    keyInformation,
    deleteKey,
    backToPreviousPage,
    renameKeyForm,
    renameKey
  };
};

export interface ITokenInfo {
  available: boolean
  id: string
  keys: IkeyInfo[]
  logged_in: boolean
  name: string
  possible_actions: []
  read_only: boolean
  saved_to_configuration: boolean
  status: string
  token_infos: ITokenInfos[]
  type: string
}

export interface ITokenInfos {
  key: string,
  value: string
}

export interface IkeyInfo {
  available: boolean
  certificate_signing_requests: ICertificateSigning[]
  certificates: ICertInfo[]
  id: string
  label: string
  name: string
  possible_actions: string
  saved_to_configuration: boolean
  usage: string
}

export interface ICertificateSigning {
  id: string
  owner_id: string
  possible_actions: []
}

export interface ICertInfo {
  active: boolean
  certificate_details: {
    hash: string
    issuer_common_name: string
    issuer_distinguished_name: string
    key_usages: []
    not_after: string
    not_before: string
    public_key_algorithm: string
    rsa_public_key_exponent: number
    rsa_public_key_modulus: string
    serial: string
    signature: string
    signature_algorithm: string
    subject_common_name: string
    subject_distinguished_name: string
    version: number
  }
  ocsp_status: string
  possible_actions: []
  saved_to_configuration: boolean
  status: string
}

export interface ICsrGenerateRequest {
  csr_generate_request: {
    ca_name: string,
    csr_format: string,
    key_usage_type: string,
    subject_field_values: {
      C: string,
      CN: string,
      O: string,
      serialNumber: string
    }
  },
  keyLabel: string
}
