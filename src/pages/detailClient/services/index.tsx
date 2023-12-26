import { SettingOutlined } from '@ant-design/icons';
import { Card, Collapse, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { unitName } from '@/services/base/constant';
import { useModel } from 'umi';
import { IService } from '@/models/Clients/serviceDescriptrionsClient';
import { Switch } from 'antd';

const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const Services: React.FC = () => {
	const serviceDCModel = useModel('Clients.serviceDescriptrionsClient');
	const urlPath = window.location.pathname.split('/');
	const id = urlPath[urlPath.length - 2];

	console.log(id);
	const onChange = (key: string | string[]) => {
		console.log(key);
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
		<Card bodyStyle={{ height: '100%' }}>
			<Collapse onChange={onChange}>
				{serviceDCModel.serviceList.map((item: any) => {
					return (
						<Panel header={`${item?.type} (${item?.url})`} key={item?.id} style={{ position: 'relative', zIndex: 0 }}>
							<div style={{ float: 'right', marginBottom: '16px' }}>{`Last refreshed: ${new Date(
								item?.refreshed_at,
							).toLocaleString('en-US')}`}</div>
							<Switch
								checked={!item?.disabled}
								onChange={() => onChangeSwitch(item)}
								style={{ position: 'absolute', right: '16px', top: '12px', zIndex: 1 }}
							/>
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
	);
};

export default Services;
