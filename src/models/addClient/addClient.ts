import React, {useEffect, useState} from "react";
import {Form, message} from "antd";
import {
  csrSubjectField,
  getListClientApi,
  getMemberClasses,
  getTokenInfo,
  registerClient
} from "@/services/addClientService/api";
import {useForm} from "antd/es/form/Form";
import {getCertServiceApi} from "@/services/KeyAndCertificateService/signAndAuthKeys";
import {history} from "@@/core/history";

export default () => {
  const [currentStep, setCurrentStep] = useState(0);
  //step1 models
  const [step1Form] = Form.useForm();
  const [showModalSelectClient, setShowModalSelectClient] = useState(false);
  const [listClient, setListClient] = useState([]);
  const [listMemberClasses, setListMemberClasses] = useState<{label: string, value: string}[]>([]);
  const [step1Value, setStep1Value] = useState<any>();
  //step2 models
  const [listTokenStep2, setListTokenStep2] = useState<{label: string, value: any}[]>([]);
  const [tokenSelected, setTokenSelected] = useState<any>();
  const [step2Value, setStep2Value] = useState<any>();
  // step3 models
  const [step3Form] = useForm();
  const [step3Value, setStep3Value] = useState<any>();
  // step4 models
  const [certServices, setCertServices] = useState();
  const [step4Form] = useForm<any>();
  const [step4Value, setStep4Value] = useState<any>();
  // step5 models
  const [step5Form] = useForm();
  const [step5Value, setStep5Value] = useState<any>();
  //step control
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  //step1 //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const onShowModalSelectClient = () => {
    setShowModalSelectClient(true);
  };

  const onSelectClient = () => {
    setShowModalSelectClient(false);
  };

  const refreshAllForm = () => {
    step1Form.resetFields();
    step3Form.resetFields();
    step4Form.resetFields();
    step5Form.resetFields();
  };

  const onCancelModelSelectClient = () => {
    setShowModalSelectClient(false);
  };

  const submitStep1Form = (value: IAddClientStep1Form) => {
    setStep1Value(value);
    nextStep();
  };

  const getListClient = async () => {
    try {
      const res = await getListClientApi();
      const resData = res.data.data;
      if(resData) {
        console.log(resData);
      }
    } catch (err) {
      Promise.reject(err);
    }
  };

  useEffect(() => {
    getMemberClasses().then(res => {
      const resData = res.data.data;
      if(resData) {
        setListMemberClasses(resData.map((item: any) => {return {label: item, value: item};}));
      }
    });
  }, []);

  //step2//////////////////////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    getTokenInfo().then(
      res => {
        const resData = res.data.data;
        if(resData) {
          setListTokenStep2(resData.map((item: any) => {
            return {
              label: item.name,
              value: item
            };
          }));
        }
      }
    );
  }, []);

  useEffect(() => {
    if(listTokenStep2[0]) {
      setTokenSelected(listTokenStep2[0].value);
    }
  }, [listTokenStep2]);

  useEffect(() => {
    step4Form.setFieldsValue({
      usage: 'SIGNING',
      client: 'CS:GOV:3'
    });
  }, []);

  const changeSelectToken = () => {

  };

  //step3//////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const submitStep3Form = (val: any) => {
    setStep3Value(val);
    nextStep();
  };
  //step4//////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const submitStep4Form = (val: any) => {
    setStep4Value(val);
    nextStep();
  };
  useEffect(() => {
    getCertServiceApi().then(
      res => {
        const resData = res.data.data;
        if(resData) {
          setCertServices(resData.map((item: any) => {
            return {
              label: item.name,
              value: item.name
            };
          }));
        }
      }
    );
  }, []);
  //step5//////////////////////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    if(step4Value) {
      const req =  {certService: step4Value.certService, keyUsageType: step4Value.usage, memberId: step4Value.client, isNewMember: true};
      csrSubjectField(req).then(res => {
        const resData = res.data.data;

        let formDataSet = {memberCode: '', countryCode: '', serialNumber: '', orgName: ''};
        if(resData) {
          resData.forEach((item: any) => {
            if(item.id == 'serialNumber') {
              formDataSet.serialNumber = item.default_value;
            } else if(item.id == 'CN') {
              formDataSet.memberCode = item.default_value;
            } else if(item.id == 'C') {
              formDataSet.countryCode = item.default_value;
            } else if(item.id == 'O') {
              formDataSet.orgName = item.default_value;
            }
          });
        }

        step5Form.setFieldsValue(formDataSet);
      });
    }
  }, [step4Value]);
  const submitStep5Form = (val: any) => {
    setStep5Value(val);
    nextStep();
  };
  //step6//////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const finishCreateClient = async () => {
    try {
      const req = {
        key_label: step3Value.keyLabel,
        csr_generate_request: {
          ca_name: step4Value.certService,
          csr_format: step4Value.csrFormat,
          key_usage_type: step4Value.usage,
          member_id: step4Value.client,
          subject_field_values: {
            C: step5Value.countryCode,
            CN: step5Value.memberCode,
            O: step5Value.orgName,
            serialNumber: step5Value.serialNumber
          }
        }
      };
      const res = await registerClient(req);
      if(res) {
        message.success('');
      }
    } catch (err) {
      Promise.reject(err);
    }
  };

  const cancel = () => {
    setCurrentStep(0);
    refreshAllForm();
    history.push('/');
  };

  return {
    currentStep,
    nextStep,
    prevStep,
    step1Form,
    getListClient,
    showModalSelectClient,
    onShowModalSelectClient,
    onSelectClient,
    onCancelModelSelectClient,
    submitStep1Form,
    listMemberClasses,
    changeSelectToken,
    listTokenStep2,
    tokenSelected,
    step3Form,
    submitStep3Form,
    step4Form,
    submitStep4Form,
    certServices,
    step5Form,
    submitStep5Form,
    finishCreateClient,
    cancel
  };
};

export interface IDataType {
  key: React.Key;
  name: string;
  id: string;
}

export interface IAddClientStep1Form {
  memberName: string,
  memberClass: string,
  memberCode: string,
  subsystemCode: string
}
