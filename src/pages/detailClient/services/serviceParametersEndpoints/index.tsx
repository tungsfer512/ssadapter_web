import { Button, Card, Col, Form, Input, Modal, Row, Select, Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useModel } from '@@/plugin-model/useModel';
import { useEffect, useState } from 'react';
import { CloseCircleOutlined, CloseOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import FormServiceParameters from './FormServiceParameters';
import { history } from 'umi';
import FormServiceEnpoints from './FormServiceEnpoints';

const tabList = [
	{
		key: 'Service Parameters',
		tab: 'Service Parameters',
	},
	{
		key: 'Endpoints',
		tab: 'Endpoints',
	},
];

const ServiceParametersEndpoints = (props: any) => {
	const [activeTabKey1, setActiveTabKey1] = useState<string>('Service Parameters');
	const urlPath = window.location.pathname.split('/');
	const clientId = urlPath[2];
	const serviceId = urlPath[4];

	const serviceSplit = serviceId.split(':');
	const serviceName = serviceSplit[serviceSplit.length - 1];

	const onTab1Change = (key: string) => {
		setActiveTabKey1(key);
	};

	console.log('clientId', clientId);
	console.log('serviceId', serviceId);

	const {
		isOpenModalFormSubject,
		hideModalFormSubject,
		showModalFormSubject,
		getMemberList,
		getAccessRightsList,
		memberList,
		accessRightsList,
		removeAccessRightItem,
		removeAllAccessRightItem,
		formSubmitting,
		getAllService,
	} = useModel('Clients.serviceDescriptrionsClient');

	const serviceDCModel = useModel('Clients.serviceDescriptrionsClient');

	const confirm = (record: any) => {
		Modal.confirm({
			title: 'Remove access rights?',
			icon: <ExclamationCircleOutlined />,
			content: 'Are you sure you want to remove access rights from this service client? ',
			okText: 'Yes',
			cancelText: 'Cancel',
			onOk: async () => {
				await serviceDCModel.deleteEndpointAll(record.id);
				serviceDCModel.getEndpointsByIdAll(serviceId);
			},
		});
	};

	const confirmAll = () => {
		Modal.confirm({
			title: 'Remove access rights?',
			icon: <ExclamationCircleOutlined />,
			content: 'Are you sure you want to remove all access rights from this service client? ',
			okText: 'Yes',
			cancelText: 'Cancel',
			onOk: () => {
				removeAllAccessRightItem(clientId, serviceId);
				serviceDCModel.getAccessRightsList(clientId, serviceId);
			},
		});
	};

	const memberNameColumns: ColumnsType<any> = [
		{
			title: 'Member name / Group description',
			dataIndex: 'name',
			align: 'left',
		},
		{
			title: 'ID / Group code',
			dataIndex: 'local_group_code',
			align: 'left',
		},
		{
			title: 'Type',
			dataIndex: 'service_client_type',
			align: 'left',
		},
	];

	const accessRightsColumn: ColumnsType<any> = [
		{
			title: 'Member name / Group description',
			dataIndex: 'name',
			align: 'left',
		},
		{
			title: 'ID / Group code',
			dataIndex: 'id',
			align: 'left',
		},
		{
			title: 'Type',
			dataIndex: 'service_client_type',
			align: 'left',
		},
		{
			title: 'Access Rights given',
			dataIndex: 'rights_given_at',
			render(value, record, index) {
				return <div>{`${new Date(record.rights_given_at).toLocaleString()}`}</div>;
			},
			align: 'left',
		},
		{
			title: '',
			render: (val, rec) => {
				return (
					<Button className={'button-action'} onClick={() => confirm(rec)} ghost type='text'>
						Remove
					</Button>
				);
			},
		},
	];
	const accessRightsColumnEndpoints: ColumnsType<any> = [
		{
			title: 'HTTP Request Method',
			dataIndex: 'method',
			align: 'left',
		},
		{
			title: 'Path',
			dataIndex: 'path',
			align: 'left',
		},
		{
			title: '',
			render: (val, rec) => {
				return (
					<>
						<Button
							className={'button-action'}
							onClick={() => {
								console.log('rec', rec);

								serviceDCModel.showModalEndpoint();
								serviceDCModel.setIsEditEndpoint(true);
								serviceDCModel.setRecordEndpoints({
									...serviceDCModel.recordEndpoints,
									method: rec.method,
									path: rec.path,
									service_code: rec.service_code,
									id: rec.id,
								});
							}}
							ghost
							type='text'
						>
							Edit
						</Button>
						<Button className={'button-action'} onClick={() => confirm(rec)} ghost type='text'>
							Remove
						</Button>
						<Button
							className={'button-action'}
							onClick={() => {
								// /clients/:id/services-descriptrions/:serviceId/endpoints/:endpointId/accessrights
								const pathRemoveFirstSlash = rec.path.replace('/', '');
								history.push(
									`/clients/${clientId}/services-descriptrions/${serviceId}/endpoints/${rec.id}-${rec.method}-${pathRemoveFirstSlash}/accessrights`,
								);
							}}
							ghost
							type='text'
						>
							Access rights
						</Button>
					</>
				);
			},
		},
	];

	useEffect(() => {
		getMemberList(clientId, serviceId);
		getAccessRightsList(clientId, serviceId);
		serviceDCModel.getEndpointsByIdAll(serviceId);
		// getAllService(clientId);
	}, []);

	const rowSelection = {
		onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
			console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
			serviceDCModel.setSelectedRowKeys({
				items: selectedRows.map((item) => {
					return {
						id: item.id,
						service_client_type: item.service_client_type,
						name: item.name,
					};
				}),
				serviceId: serviceId,
			});
		},
	};

	const contentList: Record<string, React.ReactNode> = {
		'Service Parameters': (
			<>
				<div style={{ maxWidth: '900px', margin: 'auto', paddingTop: '32px' }}>
					<FormServiceParameters />
					<div className='control-bar' style={{ paddingTop: '40px', paddingBottom: '40px' }}>
						<h2>Access rights</h2>

						<Space style={{ justifyContent: 'flex-end' }}>
							<Button shape='round' onClick={() => confirmAll()}>
								Remove all
							</Button>
							<Button
								shape='round'
								onClick={() => {
									showModalFormSubject();
									serviceDCModel.getXroadInstances();
									serviceDCModel.getMemberClasses();
								}}
							>
								Add service
							</Button>
						</Space>
					</div>

					<Table columns={accessRightsColumn} dataSource={accessRightsList} pagination={false} />
				</div>
			</>
		),
		Endpoints: (
			<>
				<div style={{ maxWidth: '900px', margin: 'auto', paddingTop: '32px' }}>
					<Button
						type='primary'
						shape='round'
						onClick={serviceDCModel.showModalEndpoint}
						style={{ float: 'right', marginBottom: '20px' }}
					>
						Add endpoint
					</Button>
					<FormServiceEnpoints />

					<Table columns={accessRightsColumnEndpoints} dataSource={serviceDCModel.endPoints} pagination={false} />
				</div>
			</>
		),
	};

	const handleFinishFormSubject = async (values: any) => {
		for (const key in values) {
			if (values[key] === undefined || values[key] === '' || values[key] === null) {
				values[key] = '';
			}
		}
		console.log('values', values);
		serviceDCModel.setFilter(values);
		await serviceDCModel.searchServiceClientCandidates({
			id: clientId,
			...values,
		});
	};

	return (
		<>
			<Card
				style={{ width: '100%', maxWidth: '900px', margin: 'auto' }}
				title={
					<div>
						<h2>{`${serviceName}` || 'Service Parameters & Endpoints'}</h2>
					</div>
				}
				extra={
					<Button
						type='ghost'
						style={{ border: 'none' }}
						icon={<CloseOutlined />}
						onClick={() => {
							serviceDCModel.getMemberList(clientId, serviceId);
							return history.push(`/clients/${clientId}/services`);
						}}
					/>
				}
				tabList={tabList}
				activeTabKey={activeTabKey1}
				onTabChange={onTab1Change}
			>
				{contentList[activeTabKey1]}
			</Card>

			<Modal
				title='Add a subject'
				open={isOpenModalFormSubject}
				onCancel={hideModalFormSubject}
				okText='Add'
				width={600}
				cancelText='Cancel'
				className='hide-footer'
			>
				{/* <Table
					// rowSelection={{
					// 	type: 'Checkbox',
					// 	...rowSelection,
					// }}
					columns={memberNameColumns}
					dataSource={memberList}
					pagination={false}
				/> */}
				<Form
					layout='vertical'
					form={serviceDCModel.formSubject}
					initialValues={{}}
					onFinish={handleFinishFormSubject}
					// member_name_group_description=&member_group_code=&subsystem_code=&instance=CS&member_class=GOV&service_client_type=GLOBALGROUP
				>
					<Row gutter={[20, 20]}>
						<Col span={12}>
							<Form.Item label='Name' name='member_name_group_description'>
								<Input defaultValue={''} />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item label='Instance' name='instance'>
								<Select defaultValue={''}>
									<Select.Option value=''>All Instance</Select.Option>
									{serviceDCModel.xroadInstancesList?.map((item) => (
										<Select.Option value={item}>{item}</Select.Option>
									))}
								</Select>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item label='Member class' name='member_class'>
								<Select defaultValue={''}>
									<Select.Option value=''>All Member class</Select.Option>
									{serviceDCModel.memberClassesList?.map((item, idx) => (
										<Select.Option key={idx + 1} value={item}>
											{item}
										</Select.Option>
									))}
								</Select>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item label='Member/Group code' name='member_group_code'>
								<Input defaultValue={''} />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item label='Subject type' name='service_client_type'>
								<Select defaultValue={''}>
									<Select.Option value=''>All Subject type</Select.Option>
									{[
										{
											value: 'GLOBALGROUP',
											label: 'GLOBALGROUP',
										},
										{
											value: 'LOCALGROUP',
											label: 'LOCALGROUP',
										},
										{
											value: 'SUBSYSTEM',
											label: 'SUBSYSTEM',
										},
									].map((item, idx) => (
										<Select.Option key={idx + 1} value={item.value}>
											{item.label}
										</Select.Option>
									))}
								</Select>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item label='Subsystem code' name='subsystem_code'>
								<Input defaultValue={''} />
							</Form.Item>
						</Col>
						<Col span={24}>
							<Button type='primary' htmlType='submit' style={{ float: 'right' }} shape='round'>
								Tìm kiếm
							</Button>
						</Col>
					</Row>
				</Form>

				<Table
					rowSelection={{
						type: 'Checkbox',
						...rowSelection,
					}}
					columns={memberNameColumns}
					dataSource={(serviceDCModel.serviceClientCandidatesList || []).map((item, index) => ({
						...item,
						key: index,
					}))}
					pagination={false}
				/>

				<Space style={{ width: '100%', justifyContent: 'flex-end', paddingTop: '20px' }}>
					<Button onClick={hideModalFormSubject} shape='round'>
						Cancel
					</Button>
					<Button
						type='primary'
						loading={formSubmitting}
						htmlType='submit'
						shape='round'
						onClick={async () => {
							await serviceDCModel.addServiceClientOfServiceAll(serviceDCModel.selectedRowKeys);
							serviceDCModel.getAccessRightsList(clientId, serviceId);
							hideModalFormSubject();
						}}
					>
						Add subject
					</Button>
				</Space>
			</Modal>
		</>
	);
};

export default ServiceParametersEndpoints;
