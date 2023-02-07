import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    CalendarOutlined
  } from '@ant-design/icons';
  import { Layout, Menu } from 'antd';
  import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
  
  const { Header, Sider, Content } = Layout;
 
  type Props={
    collapsed: boolean;
    defaultSelected: string;
}

  const LeftSider = ({collapsed, defaultSelected}: Props) => {
    const navigate = useNavigate();
    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="logo" />
            <Menu mode='inline'
            defaultSelectedKeys={[defaultSelected]}
            onClick={({key}) =>{
                if(key === '/logout'){

                }
                else
                    navigate(key);

            }}
            items={[
                {
                    key: '/users',
                    icon: <UserOutlined/>,
                    label: 'Пользователи'
                },
                {
                    key: '/events',
                    icon: <CalendarOutlined />,
                    label: 'Мероприятия'
                },
                {
                    key: '/deps',
                    icon: <UserOutlined/>,
                    label: 'Подразделения'
                },
                {
                    key: '/strdeps',
                    icon: <UserOutlined/>,
                    label: 'Структурные подразделения'
                },
                {
                    key: '/plan',
                    icon: <UserOutlined/>,
                    label: 'Планирование'
                },
                {
                    key: '/statistics',
                    icon: <UserOutlined/>,
                    label: 'Статистика'
                },
                {
                    key: '/location',
                    icon: <UserOutlined/>,
                    label: 'Местоположение'
                },
                {
                    key: '/soato',
                    icon: <UserOutlined/>,
                    label: 'СОАТО'
                }


            ]}
            >

            </Menu>
        </Sider>
    )
  }

  export default LeftSider;