
import { Button, Layout, Modal, Switch, Table } from 'antd';
import { Header, Content } from 'antd/lib/layout/layout';
import React from 'react';
import { useEffect, useState } from 'react';
//import { CreateUserModalForm } from '../components/forms/CreateUserModalForm';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { Form, Input, Select, TreeSelect } from "antd";
import { Formik, useFormik } from "formik";
import * as yup from 'yup';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    ZoomInOutlined
  } from '@ant-design/icons';

import LeftSider from '../components/Sider';
import UserService  from '../services/user.service';
import { useNavigate } from 'react-router-dom';
import DepartmentsService from '../services/departments.service';
import { SDept } from '../shared/interfaces';
import Title from 'antd/lib/typography/Title';

const DepartmentsPage = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [modalName, setModalName] = useState('Редактирование подразделения');
    const [selectedDep, setSelectedDep] = useState<SDept>();
    const [departments, setDepartments] = useState<SDept[]>([]);
 
const handleEditClick = () =>{
    setOpen(true);
}

useEffect(()=>{
    DepartmentsService.getAllDepartments().then((responce)=>{
        setDepartments(responce.data);
       
    });
}, [departments])
const validationSchema = yup.object({
    UNP: yup
        .string()
        .required('УНП обязателен'),
    name: yup
        .string()
        .required('Название обязательно'),
    address: yup
        .string()
        .required('Адрес обязателен'),
});

const columns = [
    {
        key: "3",
        title:"Название",
        dataIndex:"departament"
    },
    {
        key: "4",
        title:"Юридический адрес",
        dataIndex:"address"
    },
        
    {
        key: "5",
        title:"Действия",
        render: (department: SDept) =>{
            function onEditDep(department: SDept) {
               setOpen(true);
            }

            function onDeleteDep(department: SDept) {
                Modal.confirm({
                    title: "Вы действительно хотите удалить подразделение?",
                    okText: 'Удалить',
                    cancelText: 'Отмена',
                    onOk: () => {
                        
                    }
                })
                const data = departments.filter(item => item.uid !== department.uid);
                //await deleteUser(user.id); 
                setDepartments(data);
            }
    
            return(
                <>
                <EditOutlined
                    onClick={()=>{
                        setSelectedDep(department);
                        onEditDep(department);
                    }}
                />
                <DeleteOutlined
                    onClick={()=>{
                        onDeleteDep(department);
                    }}
                    style={{color:"red", marginLeft: 12}}
                />
                <ZoomInOutlined 
                    onClick={()=>{

                    }} 
                    style={{ marginLeft: 12}}   
                />
                </>
            )
        }
    },
];

    function cancleEdit(): void {
       setOpen(false);
    }

    function addUser(): void {
        
    }

    function handleChange(): void {
       
    }
    const buttonItemLayout = {
        wrapperCol: { span: 14, offset: 9 },
    };

    const formik = useFormik({
        validationSchema:{validationSchema},
        initialValues:{
            UNP: selectedDep?.idDept,
            name: selectedDep?.departament,
            address: selectedDep?.address
        },
        onSubmit:(values) => {
        console.log(JSON.stringify(values, null, 2));
    }
    });
return(
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
            <Title level={3}>Подразделения</Title>
            <Input.Search style={{width:300}} size="middle" placeholder="Введите запрос" />
            <Button type='primary'>Добавить подразделение</Button>
            
            <Table columns={columns} dataSource={departments} >
            </Table>
            <Modal 
                closable
                footer={null}
                onCancel={cancleEdit}
                destroyOnClose
                title={modalName}
                centered
                open={open}
            >
             
    <Form                        
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={formik.handleSubmit}     
    >
        
        <Form.Item label="Название">
          <Input value={formik.values.name} name="name" onChange={()=>handleChange()} defaultValue={selectedDep?.departament} />
        </Form.Item>
        <Form.Item label="Юридический адрес">
          <Input  value={formik.values.address} name="address"  onChange={()=>handleChange()} defaultValue={selectedDep?.address} />
        </Form.Item>
        <Form.Item {...buttonItemLayout}>
        <Button type="primary">Сохранить</Button>
      </Form.Item>
    </Form> 
    </Modal>
</Content>   
)        
}

export default DepartmentsPage;