import {Button, Card, Form, Input} from 'antd';
import React, {useState} from "react";
import rules from "@/utils/rules";

type LayoutType = Parameters<typeof Form>[0]['layout'];
const Step2 = () => {
    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState<LayoutType>('horizontal');

    const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
        setFormLayout(layout);
    };

    const formItemLayout =
        formLayout === 'horizontal' ? { labelCol: { span: 8 }, wrapperCol: { span: 16 } } : null;

    return (
        <Card bodyStyle={{ height: '100%' }}>
            <Form
                {...formItemLayout}
                layout={formLayout}
                form={form}
                initialValues={{ layout: formLayout }}
                onValuesChange={onFormLayoutChange}
            >
                <Form.Item label="Member Name">
                    <Input placeholder="input placeholder" rules={[...rules.required]}/>
                </Form.Item>
                <Form.Item label="Member Class">
                    <Input placeholder="input placeholder" rules={[...rules.required]}/>
                </Form.Item>
                <Form.Item label="Member Code">
                    <Input placeholder="input placeholder" rules={[...rules.required]}/>
                </Form.Item>
                <Form.Item label="Security Server Code">
                    <Input placeholder="input placeholder" />
                </Form.Item>
            </Form>
        </Card>
    );
};

export default Step2;
