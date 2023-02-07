import { useState, useEffect } from 'react';
import { SSoato, SSubj } from '../shared/interfaces';
import axios from 'axios';
import { getAllSubjects } from '../services/subject.service';
import { Content } from 'antd/lib/layout/layout';
import Title from 'antd/lib/typography/Title';
import { Input, Table } from 'antd';
import { getAllSoato } from '../services/soato.service';
const SSoatoPage = () =>{

    const [subjects, setSubjects] = useState<SSoato[]>([]);
    const columns = [
        {
            key: "1",
            title: "№",
            dataIndex: "soato"
        },
        {
            key: "2",
            title: "Название",
            dataIndex: "name"
        },
        {
            key: "3",
            title: "Область",
            dataIndex: "obl"
        },
        {
            key: "4",
            title: "Район",
            dataIndex:"raion"
        },
        {
            key: "5",
            title: "Совет",
            dataIndex: "sovet"
        },
        {
            key: "6",
            title: "Тип",
            dataIndex: "tip"
        },
        {
            key: "7",
            title: "Дата окончания",
            dataIndex: "datav"
        }

    ];

    useEffect(()=>{
        getAllSoato().then(resp =>{
            setSubjects(resp.data);
            console.log(resp.data);
        })
    }, []);

    return(
        <Content
            className="site-layout-background"
            style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
            }}
        >
            <Title level={3}>Справочник CCОАТО</Title>
            <Input.Search style={{width:300}} size="middle" placeholder="Введите запрос" />
            <Table columns={columns} dataSource={subjects} ></Table>

        </Content>
    )
}
export default SSoatoPage;