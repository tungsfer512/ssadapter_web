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
						Usage
					</h2>
					<p>
						Usage policy of the certificate: signing messages or authenticating Security Server.
					</p>
				</Col>
				<Col span={8}>
					<Input/>
				</Col>

				<Col span={16}>
					<h2>
						Client
					</h2>
					<p>
						X-Road member the certificate will be issued for.
					</p>
				</Col>
				<Col span={8}>
					<Input/>
				</Col>

				<Col span={16}>
					<h2>
						Certification Service
					</h2>
					<p>
						Certification Authority (CA) that will issue the certificate.
					</p>
				</Col>
				<Col span={8}>
					<Input/>
				</Col>

				<Col span={16}>
					<h2>
						CSR Format
					</h2>
					<p>
						Format of the certificate signing request according to the CA’s requirements.
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
