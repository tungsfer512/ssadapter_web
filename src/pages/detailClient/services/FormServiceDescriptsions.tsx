/* eslint-disable no-underscore-dangle */
import rules from '@/utils/rules';
import { DeleteOutlined } from '@ant-design/icons';
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
	Popconfirm,
} from 'antd';
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

const FormServiceDescriptsions = () => {
	const [formDetails] = Form.useForm();
	const serviceDCModel = useModel('Clients.serviceDescriptrionsClient');
	const urlPath = window.location.pathname.split('/');

	const id = urlPath[urlPath.length - 2];

	const handleFinish = async (values: any) => {
		const payload = {
			id: values.id,
			rest_service_code: values.rest_service_code,
			new_rest_service_code: values.service_code,
			url: values.url,
			type: values.type,
			ignore_warnings: false,
			description: values.description,
			descriptiondescription: values.descriptiondescription,
		};

		await serviceDCModel.editServiceDescriptrionsAll(payload);
		serviceDCModel.hideModalDetails();
		serviceDCModel.getServiceDescriptrionsAll(id);
		// console.log(payload);
	};

	const handleDelete = async (record: any) => {
		await serviceDCModel.deleteServiceDescriptrionsAll(record);
		serviceDCModel.hideModalDetails();
		serviceDCModel.getServiceDescriptrionsAll(id);
	};

	const handleFinishFile = async (values: any) => {};

	return (
		<Modal
			title='REST details'
			open={serviceDCModel.isOpenModalDetails}
			onOk={serviceDCModel.hideModalDetails}
			onCancel={serviceDCModel.hideModalDetails}
			footer={null}
		>
			<Popconfirm
				title='Are you sure that you want to delete this REST Service? '
				okText='Yes'
				cancelText='Cancel'
				onConfirm={() => handleDelete(serviceDCModel.recordService)}
			>
				<div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', paddingRight: '36px' }}>
					<Button type='primary' shape='round'>
						Delete
					</Button>
				</div>
			</Popconfirm>
			<br />
			<Form
				id='formDetails'
				{...layout}
				form={formDetails}
				onFinish={handleFinish}
				initialValues={{
					...(serviceDCModel.recordService ?? {}),
				}}
			>
				<Form.Item label='Id' name='id' hidden={true}>
					<Input placeholder='Id' name='id' hidden={true} />
				</Form.Item>
				<Form.Item label='URL type' name='type'>
					<Input placeholder='URL type' name='type' disabled />
				</Form.Item>
				<Form.Item label='Edit URL' name='url'>
					<Input placeholder='URL' name='url' />
				</Form.Item>
				<Form.Item label='Rest Service Code' name='rest_service_code' hidden={true}>
					<Input placeholder='Rest Service Code' name='rest_service_code' hidden={true} />
				</Form.Item>
				<Form.Item label='Mo ta Service Description' name='descriptiondescription'>
					<Input placeholder='Mo ta Service Description' name='descriptiondescription' />
				</Form.Item>
				<Form.Item label='Mo taservice' name='description'>
					<Input placeholder='Mo taservice' name='description' />
				</Form.Item>
				<Form.Item label='Service Code' name='service_code'>
					<Input placeholder='Service Code' name='service_code' />
				</Form.Item>
				<Form.Item {...tailLayout}>
					<Button
						type='primary'
						htmlType='button'
						onClick={serviceDCModel.hideModalDetails}
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

export default FormServiceDescriptsions;
