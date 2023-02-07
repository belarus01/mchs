
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
  } from '@ant-design/icons';

import LeftSider from '../components/Sider';
import UserService from '../services/user.service';
import Title from 'antd/lib/typography/Title';

interface StrDepartment{
    id: string;
    name: string;
    department: string;
}

const StrDepartmentsPage = () => {
    const [open, setOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [modalName, setModalName] = useState('Редактирование структурного подразделения');
    const [selectedStrDep, setSelectedStrDep] = useState<StrDepartment>();

const handleEditClick = () =>{
    setOpen(true);
}
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

const dep:StrDepartment[]=[
    {
        id: "1",
        name: 'Надзор за эксплуатацией грузоподъёмных механизмов',
        department: "department"
    },
    {
        id: "2",
        name: 'Надзор за эксплуатацией химичиских опасных объектов',
        department: "department"
    },
    {
        id: "3",
        name: 'Надзор за объектами опасных грузов',
        department: "department"
    }

];
const [departments, setDepartmnents] = useState<StrDepartment[]>(dep);

const columns = [
    {
        key: "1",
        title:"№ пп",
        dataIndex:"id"
    },
    {
        key: "2",
        title:"Название",
        dataIndex:"name"
    },
    {
        key: "4",
        title:"Действия",
        render: (department: StrDepartment) =>{
            function onEditDep(department: StrDepartment) {
               setOpen(true);
            }

            function onDeleteDep(department: StrDepartment) {
                Modal.confirm({
                    title: "Вы действительно хотите удалить структурное подразделение?",
                    okText: 'Удалить',
                    cancelText: 'Отмена',
                    onOk: () => {
                       
                    }
                })
                const data = departments.filter(item => item.id !== department.id);
                //await deleteUser(user.id); 
                setDepartmnents(data);
            }
    
            return(
                <>
                <EditOutlined
                    onClick={()=>{
                        setSelectedStrDep(department);
                        onEditDep(department);
                    }}
                />
                <DeleteOutlined
                    onClick={()=>{
                        onDeleteDep(department);
                    }}
                    style={{color:"red", marginLeft: 12}}
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
    const buttonItemLayout =
     {
          wrapperCol: { span: 14, offset: 9 },
        };
return(
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        > 
            <Title level={3}>Структурные подразделения</Title>
            <Input.Search style={{width:300}} size="middle" placeholder="Введите запрос" />
            <Button type='primary'>Добавить структурное подразделение</Button>
            <Table columns={columns} dataSource={departments} ></Table>
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
        
        
    >
        
        <Form.Item label="Название">
          <Input name="name" onChange={()=>handleChange()} defaultValue={selectedStrDep?.name} />
        </Form.Item>
        <Form.Item {...buttonItemLayout}>
        <Button type="primary">Сохранить</Button>
      </Form.Item>
    </Form>
    
    </Modal>


        </Content>   
)        
}

export default StrDepartmentsPage;