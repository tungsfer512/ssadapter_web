/* eslint-disable no-underscore-dangle */
import rules from '@/utils/rules';
import { Form, Input, Button, Card, Spin, DatePicker, InputNumber, Col, Row, Select, Upload, Tabs, Modal } from 'antd';
import { useModel } from 'umi';

const layout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 16 },
};
const tailLayout = {
	wrapperCol: { offset: 8, span: 16 },
};

const { TabPane } = Tabs;

const normFile = (e: any) => {
	console.log('Upload event:', e);

	if (Array.isArray(e)) {
		return e;
	}
	return e && e.fileList;
};

const FormAddWSDL = () => {
	const [formWSDL] = Form.useForm();
	const serviceDCModel = useModel('Clients.serviceDescriptrionsClient');
	const urlPath = window.location.pathname.split('/');

	const id = urlPath[urlPath.length - 2];

	const handleFinish = async (values: any) => {
		await serviceDCModel.AddClientServiceWSDLAll({ ...values, id: id });
		serviceDCModel.hideModalWSDL();
		serviceDCModel.getServiceDescriptrionsAll(id);
		// console.log(payload);
	};

	const handleFinishFile = async (values: any) => {};

	return (
		<Modal
			title='Add WSDL'
			open={serviceDCModel.isOpenModalWSDL}
			onOk={serviceDCModel.hideModalWSDL}
			onCancel={serviceDCModel.hideModalWSDL}
			footer={null}
		>
			<Form
				id='formWSDL'
				{...layout}
				form={formWSDL}
				onFinish={handleFinish}
				initialValues={{
					...(serviceDCModel.recordService ?? {}),
				}}
			>
				<Form.Item label='URL' name='url' rules={[...rules.required]}>
					<Input placeholder='Insert URL' name='url' />
				</Form.Item>
				<Form.Item label='Mo ta Service Description' name='descriptiondescription'>
					<Input placeholder='Mo ta Service Description' name='descriptiondescription' />
				</Form.Item>
				<Form.Item label='Mo taservice' name='description'>
					<Input placeholder='Mo taservice' name='description' />
				</Form.Item>
				<Form.Item {...tailLayout}>
					<Button
						type='primary'
						htmlType='button'
						onClick={serviceDCModel.hideModalWSDL}
						style={{ marginRight: '8px' }}
					>
						Cancel
					</Button>
					<Button type='primary' htmlType='submit'>
						Save
					</Button>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default FormAddWSDL;
