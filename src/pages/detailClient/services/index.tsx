import { PlusCircleOutlined, SettingOutlined } from '@ant-design/icons';
import { Card, Collapse, Select, Table, Button, Modal, Form } from 'antd';
import React, { useEffect, useState } from 'react';
import { unitName } from '@/services/base/constant';
import { useModel } from 'umi';
import { IService } from '@/models/Clients/serviceDescriptrionsClient';
import { Switch } from 'antd';
import rules from '@/utils/rules';
import { Input, Space } from 'antd';
import FormServiceDescriptsions from './FormServiceDescriptsions';

const { Panel } = Collapse;
const { Search } = Input;

const Services: React.FC = () => {
	const serviceDCModel = useModel('Clients.serviceDescriptrionsClient');
	const urlPath = window.location.pathname.split('/');

	const id = urlPath[urlPath.length - 2];

	// console.log(id);
	const onChange = (key: string | string[]) => {
		console.log(key);
	};

	const onSearch = (value: string) => {
		// console.log(value);
		if (value === '') {
			serviceDCModel.getServiceDescriptrionsAll(id);
		}
		serviceDCModel.setServiceList(serviceDCModel.serviceList.filter((item: any) => item.url.includes(value)));
	};

	const onChangeSwitch = async (item: any) => {
		console.log(item);
		if (item.disabled) {
			await serviceDCModel.enableClientServiceAll(item.id);
		} else {
			await serviceDCModel.disableClientServiceAll({ id: item.id, disabled_notice: 'test' });
		}
		serviceDCModel.getServiceDescriptrionsAll(id);
	};

	useEffect(() => {
		serviceDCModel.getServiceDescriptrionsAll(id);
	}, []);

	return (
		<>
			<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
				<Search placeholder='Search' style={{ width: 200 }} onChange={(e) => onSearch(e.target.value)} />
				<div className='flex'>
					<Button type='primary' onClick={serviceDCModel.showModalREST} icon={<PlusCircleOutlined />}>
						Add REST
					</Button>
					<Modal
						title='Add REST'
						open={serviceDCModel.isOpenModalREST}
						onOk={serviceDCModel.hideModalREST}
						onCancel={serviceDCModel.hideModalREST}
						footer={null}
					>
						<p>Some contents...</p>
						<p>Some contents...</p>
						<p>Some contents...</p>
					</Modal>
					<Button type='primary' className='mr-2'>
						<SettingOutlined />
					</Button>
				</div>
			</div>
			<Card bodyStyle={{ height: '100%' }}>
				<Collapse onChange={onChange}>
					{serviceDCModel.serviceList.map((item: any) => {
						return (
							<Panel
								header={
									!item?.disabled ? `Enable - ${item?.type} (${item?.url})` : `Disable - ${item?.type} (${item?.url})`
								}
								key={item?.id}
								style={{ position: 'relative', zIndex: 0 }}
							>
								<div style={{ float: 'right', marginBottom: '16px' }}>{`Last refreshed: ${new Date(
									item?.refreshed_at,
								).toLocaleString('en-US')}`}</div>
								<div
									style={{
										position: 'absolute',
										right: '16px',
										top: '8px',
										zIndex: 1,
										display: 'flex',
										gap: '8px',
										alignItems: 'center',
									}}
								>
									<Button
										type='link'
										onClick={() => {
											serviceDCModel.showModalDetails();
											serviceDCModel.setRecordService({
												...serviceDCModel.recordService,
												...item?.services[0],
												type: item?.type,
												rest_service_code: item?.services[0]?.service_code,
												id: item?.id,
											});
										}}
									>
										Details
									</Button>
									<FormServiceDescriptsions />
									<Switch checked={!item?.disabled} onChange={() => onChangeSwitch(item)} />
								</div>
								<br />
								<Table
									columns={[
										{
											title: 'Service Code',
											dataIndex: 'service_code',
											key: 'service_code',
											render(value, record, index) {
												return <a href='#record'>{value}</a>;
											},
										},
										{
											title: 'URL',
											dataIndex: 'service_url',
											key: 'service_url',
										},
										{
											title: 'Timeout',
											dataIndex: 'timeout',
											key: 'timeout',
										},
									]}
									// onRow={(record: any) => {
									// 	return {
									// 		onClick: () => {
									// 			console.log(record);
									// 		},
									// 	};
									// }}
									pagination={false}
									dataSource={item?.services.map((item: IService) => {
										return {
											key: item.id,
											service_code: item.service_code,
											service_url: item.url,
											timeout: item.timeout,
										};
									})}
								/>
							</Panel>
						);
					})}
				</Collapse>
			</Card>
		</>
	);
};

export default Services;
