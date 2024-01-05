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
						Key Label
					</h2>
					<p>
						You can define a label for the newly created SIGN key (not mandatory)
					</p>
				</Col>
				<Col span={8}>
					<Input/>
				</Col>
			</Row>
		</Card>
	);
};

export default TrangChu;
