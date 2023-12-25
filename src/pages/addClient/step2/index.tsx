import {Button, Card, Radio, Space} from 'antd';
import {useModel} from "@@/plugin-model/useModel";
import React from "react";

const AddClientStep2 = () => {
  const {prevStep, nextStep, changeSelectToken, listTokenStep2, tokenSelected} = useModel('addClient.addClient');

  return (
    <>
      <Card>
        <p>Please select the token where you want to add the SIGN key for the new Client. Note: the token must be in
          Logged in state. </p>
        <Radio.Group onChange={changeSelectToken} options={listTokenStep2} value={tokenSelected}>
        </Radio.Group>
      </Card>

      <Space style={{width: '100%', justifyContent: 'flex-end', marginTop: '20px'}}>
        <Button onClick={prevStep}>Back</Button>
        <Button type="primary" onClick={nextStep}>Continue</Button>
      </Space>
    </>
  );
};

export default AddClientStep2;

