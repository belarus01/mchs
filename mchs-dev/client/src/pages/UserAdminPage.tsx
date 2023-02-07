
import { AutoComplete, Button, InputRef, Layout, Modal, Space, Switch, Table } from 'antd';
import { Header, Content } from 'antd/lib/layout/layout';
import React, { useRef } from 'react';
import { useEffect, useState } from 'react';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { Form, Input, Select, TreeSelect } from "antd";
import { Formik, useFormik } from "formik";
import * as yup from 'yup';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SearchOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';

import LeftSider from '../components/Sider';
import { AddEditUserForm } from '../components/forms/AddEditUserForm';
import UserService from '../services/user.service';
import { UserDTO, User, DeleteUserDTO } from '../shared/interfaces';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';
import { ROLES } from '../shared/constants';
import Title from 'antd/lib/typography/Title';
import { ColumnType } from 'antd/lib/table';
import { FilterConfirmProps } from 'antd/lib/table/interface';

type DataIndex = keyof User;

const UserAdminPage = () => {
    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User>();
    const [type, setType] = useState(true);
    let admin:User;
    const {users, error, loading} = useTypedSelector(state => state.users);
    const {fetchUsers, fetchUsersByDept, setUsers} = useActions();
    const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
    const [selectedKeys, setSelectedKeys] = useState();
    const searchInput = useRef<InputRef>(null);
    
    useEffect(()=>{
        fetchUsers();
        // if(admin.userRole === ROLES.Syperadmin){
        //     fetchUsers();
        // }
        // else if (admin.userRole === ROLES.Admin || admin.userRole === ROLES.Сhief){
        //     fetchUsersByDept(admin.idDept);
        // } 
    }, [])
    const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<User> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
          <div style={{ padding: 8 }} onKeyDown={e => e.stopPropagation()}>
            <Input
              ref={searchInput}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
              style={{ marginBottom: 8, display: 'block' }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
              >
                Search
              </Button>
              <Button
                onClick={() => clearFilters && handleReset(clearFilters)}
                size="small"
                style={{ width: 90 }}
              >
                Reset
              </Button>
              <Button
                type="link"
                size="small"
                onClick={() => {
                  confirm({ closeDropdown: false });
                  setSearchText((selectedKeys as string[])[0]);
                  setSearchedColumn(dataIndex);
                }}
              >
                Filter
              </Button>
              <Button
                type="link"
                size="small"
                onClick={() => {
                  close();
                }}
              >
                close
              </Button>
            </Space>
          </div>
        ),
        filterIcon: (filtered: boolean) => (
          <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
          record[dataIndex]
            .toString()
            .toLowerCase()
            .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: visible => {
          if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
          }
        },
        render: text =>
          searchedColumn === dataIndex ? (
            
            text
          ):(text)
      });


      const handleSearch=(selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: DataIndex,
      ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    }
       
    
    function handleReset(clearFilters: () => void): void {
        throw new Error('Function not implemented.');
    }
    const columns = [
        {
            key: "2",
            title: "Фамилия",
            dataIndex: "lName",
            ...getColumnSearchProps('lName'),
            
            
        },
        {
            key: "3",
            title: "Имя",
            dataIndex: "fName"
        },
        {
            key: "4",
            title: "Отчество",
            dataIndex: "sName"
        },
        {
            key: "5",
            title: "Должность",
            width: '10%',
            render:(user:User)=>{
                return(
                    <p>{user.idDeptJob2.job}</p>
                )
            }
        },
        {
            key: "6",
            title: "Телефон",
            dataIndex: "tel"
        },
        {
            key: "7",
            title: "Логин",
            dataIndex: "user",
            width: '10%',
        },
        {
            key: "8",
            title: "Статус",
            width: '5%',
            render: (user: User)=>{
                const active = user.active;
                return(
                  <p>{active === 1 ? 'Активен' : 'Заблокирован'}</p>
                )
            }
        },
        {
            key: "9",
            title: "Действия",
            width: '13%',
            render: (user: User) => { 
                return (
                    <>
                        <EditOutlined
                            onClick={() => {
                                setSelectedUser(user);
                                setType(true);
                                setOpen(true);
                            }}
                        />
                        <DeleteOutlined
                            onClick={() => {

                                onDeleteUser(user);
                            }}
                            style={{ color: "red", marginLeft: 12 }}
                        />
                        <Switch checked={user.active === 1} onClick={() => { onSwitchClick(user) }} style={{ marginLeft: 12 }}></Switch>
                    </>
                )
            }
        },
    ];

    async function onDeleteUser(user: User) {
        console.log('uid ' + user.uid);
        Modal.confirm({
            title: "Вы действительно хотите удалить пользователя?",
            okText: 'Удалить',
            cancelText: 'Отмена',
            onOk: async () => {
                const data = users.filter(item => item.uid !== user.uid);

                const del:DeleteUserDTO ={
                    uid:user.uid,
                    adminUid: 1//admin.uid
                };
               
                await UserService.deleteUser(del); 
                setUsers(data);
            }
        })
        
    }

    function onSwitchClick(user: User) {
        if (user.active === 1) {
            Modal.confirm({
                title: "Вы действительно хотите заблокировать пользователя?",
                okText: 'Заблокировать',
                cancelText: 'Отмена',
                onOk: () => {
                    const data = users.map(item => {
                        if (item.uid === user.uid)
                            return { ...item, status: false, statusStr: "Заблокирован" };
                        return item;
                    })
                    setUsers(data);
                }
            })
        }
        else {
            const data = users.map(item => {
                if (item.uid === user.uid)
                    return { ...item, status: true, statusStr: "Активен" };
                return item;
            })
            setUsers(data);
        }
    }

    return (
        <Content
            className="site-layout-background"
            style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
            }}
        >
            <Title level={3}>Пользователи</Title>
            <Input.Search style={{width:300}} size="middle" placeholder="Введите запрос" />
            <Button type="primary" onClick={()=>{ 
                setType(false);
                setOpen(true);
                setSelectedUser(undefined);
            }}>Добавить пользователя</Button>
            <Table columns={columns} dataSource={users} ></Table>
            <AddEditUserForm selectedUser={selectedUser} setSelectedUser={setSelectedUser} open={open} setOpen={setOpen} type={type} />

        </Content>
    )
}

export default UserAdminPage;



