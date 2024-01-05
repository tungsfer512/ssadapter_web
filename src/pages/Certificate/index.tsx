import {Button, Card, message, Modal, Space} from 'antd';
import {useEffect, useState} from "react";
import {
  activeCertificateById,
  deleteCertificateById,
  disableCertificateById,
  getCertificateById
} from "@/services/certificateService/api";
import './style.less';
import {useHistory} from "react-router";

const Certificate = (props: any) => {
  const hash = props.match.params.id;
  const [certificateData, setCertificateData] = useState<any>();
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const doAction = () => {
    deleteCertificateById(hash).then(() => setOpen(false)).then(
      res => {
        message.success('Delete successfully');
        history.goBack();
      }, err => {
        message.error('An error occurred');
      }
    );
  };

  const getCertificate = () => {
    getCertificateById(hash).then(
      res => {
        const resData = res.data;
        if(resData) {
          setCertificateData(resData.data);
        }
      }
    );
  };

  const changeStatus = () => {
    if(certificateData?.active) {
      disableCertificateById(hash).then(res => getCertificate());
    } else {
      activeCertificateById(hash).then(res => getCertificate());
    }
  };

  useEffect(() => {
    getCertificate();
  }, [hash]);

  return (
    <Card style={{maxWidth: '900px', margin: 'auto'}}>
      <h2>Certificate</h2>
      <div style={{float: 'right'}}>
        <Space>
          {
            certificateData?.active?(
              <>
                <Button shape="round" onClick={changeStatus}>
                  Disable
                </Button>
              </>
            ): (
              <>
                <Button shape="round" onClick={changeStatus}>
                  Active
                </Button>
              </>
            )
          }
          <Button shape="round" onClick={showModal}>
            Delete
          </Button>
        </Space>
      </div>

      <div style={{marginTop: '50px'}}>
        <div>
          <p>
            Hash (SHA-1)
          </p>
          <p className='content'>
            {hash}
          </p>
        </div>

        <div className='certificate-info'>
          <p className='label'>
            Version:
          </p>
          <p className='content'>
            {certificateData?.certificate_details.version}
          </p>
        </div>
        <div className='certificate-info'>
          <p className='label'>
            Serial:
          </p>
          <p className='content'>
            {certificateData?.certificate_details.serial}
          </p>
        </div>
        <div className='certificate-info'>
          <p className='label'>
            Signature Algorithm:
          </p>
          <p className='content'>
            {certificateData?.certificate_details.signature_algorithm}
          </p>
        </div>
        <div className='certificate-info'>
          <p className='label'>
            Issuer Distinguished Name:
          </p>
          <p className='content'>
            {certificateData?.certificate_details.issuer_distinguished_name}
          </p>
        </div>
        <div className='certificate-info'>
          <p className='label'>
            Not Before:
          </p>
          <p className='content'>
            {certificateData?.certificate_details.not_before}
          </p>
        </div>
        <div className='certificate-info'>
          <p className='label'>
            Not After:
          </p>
          <p className='content'>
            {certificateData?.certificate_details.not_after}
          </p>
        </div>
        <div className='certificate-info'>
          <p className='label'>
            Subject Distinguished Name:
          </p>
          <p className='content'>
            {certificateData?.certificate_details.subject_distinguished_name}
          </p>
        </div>
        <div className='certificate-info'>
          <p className='label'>
            Public Key Algorithm:
          </p>
          <p className='content'>
            {certificateData?.certificate_details.public_key_algorithm}
          </p>
        </div>
        <div className='certificate-info'>
          <p className='label'>
            RSA Public Key Modulus:
          </p>
          <p className='content'>
            {certificateData?.certificate_details.rsa_public_key_modulus}
          </p>
        </div>
        <div className='certificate-info'>
          <p className='label'>
            RSA Public Key Exponent:
          </p>
          <p className='content'>
            {certificateData?.certificate_details.rsa_public_key_exponent}
          </p>
        </div>
        <div className='certificate-info'>
          <p className='label'>
            Key Usages:
          </p>
          <p className='content'>
            {certificateData?.certificate_details.key_usages}
          </p>
        </div>
        <div className='certificate-info'>
          <p className='label'>
            Signature:
          </p>
          <p className='content'>
            {certificateData?.certificate_details.signature}
          </p>
        </div>
      </div>
      <Modal
        title='Delete certificate?'
        open={open}
        onOk={doAction}
        onCancel={hideModal}
        okText="Yes"
        cancelText="Cancel"
      >
        <p>Are you sure that you want to delete this certificate? </p>
      </Modal>
    </Card>
  );
};

export default Certificate;
