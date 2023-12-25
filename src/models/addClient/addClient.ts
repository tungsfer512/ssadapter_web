import React, {useEffect, useState} from "react";
import {Form} from "antd";
import {getMemberClasses, getTokenInfo} from "@/services/addClientService/api";

export default () => {
  const [currentStep, setCurrentStep] = useState(0);
  //step1 models
  const [step1Form] = Form.useForm();
  const [listClients, setListClients] = useState<IDataType[]>([]);
  const [showModalSelectClient, setShowModalSelectClient] = useState(false);
  const [listMemberClasses, setListMemberClasses] = useState<{label: string, value: string}[]>([]);
  //step2 models
  const [listTokenStep2, setListTokenStep2] = useState<{label: string, value: any}[]>([]);
  const [tokenSelected, setTokenSelected] = useState<any>();

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

  const onCancelModelSelectClient = () => {
    setShowModalSelectClient(false);
  };

  const submitStep1Form = (value: IAddClientStep1Form) => {
    console.log('>>>>>>>>>>>>>>>>>>>value of step1 is: ');
    console.log(value);
    nextStep();
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
      console.log('>>>>>>>>>>>>>>>>>>>value of step2 is: ');
      console.log(listTokenStep2[0].value);
    }
  }, [listTokenStep2]);

  const changeSelectToken = () => {

  };

  //step3//////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //step4//////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //step5//////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //step6//////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return {
    currentStep,
    nextStep,
    prevStep,
    step1Form,
    showModalSelectClient,
    onShowModalSelectClient,
    onSelectClient,
    onCancelModelSelectClient,
    submitStep1Form,
    listMemberClasses,
    changeSelectToken,
    listTokenStep2,
    tokenSelected
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
