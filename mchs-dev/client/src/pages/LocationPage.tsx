import { Col, Input, Row, Table } from "antd";
import { Content } from "antd/lib/layout/layout";
import Title from "antd/lib/typography/Title";
import { YMaps, Map, Placemark } from "react-yandex-maps";

const LocationPage = () =>{
    const columns = [
        {
            key: "1",
            title: "№ пп",
            dataIndex: "idEvent"
        },
        {
            key: "2",
            title: "ФИО",
            dataIndex: "name"
        },
        {
            key: "3",
            title: "Подразделение",
            dataIndex: "dep"
        },
        {
            key: "4",
            title: "Координаты",
            dataIndex: "coord"
        }
    ];

    const data = [
        {
            idEvent: 1,
            name: 'Иванов Иван Иванович',
            dep: 'Гродненский районный отдел по чрезвычайным ситуациям',
            coord:'53.9066368, 27.492352'
        },
        {
            idEvent: 2,
            name: 'Иванов Иван Иванович',
            dep: 'Гродненский районный отдел по чрезвычайным ситуациям',
            coord:'53.9066368, 27.492352'
        },
        {
            idEvent: 3,
            name: 'Иванов Иван Иванович',
            dep: 'Гродненский районный отдел по чрезвычайным ситуациям',
            coord:'53.9066368, 27.492352'
        },
        {
            idEvent: 4,
            name: 'Иванов Иван Иванович',
            dep: 'Гродненский районный отдел по чрезвычайным ситуациям',
            coord:'53.9066368, 27.492352'
        }
    ]

    return(
        <Content
        className="site-layout-background"
        style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
        }}
    >
        <Title level={3}>Геолокация</Title>
        <Input.Search style={{ width: 300 }} size="middle" placeholder="Введите запрос" />
        <Row gutter={16}>
      <Col  className="gutter-row" span={16}>
      <Table  columns={columns} dataSource={data} ></Table>
      </Col>
      <Col  className="gutter-row" span={8}>
      <YMaps>
            <Map width={500} height={500} defaultState={{
                center:[53.9, 27.5667],
                zoom:12
            }}>
               <Placemark geometry={[53.9066368, 27.492352]} />
               <Placemark geometry={[52.9066368, 27.492352]} />
            </Map>
        </YMaps>
      </Col>
      </Row>
        
        
        </Content>
    )
}

export default LocationPage; 