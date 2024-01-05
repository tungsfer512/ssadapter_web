import {Button, Card, message, Steps} from 'antd';
import React, {useState} from 'react';
import './style.less';
import Step1 from "@/pages/KhoiTao/steps/step1";
import Step2 from "@/pages/KhoiTao/steps/step2";
import Step3 from "@/pages/KhoiTao/steps/step3";
import {useHistory} from "react-router";

const steps = [
    {
        title: 'Configuration Anchor',
        content: <Step1/>,
    },
    {
        title: 'Owner Member',
        content: <Step2/>,
    },
    {
        title: 'Token PIN',
        content: <Step3/>,
    },
];

const App: React.FC = () => {
    const [current, setCurrent] = useState(0);
    const items = steps.map(item => ({ key: item.title, title: item.title }));
    const history = useHistory();

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const complete = () => {
        history.push("/");
    }
;

    return (
        <>
            <div className="khoi-tao-wrapper" style={{ height: '100%' }}>
                <div className="khoi-tao-card">
                    <Card>
                        <Steps current={current} items={items} />
                        <div className="steps-content">{steps[current].content}</div>
                        <div className="steps-action">
                            {current > 0 && (
                                <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                                    Back
                                </Button>
                            )}
                            {current < steps.length - 1 && (
                                <Button type="primary" onClick={() => next()}>
                                    Continue
                                </Button>
                            )}
                            {current === steps.length - 1 && (
                                <Button type="primary" onClick={() => complete()}>
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

export default App;
