import { useState, useEffect } from 'react';
import { SSubj } from '../shared/interfaces';
import axios from 'axios';
import { getAllSubjects } from '../services/subject.service';
import { Content } from 'antd/lib/layout/layout';
import Title from 'antd/lib/typography/Title';
import { Input, Table } from 'antd';
const SubjectsPage = () =>{

    const [subjects, setSubjects] = useState<SSubj[]>([]);
    const columns = [
        {
            key: "1",
            title: "№ пп",
            dataIndex: "idSubj"
        },
        {
            key: "2",
            title: "УНП",
            dataIndex: "unp"
        },
        {
            key: "3",
            title: "Наименование",
            dataIndex: "subj"
        },
        {
            key: "4",
            title: "Юридический адрес",
            width: '30%',
            dataIndex:"addrYur"
        },
        {
            key: "5",
            title: "Дата регистрации",
            dataIndex: "dateRecord"
        }
    ];

    useEffect(()=>{
        getAllSubjects().then(resp =>{
            setSubjects(resp.data);
        })
    }, [subjects]);

    return(
        <Content
            className="site-layout-background"
            style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
            }}
        >
            <Title level={3}>Справочник субъектов</Title>
            <Input.Search style={{width:300}} size="middle" placeholder="Введите запрос" />
            <Table columns={columns} dataSource={subjects} ></Table>

        </Content>
    )
}
export default SubjectsPage;