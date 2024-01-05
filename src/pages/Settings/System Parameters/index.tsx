import {Button, Card, Modal, Radio, Space, Table, Upload} from 'antd';
import {DownloadOutlined, ExclamationCircleOutlined, PlusCircleOutlined, UploadOutlined} from '@ant-design/icons';
import {useEffect} from 'react';
import {useModel} from 'umi';
import {ColumnsType} from "antd/es/table";
import {CADataType, DataType, FixedDataType} from "@/models/Settings/tableSettings";
import {CheckboxOptionType} from "antd/lib/checkbox/Group";
import {models} from "@@/plugin-model/Provider";

const SettingPage = () => {
  const settingModel = useModel('Settings.tableSettings');

  const confirm = (row: FixedDataType) => {
    Modal.confirm({
      title: 'Are you sure?',
      icon: <ExclamationCircleOutlined/>,
      content: 'Are you sure you want to delete the timestamping service? ',
      okText: 'Yes',
      cancelText: 'Cancel',
      onOk: () => {
        settingModel.deleteTimestampingServices(row);
      }
    });
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'HASH (SHA:224)',
      dataIndex: 'hash',
      key: 'hash',

    },
    {title: 'GENERATED', dataIndex: 'created_at', key: 'created_at'},
  ];

  const fixedcolumns: ColumnsType<FixedDataType> = [
    {
      title: 'TIMESTAMPING SERVICE',
      dataIndex: 'name',
      key: 'name',
    },
    {title: 'SERVICE URL ', dataIndex: 'url', key: 'url'},
    {
      render: (val, rec) => {
        return (
          <Button className={'button-action'} ghost type="text" onClick={() => confirm(rec)}>Delete</Button>
        );
      }
    }
  ];

  const CAcolumns: ColumnsType<CADataType> = [
    {
      title: 'DISTINGUISHED NAME',
      dataIndex: 'subject_distinguished_name',
      key: 'subject_distinguished_name',
    },
    {title: 'OCSP RESPONSE', dataIndex: 'ocsp_response', key: 'ocsp_response'},
    {title: 'EXPIRES', dataIndex: 'not_after', key: 'not_after'},
  ];

  useEffect(() => {
    settingModel.getSetting();
  }, []);

  useEffect(() => {
    settingModel.getSettingtime();
  }, []);

  useEffect(() => {
    settingModel.getSettingCA();
  }, []);

  useEffect(() => {
    settingModel.getTimestapingServices();
  }, []);

  useEffect(() => {
    settingModel.xoaPhanTuTrungLap();
  }, [settingModel.datasettingtime, settingModel.listTimestapingServie]);

  return (
    <>
      <div className='control-bar'>
        <div className='control-bar-left'>
          <h1 className='page-title'>System parameters</h1>
        </div>
      </div>

      <Card style={{marginTop: '5px'}} bodyStyle={{padding: '0px'}}>
        <div className='control-bar px-15'>
          <div className='control-bar-left'>
            <h2 className='page-title'>Configuration Anchor</h2>
          </div>
          <div className='control-bar-right'>
            <Space>
              <Button shape='round' icon={<DownloadOutlined/>} loading={settingModel.isDowloadingConfig}
                      onClick={() => settingModel.downloadConfig()}>
                Download
              </Button>
              <Upload {...settingModel.propsConfigAnchor} showUploadList={false}>
                <Button type="primary" shape="round" icon={<UploadOutlined/>}
                        loading={settingModel.isConfigurationingAnchor}>
                  Upload
                </Button>
              </Upload>
            </Space>
          </div>
        </div>
        <Table columns={columns} dataSource={settingModel.datasetting} pagination={false}/>
      </Card>
      <Card style={{marginTop: '20px'}} bodyStyle={{padding: '0px'}}>
        <div className='control-bar px-15'>
          <div className='control-bar-left'>
            <h2 className='page-title'>Timestamping Services</h2>
          </div>
          <div className='control-bar-right'>
            <Space>
              <Button shape='round' icon={<PlusCircleOutlined/>} onClick={settingModel.openModal}>Add</Button>
            </Space>
          </div>
        </div>
        <Table columns={fixedcolumns} dataSource={settingModel.datasettingtime} pagination={false}/>
      </Card>
      <Card style={{marginTop: '20px'}} bodyStyle={{padding: '0px'}}>
        <div className='control-bar px-15'>
          <div className='control-bar-left'>
            <h2 className='page-title'>Approved Certificate Authorities </h2>
          </div>
        </div>
        <Table columns={CAcolumns} dataSource={settingModel.datasettingCA} pagination={false}/>
      </Card>
      <Modal title="Add Timestamping Service"
             okText="Add"
             cancelText="Cancel"
             onOk={settingModel.addTempstampingService}
             open={settingModel.openAddTimestampingServices}
             onCancel={settingModel.closeModal}
             okButtonProps={{disabled: !Boolean(settingModel.radioValue)}}>
        <h3>Trusted Timestamping services: </h3>
        <Radio.Group
          options={settingModel.listTimestapingServieFilter}
          onChange={settingModel.onChangeRadioValue}
          value={settingModel.radioValue}></Radio.Group>
      </Modal>
    </>
  );
};

export default SettingPage;
