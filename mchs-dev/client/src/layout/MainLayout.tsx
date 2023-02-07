import { Avatar, ConfigProvider, Dropdown, Layout, Menu, Modal } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import { useEffect, useRef, useState } from 'react';
import LeftSider from '../components/Sider';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import React from 'react';
import { Outlet } from 'react-router';

import GeolocationService from '../services/geolocation.service';
import { GeolocationData } from '../shared/interfaces';
import { Link } from 'react-router-dom';
import ruRu from 'antd/es/locale/ru_RU';
const MainLayout = () => {
    const [lat, setLat] = useState<number>();
    const latRef = useRef(lat);
    latRef.current = lat;
    //const user = useCurrentUser();

    const [long, setLong] = useState<number>();
    const longRef = useRef(long);
    longRef.current = long;



    // useEffect(()=>{
    //   const geolocationAPI = navigator.geolocation;
    //   const timer = setTimeout(()=>{
    //     if (!geolocationAPI) {
    //       console.log("Api error");
    //     }else{
    //       geolocationAPI.getCurrentPosition((position) => {
    //         const {coords} = position;
    //         setLat(coords.latitude);
    //         setLong(coords.longitude);
    //         console.log('Latitude ' + coords.latitude);
    //         const location: GeolocationData ={
    //           uid: 1,
    //           //user.props?.user.uid,
    //           latitude: coords.latitude.toString(),
    //           longitude: coords.longitude.toString(),
    //           dateRecord: Date()
    //         }
    //         GeolocationService.sendLocation(location);
    //       }, (error) =>{
    //         console.log("Error");
    //       })
    //     }
    //   }, 2000);
    //   return () => clearTimeout(timer);
    // }, )

    const handleLogout = () => {
        Modal.confirm({
            title: "Выход",
            content: "Вы действительно хотите выйти?",
            okText: "Выйти",
            cancelText: "Отмена",
            onOk: () => {

            }
        })
    }

        const menu = (
            <Menu>
                <Link to="signin" onClick={handleLogout}></Link>
            </Menu>
        )
        
        const [collapsed, setCollapsed] = useState(true);
        return (
          
<ConfigProvider locale={ruRu}>

            <Layout>
                <LeftSider collapsed={collapsed} defaultSelected={"/users"} />
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ paddingLeft: 15, color: 'white' }}>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: () => setCollapsed(!collapsed),
                        })}
                       

                    </Header>
                    <Outlet />
                </Layout>
            </Layout>
            </ConfigProvider>

        );
    };

    export default MainLayout;