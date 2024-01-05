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

const FormServiceParameters = () => {
	const serviceDCModel = useModel('Clients.serviceDescriptrionsClient');
	const urlPath = window.location.pathname.split('/');
	const clientId = urlPath[2];
	const serviceId = urlPath[4];

	const handleFinish = async (values: any) => {
		const data = {
			...values,
			clientId: clientId,
			serviceId: serviceId,
		};
		console.log('data', data);
		await serviceDCModel.editSerciceByIdAll(data);
		serviceDCModel.getMemberList(clientId, serviceId);
		serviceDCModel.getAccessRightsList(clientId, serviceId);
		// console.log(payload);
	};

	const handleFinishFile = async (values: any) => {};

	return (
		<Form
			id='formServiceParameters'
			{...layout}
			form={serviceDCModel.formServiceParameters}
			onFinish={handleFinish}
			initialValues={{
				...(serviceDCModel.recordClientsService ?? {}),
			}}
		>
			<Form.Item
				label={<strong>ServiceParameters URL</strong>}
				tooltip={<span>The URL where requests targeted at the service are directed</span>}
				name='url'
				rules={[...rules.required]}
			>
				<Input placeholder='Insert URL' name='url' />
			</Form.Item>
			<Form.Item
				label={<strong> Timeout (s)</strong>}
				tooltip={<span>The maximum duration of a request to the service, in seconds</span>}
				name='timeout'
				rules={[...rules.required]}
			>
				<Input placeholder='Timeout' name='timeout' type='number' min={0} />
			</Form.Item>
			<Form.Item
				label={<strong> Verify TLS certificate</strong>}
				tooltip={<span>Verify TLS certificate when a secure connection is established</span>}
				name='ssl_auth'
			>
				<Checkbox name='ssl_auth' disabled />
			</Form.Item>
			<Form.Item label={<strong>Description</strong>} name='description'>
				<Input placeholder='Mo ta taservice' name='description' />
			</Form.Item>
			<Form.Item {...tailLayout} style={{ display: 'flex', justifyContent: 'flex-end' }}>
				<Button type='primary' htmlType='submit' style={{}} shape='round'>
					Save
				</Button>
			</Form.Item>
		</Form>
	);
};

export default FormServiceParameters;
