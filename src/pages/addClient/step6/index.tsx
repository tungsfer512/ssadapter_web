import {Card} from 'antd';
import React from "react";
import {useModel} from "@@/plugin-model/useModel";

const TrangChu = () => {
  const {} = useModel('addClient.addClient');

    return (
        <Card>
            <p>All required information is collected. By clicking "Submit", the new client will be added to the Clients list and the new key and CSR will appear in the Keys and Certificates view.</p>
            <p>In order to register the new client, please complete the following steps:</p>
            <p>1) Send the CSR to a Certificate Authority for signing</p>
            <p>2) Once received back, import the resulting certificate to the corresponding key</p>
            <p>3) At this point you can register the new client</p>
            <p>NOTE: if you click Cancel, all data will be lost</p>
        </Card>
    );
};

export default TrangChu;
