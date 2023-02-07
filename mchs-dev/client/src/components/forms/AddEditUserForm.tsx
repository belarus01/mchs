import { Button, Form, Input, Modal, Select, TreeSelect } from "antd"
import { Formik, useFormik } from "formik";
import * as yup from 'yup';
import { useState, useEffect } from 'react';
import UserService from "../../services/user.service";
import JobsService from '../../services/job.service';
import { SDept, SDeptJob, SDeptNode, User, UserDTO } from '../../shared/interfaces';
import { getCurrentUser } from '../../services/auth.service';
import DepartmentsService from '../../services/departments.service';
import { useTypedSelector } from '../../hooks/useTypedSelector';


type Props = {
    selectedUser?: User;
    type: boolean;
    setSelectedUser: any;
    open: boolean;
    setOpen: any;
}


export const AddEditUserForm = ({ selectedUser, setSelectedUser, open, setOpen, type }: Props) => {
    const [modalName, setModalName] = useState('Содание пользователя');
    const [positions, setPositions] = useState<SDeptJob[]>([]);
    const [positionsStr, setPositionsStr] = useState<string[]>([]);
    const [departments, setDepartments] = useState<SDeptNode[]>([]);
    const { user } = useTypedSelector(state => state.auth);
    //const admin = useCurrentUser();

    useEffect(() => {
        if (type === false)
            setModalName('Содание пользователя');
        else if (type === true)
            setModalName('Редактирование пользователя');

    }, [type]);

    useEffect(() => {
        JobsService.getAlljobs().then((responce) => {
            let arr: string[] = [];
            setPositions(responce.data);
            positions.forEach(element => {
                arr.push(element.job);
            });
            setPositionsStr(arr);
        })
    }, [selectedUser]);

    function deptToTreeNode(dept: SDept): SDeptNode {
        return {
            idDept: dept.idDept,
            departament: dept.departament,
            org: dept.org,
            idParent: dept.idParent,
            uid: dept.uid,
            children: []
        };
      }
    useEffect(() => {
        DepartmentsService.getAllDepartments().then((responce) => {
            console.log(responce.data);
            const arr:SDeptNode[] = [];
            console.log(responce.data.length);
            for(let i = 0; i<responce.data.length; i++){
                console.log(responce.data[i]);
                arr.push(deptToTreeNode(responce.data[i]));
            }
           
            console.log('arr');
            console.log(arr);
            setDepartments(makeTree(arr));
        })
    }, [selectedUser]);

    const makeTree = (nodes:SDeptNode[]) :SDeptNode[] =>{
        
        let tree:SDeptNode[] = [];
        for(let i = 0; i < nodes.length; i++) {
            if(nodes[i].idParent){
                let parent = nodes.filter(node=>node.idDept === nodes[i].idParent).pop();
                parent?.children.push(nodes[i]);
            }
            else{
                tree.push(nodes[i]);
            }

        }
        return tree;
    }


        const buttonItemLayout =
    {
        wrapperCol: { span: 8, offset: 9 },
    };

    const cancelEdit = () => {
        setOpen(false);
    }

    const onFinish = (values: any) => {
        console.log(values);
    }

    const initialvalues = {
        login: selectedUser?.user,
        fName: selectedUser?.fName,
        sName: selectedUser?.sName,
        lName: selectedUser?.lName,
        tel: selectedUser?.tel,
        job: selectedUser?.idDeptJob2.job,
        userRole: selectedUser?.userRole,
        departament: selectedUser?.idDept2.departament

    }

    return (
        <Modal
            closable
            footer={null}
            onCancel={cancelEdit}
            destroyOnClose
            title={modalName}
            centered
            open={open}
        >
            <Form
                layout="vertical"
                initialValues={initialvalues}
                onFinish={onFinish}
            >
                <Form.Item label="Фамилия" name="lName">
                    <Input />
                </Form.Item>
                <Form.Item label="Имя" name="fName">
                    <Input />
                </Form.Item>
                <Form.Item label="Отчество" name="sName">
                    <Input />
                </Form.Item>
                <Form.Item label="Телефон" name="tel">
                    <Input />
                </Form.Item>
                <Form.Item label="Логин" name="login">
                    <Input />
                </Form.Item>
                <Form.Item label="Должность" name='job'>
                    <Select>{
                        positionsStr.map((option) => (
                            <Select.Option key={option} value={option}>{option}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Подразделение" name='departament'>
                    <TreeSelect fieldNames={{
                        label: 'departament',
                        value: 'departament'
                    }} labelInValue={true} treeData={departments} treeDataSimpleMode={{
                        id: 'idDept',
                        pId: 'idParent',
                    }}
                        treeNodeLabelProp='departament'
                        treeNodeFilterProp='idDept'
                    >

                    </TreeSelect>
                </Form.Item>
                <Form.Item label="Роль" name='userRole'>
                    <Select >
                        <Select.Option key={1} value={1}>Администратор АПК КНО</Select.Option>
                        <Select.Option key={2} value={2}>Руководитель подразделения</Select.Option>
                        <Select.Option key={3} value={3}>Администратор подразделения</Select.Option>
                        <Select.Option key={4} value={4}>Пользователь</Select.Option>
                        <Select.Option key={5} value={5}>Курсант</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item {...buttonItemLayout}>
                    <Button htmlType="submit" type="primary">Сохранить</Button>
                </Form.Item>


            </Form>
        </Modal>
    )
}