import { Content } from "antd/lib/layout/layout";
import { useEffect, useState } from "react";
import { SEvents } from "../shared/interfaces";
import { Button, DatePicker, Form, Input, Modal, Table } from 'antd';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getAllEvents } from "../services/events.service";
import Title from "antd/lib/typography/Title";

const EventsPage = () => {
    const [events, setEvents] = useState<SEvents[]>([]);
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<SEvents>();
    const [type, setType] = useState(false);
    const [modalName, setModalName] = useState('');
    const columns = [
        {
            key: "1",
            title: "№ пп",
            dataIndex: "idEvent"
        },
        {
            key: "2",
            title: "Наименование",
            dataIndex: "event"
        },
        {
            key: "6",
            title: "Действия",
            render: (event: SEvents) => {
                return (
                    <>
                        <EditOutlined
                            onClick={() => {
                                setSelected(event);
                                setType(true);
                                setOpen(true);
                            }}
                        />
                        <DeleteOutlined
                            onClick={() => {
                                Modal.confirm({
                                    title: "Вы действительно хотите удалить мероприятие?",
                                    okText: 'Удалить',
                                    cancelText: 'Отмена',
                                    onOk: () => {


                                    }
                                });
                            }}
                            style={{ color: "red", marginLeft: 12 }}
                        />
                    </>
                )
            }
        }
    ];

    useEffect(() => {
        getAllEvents().then(resp => {
            setEvents(resp.data);
        })
    }, [events]);

    const initialvalues = {
        event: selected?.event
    }

    const cancelEdit = () => {
        setOpen(false);
    }

    useEffect(() => {
        if (type === true)
            setModalName('Редактирование мероприятия');
        else {
            setModalName('Создание мероприятия');
        }

    }, [type])

    const onFinish = () => {

    }
    const buttonItemLayout =
    {
        wrapperCol: { span: 8, offset: 9 },
    };


    return (
        <Content
            className="site-layout-background"
            style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
            }}
        >
            <Title level={3}>Справочник мероприятий</Title>
            <Input.Search style={{ width: 300 }} size="middle" placeholder="Введите запрос" />
            <Button type="primary" onClick={() => {
                setType(false);
                setOpen(true);
            }}>Добавить мероприятие</Button>
            <Table columns={columns} dataSource={events} ></Table>
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

                    <Form.Item label="Наименование" name="subj">
                        <Input />
                    </Form.Item>

                    <Form.Item {...buttonItemLayout}>
                        <Button htmlType="submit" type="primary">Сохранить</Button>
                    </Form.Item>


                </Form>
            </Modal>
        </Content>
    )
}

export default EventsPage;