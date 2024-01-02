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

const FormAddREST = () => {
	const [formREST] = Form.useForm();
	const serviceDCModel = useModel('Clients.serviceDescriptrionsClient');
	const urlPath = window.location.pathname.split('/');

	const id = urlPath[urlPath.length - 2];

	const handleFinish = async (values: any) => {
		await serviceDCModel.AddClientServiceRESTAll({ ...values, id: id });
		serviceDCModel.hideModalREST();
		serviceDCModel.getServiceDescriptrionsAll(id);
		// console.log(payload);
	};

	const handleFinishFile = async (values: any) => {};

	return (
		<Modal
			title='Add REST'
			open={serviceDCModel.isOpenModalREST}
			onOk={serviceDCModel.hideModalREST}
			onCancel={serviceDCModel.hideModalREST}
			footer={null}
		>
			<Form
				id='formREST'
				{...layout}
				form={formREST}
				onFinish={handleFinish}
				initialValues={{
					...(serviceDCModel.recordService ?? {}),
				}}
			>
				<Form.Item label='URL type' name='type' rules={[...rules.required]}>
					<Select placeholder='Select URL type' name='type'>
						<Select.Option value='REST'>REST API Base Path</Select.Option>
						<Select.Option value='WSDL'>OpenAPI 3 Description</Select.Option>
					</Select>
				</Form.Item>
				<Form.Item label='URL' name='url' rules={[...rules.required]}>
					<Input placeholder='Insert URL' name='url' />
				</Form.Item>
				<Form.Item label='Rest Service Code' name='rest_service_code' rules={[...rules.required]}>
					<Input placeholder='Rest Service Code' name='rest_service_code' />
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
						onClick={serviceDCModel.hideModalREST}
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

export default FormAddREST;
