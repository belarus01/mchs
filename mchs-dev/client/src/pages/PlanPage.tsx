import { Card, Form, DatePicker } from 'antd';
import FormItem from "antd/es/form/FormItem";
import Input from "antd/lib/input/Input";
import { Content } from "antd/lib/layout/layout";
import Modal from "antd/lib/modal/Modal";
import { useEffect, useState } from 'react';

interface Event{
    id:number;
    name:string;
    address: string;
    dateBegin: Date;
    dateEnd:Date;
    events: Event[] | undefined;
}
const PlanPage =(event: Event)=>{
    const [modalName, setModalName] = useState('Создание мероприятия');
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<Event|undefined>();

    const events: Event[] = [
        {
            id:1,
            name: 'Мероприятие 1',
            dateBegin: new Date(),
            dateEnd: new Date(),
            address:'Минск',
            events: undefined
        }, 
        {
            id:2,
            name: 'Мероприятие 2',
            dateBegin: new Date(),
            dateEnd: new Date(),
            address:'Минск',
            events: undefined
        },
        {
            id:3,
            name: 'Мероприятие 3',
            dateBegin: new Date(),
            dateEnd: new Date(),
            address:'Минск',
            events: undefined
        },
        

    ];

    const onCardClick = (event:Event) =>{
        console.log(event.name);
    }
        
    const cancelEdit = ()=>{
        setSelected(undefined);
        setOpen(false);
    }
    
    return(
        <Content
        className="site-layout-background"
            style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
            }}>
            {events.map((event) =>(
                <Card key={event.id} onClick={()=>{
                    setSelected(event);
                    setModalName('Редактирование мероприятия');
                    setOpen(true);
                    console.log(event.name);
                }}>
                    <p>{event.name}</p>
                    <p>{event.address}</p>
                    <p>{event.dateBegin.toDateString()} - {event.dateEnd.toDateString()}</p>


                </Card>
            ))}
             <Modal
                closable
                footer={null}
                onCancel = {cancelEdit}
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
                    <Input name="name" defaultValue={selected?.name}></Input>
                </Form.Item>
                <Form.Item label="Адрес">
                <Input name="name" defaultValue={selected?.address}></Input>
                </Form.Item>
                <Form.Item label="Дата начала">
                    <DatePicker  name='start'></DatePicker>
                </Form.Item>
                <Form.Item label="Дата окончания">
                <DatePicker  name='end'></DatePicker>

                </Form.Item>
            </Form>
            </Modal>
        </Content>
       
    )
}

export default PlanPage;