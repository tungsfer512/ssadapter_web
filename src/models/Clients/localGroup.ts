import {useState} from "react";
import {Form} from "antd";

export default () => {
  const [data, setData] = useState<any>();
  const [isOpen, setOpen] = useState<boolean>();
  const [addLocalGroupForm] = Form.useForm();
  const [formSubmiting, setFormSubmiting] = useState<boolean>();
  const hideModal = () => {
    setOpen(false);
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleAddSubsystem = (values: any) => {

  };

  return  {
    data,
    isOpen,
    hideModal,
    showModal,
    addLocalGroupForm,
    handleAddSubsystem,
    formSubmiting
  };
};
