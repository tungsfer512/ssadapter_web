import './style.less';
import Detail from "@/pages/detailClient/detail";
import {Button, message, Modal} from "antd";
import LocalGroups from "@/pages/detailClient/localGroups";
import {useEffect, useState} from "react";
import {Route, Switch} from "react-router";
import InternalServers from "@/pages/detailClient/internalServers";
import ServiceClients from "@/pages/detailClient/serviceClients";
import Services from "@/pages/detailClient/services";
import {NavLink} from "umi";
import {useModel} from "@@/plugin-model/useModel";
import {deleteClientsById, getSubsystemInfoService, unregisterClientsById} from "@/services/clientDetailService/api";
import {history} from "@@/core/history";
import {ISubsystem} from "@/models/Clients/tableClient";

const DetailClient = (props: any) => {
  const id = props.match.params.id;
  const currentPath = `/clients/${id}`;
  const {getClient} = useModel('Clients.tableClient');
  const [buttonAction, setButtonAction] = useState<any>();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<string>('');
  const [subsystem, setSubsystem] = useState<ISubsystem>();

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const doAction = () => {
    if(status == 'REGISTERED' || status == 'REGISTRATION_IN_PROGRESS') {
      unregisterClientsById(id).then(
        res => {
          message.success('Unsubscribe successfully');
          hideModal();
        }, err => {
          message.error('An error occurred');
          hideModal();
        }
      );
    } else if (status == 'DELETION_IN_PROGRESS' || status == 'SAVED') {
      deleteClientsById(id).then(
        res => {
          getClient();
          message.success('Delete successfully');
          history.push('/clients');
        }, err => {
          message.error('An error occurred');
          hideModal();
        }
      );
    }
  };


  useEffect(() => {
    status == 'REGISTERED'  && setButtonAction(
      <Button shape="round" onClick={showModal}>
        Unregister
      </Button>)
    ||  status == 'DELETION_IN_PROGRESS' && setButtonAction(
      <Button shape="round" onClick={showModal}>
        Delete
      </Button>)
    ||  status == 'REGISTRATION_IN_PROGRESS' && setButtonAction(
      <Button shape="round" onClick={showModal}>
        Unregister
      </Button>)
    ||  status == 'SAVED' && setButtonAction(
      <Button shape="round" onClick={showModal}>
        Delete
      </Button>);
  }, [status]);

  useEffect(() => {
    getSubsystemInfoService(id).then(
      res => {
        const resData = res.data;
        if (resData) {
          setStatus(resData.data.status);
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

  return (
    <>
      {/*<Tabs defaultActiveKey="1" items={items} />*/}
      <ul className='menu-bar'>
        <li>
          <NavLink to={currentPath+'/'} activeClassName='active'>Details</NavLink>
        </li>
        <li>
          <NavLink to={currentPath+'/service-clients'} activeClassName='active'>Service clients</NavLink>
        </li>
        <li>
          <NavLink to={currentPath+'/services'} activeClassName='active'>Services</NavLink>
        </li>
        <li>
          <NavLink to={currentPath+'/internal-servers'} activeClassName='active'>Internal servers</NavLink>
        </li>
        <li>
          <NavLink to={currentPath+'/local-groups'} activeClassName='active'>Local groups</NavLink>
        </li>
      </ul>

      <div className="control-bar">
        <h2>{subsystem?.subsystemCode ? (
          <>
            {subsystem?.subsystemCode} (subsystem)
          </>
        ) : (
          <>
            {subsystem?.memberName} {subsystem?.owner && '(Owner)'}
          </>
        )}</h2>

        {buttonAction}
      </div>

      <Switch>
        <Route exact path="/clients/:id">
          <Detail path={id}/>
        </Route>
        <Route exact path="/clients/:id/internal-servers">
          <InternalServers/>
        </Route>
        <Route exact path="/clients/:id/local-groups">
          <LocalGroups/>
        </Route>
        <Route exact path="/clients/:id/service-clients">
          <ServiceClients path={id}/>
        </Route>
        <Route exact path="/clients/:id/services">
          <Services/>
        </Route>
      </Switch>

      <Modal
        title='Confirm action'
        open={open}
        onOk={doAction}
        onCancel={hideModal}
        okText="Yes"
        cancelText="Cancel"
      >
        <p>You definitely want to take this action ?</p>
      </Modal>
    </>
  );
};

export default DetailClient;
