import {Card, Col, Row, Table} from 'antd';
import {ColumnsType} from "antd/es/table";
import {useEffect, useState} from "react";
import {getCertificateDataService, getSubsystemInfoService} from "@/services/clientDetailService/api";
import {history} from "@@/core/history";
import {ICertificate, ISubsystem} from "@/models/Clients/tableClient";

const Detail = (props: any) => {
  const id = props.path;
  const [subsystem, setSubsystem] = useState<ISubsystem>();
  const [certificateData, setCertificateData] = useState<ICertificate[]>([]);

  useEffect(() => {
    getSubsystemInfoService(id).then(
      res => {
        const resData = res.data;
        if (resData) {
          setSubsystem({
            memberName: resData.data.member_name,
            memberClass: resData.data.member_class,
            memberCode: resData.data.member_code,
            subsystemCode: resData.data.subsystem_code,
            owner: resData.data.owner
          });
        }
      }
    );
  }, [id, open]);

  useEffect(() => {
    getCertificateDataService(id).then(
      res => {
        const resData = res.data;
        if (resData) {
          const certificateDataTemp: ICertificate[] = resData.data.map(
            (item: any, key: any) => {
              return {
                key: key,
                signCertificate: item.certificate_details.issuer_common_name,
                serialNumber: item.certificate_details.serial,
                state: item.status,
                expires: item.certificate_details.not_after,
                hash: item.certificate_details.hash
              };
            }
          );
          setCertificateData(certificateDataTemp);
        }
      }
    );
  }, [id]);


  const certificateColumn: ColumnsType<ICertificate> = [
    {
      title: 'Sign Certificate',
      dataIndex: 'signCertificate',
      render: (val, rec) => {
        return (
          <a onClick={(event) => {history.push(`/certificate/${rec.hash}`)}}>
            {rec.signCertificate}
          </a>
        );
      }
    },
    {
      title: 'Serial Number',
      dataIndex: 'serialNumber',
    },
    {
      title: 'State',
      dataIndex: 'state',
    },
    {
      title: 'Expires',
      dataIndex: 'expires',
    },
  ];

  return (
    <>
      <Card style={{marginTop: '20px'}}>
        <Row>
          <Col span={8}>
            <p>
              Member Name
            </p>
          </Col>
          <Col span={16}>
            <p>{subsystem?.memberName}</p>
          </Col>

          <Col span={8}>
            <p>
              Member Class
            </p>
          </Col>
          <Col span={16}>
            <p>{subsystem?.memberClass}</p>
          </Col>

          <Col span={8}>
            <p>
              Member Code
            </p>
          </Col>
          <Col span={16}>
            <p>{subsystem?.memberCode}</p>
          </Col>

          {subsystem?.subsystemCode ? (
            <>
              <Col span={8}>
                <p>
                  Subsystem Code
                </p>
              </Col>
              <Col span={16}>
                <p>{subsystem?.subsystemCode}</p>
              </Col>
            </>
          ) : (
            <></>
          )}
        </Row>
      </Card>
      <Card style={{marginTop: '20px'}} bodyStyle={{padding: '0px'}}>
        <Table columns={certificateColumn} dataSource={certificateData} pagination={false}/>
      </Card>
    </>
  );
};

export default Detail;
