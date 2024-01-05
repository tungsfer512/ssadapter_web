import { Card, Form, Select } from 'antd';
import { unitName } from '@/services/base/constant';
import { useState } from 'react';

const InternalServers = () => {
	const [connection_type, setConnection_type] = useState('HTTP');

	const changeConnectionType = (value: any) => {
		setConnection_type(value);
		console.log('value', value);
	};

	return (
		<>
			<Card title='Connection type'>
				<Select
					style={{ width: '100%', maxWidth: '240px' }}
					placeholder='Select a option and change input text above'
					allowClear
					defaultValue={'HTTP'}
					onChange={(value) => changeConnectionType(value)}
				>
					<Select.Option value='HTTP'>HTTP</Select.Option>
					<Select.Option value='HTTPS'>HTTPS</Select.Option>
				</Select>
			</Card>
		</>
	);
};

export default InternalServers;
