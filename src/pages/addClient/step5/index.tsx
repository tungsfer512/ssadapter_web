import {Card, Col, Input, Row} from 'antd';
import React from "react";
import {useModel} from "@@/plugin-model/useModel";

const TrangChu = () => {
  const {} = useModel('addClient.addClient');

	return (
		<Card>
			<Row>
				<Col span={16}>
					<h2>
						Member Code (CN)
					</h2>
				</Col>
				<Col span={8}>
					<Input/>
				</Col>

				<Col span={16}>
					<h2>
						Country Code (C)
					</h2>
				</Col>
				<Col span={8}>
					<Input/>
				</Col>

				<Col span={16}>
					<h2>
						Serial Number
					</h2>
				</Col>
				<Col span={8}>
					<Input/>
				</Col>

				<Col span={16}>
					<h2>
						Organization Name (O)
					</h2>
				</Col>
				<Col span={8}>
					<Input/>
				</Col>
			</Row>
		</Card>
	);
};

export default TrangChu;
