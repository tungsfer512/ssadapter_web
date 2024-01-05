import * as React from 'react';
import {useState} from 'react';
import {
  addTimestapingServiceApi,
  apiUploadFileBackup,
  apiUploadFileConfigAnchor,
  backupConfigApi,
  deleteFileBackupApi,
  deleteTimestampingServicesApi,
  downloadConfigApi,
  downloadFileBackupApi,
  getBackupTable,
  getSettingCATable,
  getSettingTable,
  getSettingTimeTable,
  getTimestapingServiceApi
} from '@/services/addsettings/api';
import data from '@/utils/data';
import {message, RadioChangeEvent, Upload, UploadProps} from "antd";
import fileDownload from "js-file-download";
import {CheckboxOptionType} from "antd/lib/checkbox/Group";

export default () => {
  const [datasetting, setDatasetting] = useState<DataType[]>([]);
  const [datasettingtime, setDatasettingtime] = useState<FixedDataType[]>([]);
  const [datasettingCA, setDatasettingCA] = useState<CADataType[]>([]);
  const [isBackuping, setBackuping] = useState<boolean>(false);
  const [isDowloadingConfig, setDowloadingConfig] = useState<boolean>(false);
  const [isConfigurationingAnchor, setConfigurationingAnchor] = useState<boolean>(false);
  const [openAddTimestampingServices, setOpenAddTimestampingServices] = useState<boolean>(false);
  const [radioValue, setRadioValue] = useState();
  const [listTimestapingServie, setListTimestapingServie] = useState<CheckboxOptionType[]>([]);
  const [listTimestapingServieFilter, setListTimestapingServieFilter] = useState<CheckboxOptionType[]>([]);

  const getSetting = () => {
    getSettingTable().then((res) => {
      const data_tmp: DataType[] = [];
      data_tmp.push(res.data.data);
      setDatasetting(data_tmp);
    });
  };
  const getSettingtime = () => {
    getSettingTimeTable().then((res) => {
      if (res.data.data) {
        const dataTabletime = res.data.data?.map((item: any, index: any) => {
          return {
            key: index,
            name: item.name,
            url: item.url,
          };
        });
        setDatasettingtime(dataTabletime);
      }
    });
  };

  const getSettingCA = () => {
    getSettingCATable().then((res) => {
      const dataTableCA = res?.data?.data;
      const data_tmp: CADataType[] = [];
      const tmp: CADataType = {
        key: 1,
        name: dataTableCA?.name,
        subject_distinguished_name: dataTableCA?.subject_distinguished_name,
        issuer_distinguished_name: dataTableCA?.issuer_distinguished_name,
        ocsp_response: dataTableCA?.ocsp_response,
        not_after: dataTableCA?.not_after,
        top_ca: dataTableCA?.top_ca,
        path: dataTableCA?.path,
        authentication_only: dataTableCA?.authentication_only,
      };
      data_tmp.push(tmp);
      setDatasettingCA(data_tmp);
    });
  };

  const [databackup, setDatabackup] = useState<BackupDataType[]>([]);

  const getSettingBackup = () => {
    getBackupTable().then((res) => {
      if (res.data.data) {
        const dataTablebackup = res.data.data?.map((item: any) => {
          return {
            key: item.id,
            filename: item.filename,
            created_at: item.created_at,
          };
        });
        setDatabackup(dataTablebackup);
      }
    });
  };

  const props: UploadProps = {
    name: 'file',
    action: apiUploadFileBackup,
    headers: {},
    beforeUpload: file => {
      const isGPGFile = file.name.includes('gpg');
      if (!isGPGFile) {
        message.error(`${file.name} is not a GPG file`);
      }
      return isGPGFile || Upload.LIST_IGNORE;
    },
    onChange(info) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        getSettingBackup();
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const propsConfigAnchor: UploadProps = {
    name: 'file',
    action: apiUploadFileConfigAnchor,
    method: 'put',
    headers: {},
    beforeUpload: file => {
      const isXmlFile = file.type === 'text/xml';
      if (!isXmlFile) {
        message.error(`${file.name} is not a xml file`);
      }
      return isXmlFile || Upload.LIST_IGNORE;
    },
    onChange(info) {
      if (info.file.status === 'uploading') {
        setConfigurationingAnchor(true);
      } else if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        setConfigurationingAnchor(false);
        getSettingBackup();
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
        setConfigurationingAnchor(false);
      }
    },
  };

  const downloadFileBackup = async (fileName: string) => {
    try {
      setDowloadingConfig(true);
      const res = await downloadFileBackupApi(fileName);
      setDowloadingConfig(false);
      if (res.data) {
        fileDownload(res.data, fileName);
      }
    } catch (err) {
      Promise.reject(err);
    }
  };

  const deleteFileBackup = async (fileName: string) => {
    try {
      const res = await deleteFileBackupApi(fileName);
      if (res) {
        message.success(`${fileName} deleted`);
        getSettingBackup();
      }
    } catch (err) {
      Promise.reject(err);
    }
  };

  const backupConfig = async () => {
    try {
      setBackuping(true);
      const res = await backupConfigApi();
      setBackuping(false);
      const resData = res.data.data;
      if (resData) {
        message.success(`Backup ${resData.filename} successfully created`);
        getSettingBackup();
      }
    } catch (err) {
      Promise.reject(err);
    }
  };

  const getTimestapingServices = async () => {
    try {
      const res = await getTimestapingServiceApi();
      const resData = res.data.data;
      if (resData) {
        setListTimestapingServie(resData.map((dataMap: any, index: number) => {
          return {
            label: dataMap.name,
            value: dataMap,
            key: index
          };
        }));
      }
    } catch (err) {
      Promise.reject(err);
    }
  };

  const downloadConfig = async () => {
    try {
      const res = await downloadConfigApi();
      if (res.data) {
        fileDownload(res.data, 'configuration_anchor.xml');
      }
    } catch (err) {
      Promise.reject(err);
    }
  };

  const deleteTimestampingServices = async (dataSet: FixedDataType) => {
    try {
      const req = {name: dataSet.name, url: dataSet.url};
      const res = await deleteTimestampingServicesApi(req);
      if (res) {
        message.success('Timestamping service successfully deleted ');
        getSettingtime();
      }
    } catch (err) {
      Promise.reject(err);
    }
  };

  const closeModal = () => {
    setOpenAddTimestampingServices(false);
  };

  const openModal = () => {
    setOpenAddTimestampingServices(true);
  };

  const onChangeRadioValue = (e: RadioChangeEvent) => {
    setRadioValue(e.target.value);
  };

  const addTempstampingService = async () => {
    if (radioValue) {
      try {
        const res = await addTimestapingServiceApi(radioValue);
        if (res) {
          getSettingtime();
          closeModal();
          message.success('Timestamping service added ');
        }
      } catch (err) {
        Promise.reject(err);
      }
    }
  };

  const xoaPhanTuTrungLap = async () => {
    let temp = listTimestapingServie;
    if(listTimestapingServie.length>0 && datasettingtime.length>0) {
      datasettingtime.forEach((item: any) => {
        temp = temp.filter((timestaping: any) => {return timestaping.label != item.name;});
      });
    }
    setListTimestapingServieFilter(temp);
  };

  return {
    data,
    datasetting,
    datasettingtime,
    datasettingCA,
    databackup,
    setDatasetting,
    getSetting,
    getSettingtime,
    setDatasettingtime,
    getSettingCA,
    setDatasettingCA,
    setDatabackup,
    getSettingBackup,
    props,
    downloadFileBackup,
    deleteFileBackup,
    backupConfig,
    isBackuping,
    isDowloadingConfig,
    downloadConfig,
    propsConfigAnchor,
    deleteTimestampingServices,
    isConfigurationingAnchor,
    openAddTimestampingServices,
    closeModal,
    openModal,
    onChangeRadioValue,
    radioValue,
    getTimestapingServices,
    listTimestapingServie,
    addTempstampingService,
    xoaPhanTuTrungLap,
    listTimestapingServieFilter
  };
};

export interface DataType {
  key?: React.Key;
  created_at: string;
  hash: string;
}

export interface FixedDataType {
  key?: React.Key;
  name: string;
  url: string;
}

export interface CADataType {
  key?: React.Key;
  name: string;
  subject_distinguished_name: string;
  issuer_distinguished_name: string;
  ocsp_response: string;
  not_after: string;
  top_ca: boolean;
  path: string;
  authentication_only: boolean;
}

export interface BackupDataType {
  key?: React.Key;
  filename: string;
  created_at: string;
}
