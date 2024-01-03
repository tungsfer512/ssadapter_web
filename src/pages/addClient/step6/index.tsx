import {Button, Card, Space} from 'antd';
import {useModel} from "@@/plugin-model/useModel";
import React from "react";

const AddClientStep6 = () => {
  const model = useModel('addClient.addClient');

    return (
      <>
        <Card>
          <p>All required information is collected. By clicking "Submit", the new client will be added to the Clients list and the new key and CSR will appear in the Keys and Certificates view.</p>
          <p>In order to register the new client, please complete the following steps:</p>
          <p>1) Send the CSR to a Certificate Authority for signing</p>
          <p>2) Once received back, import the resulting certificate to the corresponding key</p>
          <p>3) At this point you can register the new client</p>
          <p>NOTE: if you click Cancel, all data will be lost</p>
        </Card>
        <Space style={{width: '100%', justifyContent: 'flex-end', marginTop: '20px'}}>
          <Button onClick={() => model.cancel()}>Cancel</Button>
          <Button onClick={model.prevStep}>Back</Button>
          <Button type="primary" onClick={() => model.finishCreateClient()}>Continue</Button>
        </Space>
      </>
    );
};

export default AddClientStep6;
