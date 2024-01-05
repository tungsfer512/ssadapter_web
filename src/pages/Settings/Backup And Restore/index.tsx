import {Button, Card, Modal, Space, Table, Upload} from 'antd';
import {DatabaseOutlined, ExclamationCircleOutlined, UploadOutlined} from '@ant-design/icons';
import {useEffect} from 'react';
import {useModel} from 'umi';
import {BackupDataType} from '@/models/Settings/tableSettings';
import {ColumnsType} from 'antd/lib/table';

const Backup = () => {
  const settingModel = useModel('Settings.tableSettings');
  useEffect(() => {
    settingModel.getSettingBackup();
  }, []);

  const confirm = (fileName: string) => {
    Modal.confirm({
      title: 'Are you sure?',
      icon: <ExclamationCircleOutlined/>,
      content: `Are you sure you want to delete backup ${fileName}?`,
      okText: 'Yes',
      cancelText: 'Cancel',
      onOk: () => {
        settingModel.deleteFileBackup(fileName);
      }
    });
  };

  const backcolumns: ColumnsType<BackupDataType> = [
    {
      title: 'Name',
      dataIndex: 'filename',
      key: 'filename',
    },
    {
      title: '',
      render: (val, rec) => {
        return (
          <Button className={'button-action'}
                  onClick={() => settingModel.downloadFileBackup(rec.filename)}
                  ghost type="text">Download</Button>
        );
      }
    },
    {
      title: '',
      render: (val, rec) => {
        return (
          <Button className={'button-action'} ghost type="text" onClick={() => confirm(rec.filename)}>Delete</Button>
        );
      }
    },
  ];

  return (
    <>
      <div className='control-bar'>
        <div className='control-bar-left'>
          <h1 className='page-title'>Backup And Restore</h1>
        </div>
        <div className='control-bar-right'>
          <Space>
            <Button shape="round" loading={settingModel.isBackuping} icon={<DatabaseOutlined/>}
                    onClick={() => settingModel.backupConfig()}>
              Back up config
            </Button>
            <Upload {...settingModel.props} showUploadList={false}>
              <Button type="primary" shape="round" icon={<UploadOutlined/>}>
                Upload backup
              </Button>
            </Upload>
          </Space>
        </div>
      </div>

      <Card bodyStyle={{padding: '0px'}}>
        <Table columns={backcolumns} dataSource={settingModel.databackup} pagination={false}/>
      </Card>
    </>
  );
};

export default Backup;
