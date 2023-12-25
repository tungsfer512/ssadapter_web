import React from 'react';
import './style.less';
import { Tabs } from 'antd';
import System from '@/pages/Settings/System Parameters';
import Backup from '@/pages/Settings/Backup And Restore';

const onChange = (key: string) => {
	console.log(key);
};

const Settings: React.FC = () => (
	<Tabs
		defaultActiveKey='1'
		onChange={onChange}
		items={[
			{
				label: `System Parameters`,
				key: '1',
				children: <System />,
			},
			{
				label: `Backup And Restore`,
				key: '2',
				children: <Backup/>,
			},
		]}
	/>
);

export default Settings;
