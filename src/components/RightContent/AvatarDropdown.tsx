import { AppModules, landingUrl } from '@/services/base/constant';
import { GlobalOutlined, LogoutOutlined, SwapOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';
import { type ItemType } from 'antd/lib/menu/hooks/useItems';
import React from 'react';
import { useModel } from 'umi';
import { OIDCBounder } from '../OIDCBounder';
import HeaderDropdown from './HeaderDropdown';
import styles from './index.less';
import { currentRole, keycloakAuthEndpoint } from '@/utils/ip';

export type GlobalHeaderRightProps = {
	menu?: boolean;
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
	const { initialState } = useModel('@@initialState');

	const loginOut = () => OIDCBounder.getActions()?.dangXuat();

	if (!initialState || !initialState.currentUser)
		return (
			<span className={`${styles.action} ${styles.account}`}>
				<Spin
					size='small'
					style={{
						marginLeft: 8,
						marginRight: 8,
					}}
				/>
			</span>
		);

	const items: ItemType[] = [
		{
			key: 'portal',
			icon: <GlobalOutlined />,
			label: 'Cổng thông tin',
			onClick: () => window.open(landingUrl),
		},
		{
			key: 'password',
			icon: <SwapOutlined />,
			label: 'Đổi mật khẩu',
			onClick: () => {
				const redirect = window.location.href;
				window.location.href = `${keycloakAuthEndpoint}?client_id=${AppModules[currentRole].clientId}&redirect_uri=${redirect}&response_type=code&scope=openid&kc_action=UPDATE_PASSWORD`;
			},
		},
		{ type: 'divider', key: 'divider' },
		{
			key: 'logout',
			icon: <LogoutOutlined />,
			label: 'Đăng xuất',
			onClick: loginOut,
			danger: true,
		},
	];

	if (menu && !initialState.currentUser.realm_access?.roles?.includes('QUAN_TRI_VIEN')) {
		// items.splice(1, 0, {
		//   key: 'password',
		//   icon: <LockOutlined />,
		//   label: 'Đổi mật khẩu',
		//   onClick: () =>
		//     window.open(
		//       keycloakAuthority +
		//         '/login-actions/required-action?execution=UPDATE_PASSWORD&client_id=' +
		//         keycloakClientID,
		//     ),
		// });
		// items.splice(1, 0, {
		//   key: 'center',
		//   icon: <UserOutlined />,
		//   label: 'Trang cá nhân',
		//   onClick: () => history.push('/account/center'),
		// });
	}

	return (
		<>
			<HeaderDropdown overlay={<Menu className={styles.menu} items={items} />}>
				<span className={`${styles.action} ${styles.account}`}>
					<Avatar
						className={styles.avatar}
						src={
							<img
								// style={currentUser?.avatar_path ? {} : { objectFit: 'cover' }}
								src={initialState.currentUser?.picture ?? '/logo.png'}
							/>
						}
						alt='avatar'
					/>
					<span className={`${styles.name}`}>
						{initialState.currentUser?.family_name
							? `${initialState.currentUser.family_name} ${initialState.currentUser?.given_name ?? ''}`
							: initialState.currentUser?.name
							? initialState.currentUser.name
							: initialState.currentUser?.preferred_username || ''}
					</span>
				</span>
			</HeaderDropdown>
		</>
	);
};

export default AvatarDropdown;
