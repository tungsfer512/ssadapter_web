import {Button, Card, Col, message, Row, Upload, UploadProps} from 'antd';
import React from "react";
import {UploadOutlined} from "@ant-design/icons";

const props: UploadProps = {
    name: 'file',
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

const Step1 = () => {
    return (
        <Card bodyStyle={{ height: '100%', minHeight: '200px' }}>
            <Row>
                <Col span={16}>Import the configuration anchor provided by the Central Server's administrator.</Col>
                <Col span={8}>
                    <Upload {...props}>
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                </Col>
            </Row>
        </Card>
    );
};

export default Step1;
