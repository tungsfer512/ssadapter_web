import {Button, Card, Steps} from 'antd';
import './style.less';
import Step1 from "@/pages/addClient/step1";
import Step2 from "@/pages/addClient/step2";
import Step3 from "@/pages/addClient/step3";
import Step4 from "@/pages/addClient/step4";
import Step5 from "@/pages/addClient/step5";
import Step6 from "@/pages/addClient/step6";
import {useModel} from "@@/plugin-model/useModel";

const AddClient = () => {
  const {currentStep, nextStep, prevStep} = useModel('addClient.addClient');
  const steps = [
    {
      title: '',
      content: <Step1/>,
    },
    {
      title: '',
      content: <Step2/>,
    },
    {
      title: '',
      content: <Step3/>,
    },
    {
      title: '',
      content: <Step4/>,
    },
    {
      title: '',
      content: <Step5/>,
    },
    {
      title: '',
      content: <Step6/>,
    },
  ];

  const items = steps.map(item => ({key: item.title, title: item.title}));
  return (
    <>
      <div className="khoi-tao-wrapper" style={{height: '100%'}}>
        <div className="khoi-tao-card">
          <Card>
            <Steps current={currentStep} items={items} className='add-client-step'/>
            <div className="steps-content">{steps[currentStep].content}</div>
            <div className="steps-action">
              {currentStep > 0 && (
                <Button style={{margin: '0 8px'}} onClick={() => prevStep()}>
                  Back
                </Button>
              )}
              {currentStep < steps.length - 1 && (
                <Button type="primary" onClick={() => nextStep()}>
                  Continue
                </Button>
              )}
              {currentStep === steps.length - 1 && (
                <Button type="primary">
                  Complete
                </Button>
              )}
            </div>
          </Card>
          <div/>
        </div>
      </div>
    </>
  );
};

export default AddClient;
