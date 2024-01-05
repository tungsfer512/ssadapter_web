/* eslint-disable no-underscore-dangle */
import rules from '@/utils/rules';
import {
	Form,
	Input,
	Button,
	Card,
	Spin,
	DatePicker,
	InputNumber,
	Col,
	Row,
	Select,
	Upload,
	Tabs,
	Modal,
	Checkbox,
} from 'antd';
import { useModel } from 'umi';

const layout = {
	labelCol: { span: 6 },
	wrapperCol: { offset: 0, span: 18 },
};
const tailLayout = {
	wrapperCol: { offset: 0, span: 16 },
};

const { TabPane } = Tabs;

const normFile = (e: any) => {
	console.log('Upload event:', e);

	if (Array.isArray(e)) {
		return e;
	}
	return e && e.fileList;
};

const FormServiceEnpoints = () => {
	const serviceDCModel = useModel('Clients.serviceDescriptrionsClient');
	const urlPath = window.location.pathname.split('/');
	const clientId = urlPath[2];
	const serviceId = urlPath[4];

	const tmp = serviceId.split(':');
	const service_code = tmp[tmp.length - 1];

	const handleFinish = async (values: any) => {
		const data = {
			...values,
			serviceId: serviceId,
			service_code: service_code,
		};
		console.log('data', data);
		await serviceDCModel.addEndpointAll(data);
		serviceDCModel.getMemberList(clientId, serviceId);
		serviceDCModel.getAccessRightsList(clientId, serviceId);
		serviceDCModel.getEndpointsByIdAll(serviceId);

		serviceDCModel.hideModalEndpoint();
		// console.log(payload);
	};

	const handleFinishFile = async (values: any) => {};

	return (
		<Modal
			title={serviceDCModel.isEditEndpoint ? 'Edit Endpoint' : 'Add Endpoint'}
			open={serviceDCModel.isOpenModalEndpoint}
			onOk={serviceDCModel.hideModalEndpoint}
			onCancel={serviceDCModel.hideModalEndpoint}
			footer={null}
		>
			<Form
				id='formServiceEndpoints'
				{...layout}
				form={serviceDCModel.formServiceEndpoints}
				onFinish={handleFinish}
				initialValues={serviceDCModel.isEditEndpoint ? serviceDCModel.recordEndpoints : null}
			>
				<Form.Item label={<strong>HTTP Request Method</strong>} name='method' rules={[...rules.required]}>
					<Select placeholder='Select a option and change input text above' allowClear defaultValue={'*'}>
						<Select.Option value='*'>ALL</Select.Option>
						<Select.Option value='GET'>GET</Select.Option>
						<Select.Option value='POST'>POST</Select.Option>
						<Select.Option value='PUT'>PUT</Select.Option>
						<Select.Option value='PATCH'>PATCH</Select.Option>
						<Select.Option value='DELETE'>DELETE</Select.Option>
						<Select.Option value='OPTIONS'>OPTIONS</Select.Option>
						<Select.Option value='HEAD'>HEAD</Select.Option>
						<Select.Option value='TRACE'>TRACE</Select.Option>
					</Select>
				</Form.Item>
				<Form.Item label={<strong> Path</strong>} name='path' rules={[...rules.required]}>
					{/* defaul value start with '/' */}
					<Input placeholder='Insert URL' name='path' defaultValue={'/'} />
				</Form.Item>
				<Form.Item label={<strong>Name</strong>} name='name' rules={[...rules.required]}>
					<Input placeholder='Ten endpoints' name='name' />
				</Form.Item>
				<Form.Item label={<strong>Description</strong>} name='description'>
					<Input placeholder='Mo ta endpoint' name='description' />
				</Form.Item>
				<Form.Item label={<strong>Input Description</strong>} name='input_description'>
					<Input placeholder='Mo ta dau vao endpoint' name='input_description' />
				</Form.Item>
				<Form.Item label={<strong>Output Description</strong>} name='output_description'>
					<Input placeholder='Mo ta dau ra endpoint' name='output_description' />
				</Form.Item>
				<Form.Item {...tailLayout} style={{ display: 'flex', justifyContent: 'flex-end' }}>
					<Button type='primary' htmlType='submit' style={{}} shape='round'>
						Save
					</Button>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default FormServiceEnpoints;
