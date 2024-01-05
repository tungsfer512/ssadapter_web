import {Card, Form, Input} from 'antd';
import {useState} from "react";
type LayoutType = Parameters<typeof Form>[0]['layout'];

const Step3 = () => {
    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState<LayoutType>('vertical');

    const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
        setFormLayout(layout);
    };

    const formItemLayout =
        formLayout === 'horizontal' ? { labelCol: { span: 4 }, wrapperCol: { span: 14 } } : null;

    const buttonItemLayout =
        formLayout === 'horizontal' ? { wrapperCol: { span: 14, offset: 4 } } : null;

    return (
        <Card bodyStyle={{ height: '100%' }}>
            <div>
                <p>The software token is the place where the Security Server’s AUTH keys is stored. Please define a PIN to log-in into the software token.</p>
                <Form
                    {...formItemLayout}
                    layout={formLayout}
                    form={form}
                    initialValues={{ layout: formLayout }}
                    onValuesChange={onFormLayoutChange}
                    style={{ maxWidth: formLayout === 'inline' ? 'none' : 600 }}
                >
                    <Form.Item label="Pin">
                        <Input placeholder="input placeholder" />
                    </Form.Item>
                    <Form.Item label="Confirm pin">
                        <Input placeholder="input placeholder" />
                    </Form.Item>
                </Form>
                <p>All required information is collected, press the Submit button to to initialise the Security Server. </p>
                <p>Once the initialisation is done, you must complete the Security Server configuration - simply click the Configure button in the toast notification that will appear in a few moments.  </p>
            </div>
        </Card>
    );
};

export default Step3;
