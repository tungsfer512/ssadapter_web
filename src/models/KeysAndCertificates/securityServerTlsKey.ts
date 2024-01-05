import {useState} from "react";
import {exportCertApi, generateKeyApi, getCertInfoApi} from "@/services/KeyAndCertificateService/securityServerTlsKey";
import {message} from "antd";

export default () => {

  const [generateKeyLoading, setGenerateKeyLoading] = useState<boolean>();
  const [loadingExportCert, setLoaddingExportCert] = useState<boolean>();
  const [getCertInfoLoading, setCertInfoLoading] = useState<boolean>();
  const [certInfo, setCertInfo] = useState<ICertInfo>();
  const [isOpenCertInfoModal, setOpenCertInfoModal] = useState<boolean>(false);
  const [isOpenGenerateTLSModal, setIsOpenGenerateTLSModal] = useState<boolean>(false);
  const [inputGenKey, setInputGenKey] = useState();

  const generateKey = async () => {
    try {
      setGenerateKeyLoading(true);
      const res = await generateKeyApi().finally(() => setGenerateKeyLoading(false));
      if(res) {
        message.success('New Security Server TLS key and certificate generated successfully ');
      }
    } catch (err) {
      Promise.reject(err);
    }
  };

  const exportCert = async () => {
    try {
      setLoaddingExportCert(true);
      const res = await exportCertApi().finally(() => setLoaddingExportCert(false));
      if(res) {
        console.log(res);
      }
    } catch (err) {
      Promise.reject(err);
    }
  };

  const getCertInfo = async () => {
    try {
      setCertInfoLoading(true);
      const res = await getCertInfoApi().finally(() => setCertInfoLoading(false));
      const resData = res.data.data;
      if(resData) {
        setCertInfo(resData);
      }
    } catch (err) {
      Promise.reject(err);
    }
  };

  return {
    generateKeyLoading,
    generateKey,
    exportCert,
    loadingExportCert,
    getCertInfo,
    getCertInfoLoading,
    certInfo,
    isOpenCertInfoModal,
    setOpenCertInfoModal,
    isOpenGenerateTLSModal,
    setIsOpenGenerateTLSModal,
    inputGenKey,
    setInputGenKey
  };
};

export interface ICertInfo {
  hash: string
  issuer_common_name: string
  issuer_distinguished_name: string
  key_usages: []
  not_after: string
  not_before: string
  public_key_algorithm: string
  rsa_public_key_exponent: number
  rsa_public_key_modulus: string
  serial: string
  signature: string
  signature_algorithm: string
  subject_alternative_names: string
  subject_common_name: string
  subject_distinguished_name: string
  version: number
}
