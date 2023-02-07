import { useEffect, useState } from 'react';
import { MemoryResponse, MemorySizeResponse } from '../shared/interfaces';
import StatsService from '../services/stats.service';
import { Gauge } from '@ant-design/plots';
import { Badge, Card, Col, ConfigProvider, DatePicker, Divider, Row } from 'antd';
import ruRu from 'antd/es/locale/ru_RU';
const ServerStatisticsPage = () =>{
    const [cpuUsage, setCpuUsage] = useState<number>();
    const [memoryStatus, setMemoryStatus] = useState<MemoryResponse[]>([]);
    const [memorySize, setMemorySize] = useState<MemorySizeResponse[]>([]);
    useEffect(()=>{
        StatsService.getCpuUsage().then((value)=>{
            const cpu = Number(value.data);
            setCpuUsage(100-cpu);
        });
    }, [])


    useEffect(()=>{
        StatsService.getMemorySize().then((value)=>{
           setMemorySize(value.data);
        });
    }, [])


    useEffect(()=>{
      
        StatsService.getMemoryStatus().then((value)=>{
           setMemoryStatus(value.data);
        });
    }, [])

 
    const gaugeConfig = {
        percent: cpuUsage ? cpuUsage/100:0,
        range: {
            ticks: [0, 1 / 3, 2 / 3, 1],
            color: ['#30BF78', '#FAAD14', '#F4664A'],
          },
          indicator: {
            pointer: {
              style: {
                stroke: '#D0D0D0',
              },
            },
            pin: {
              style: {
                stroke: '#D0D0D0',
              },
            },
          },
          statistic: {
            content: {
              style: {
                fontSize: '25px',
                lineHeight: '25px',
              },
            },
          },
        };


        const dbConfig = {
            percent: memorySize.length===2 ? Number(memorySize[0].percentage.slice(memorySize[0].percentage.length-2, 1))/100:0.5,
            range: {
                ticks: [0, 1 / 3, 2 / 3, 1],
                color: ['#30BF78', '#FAAD14', '#F4664A'],
              },
              indicator: {
                pointer: {
                  style: {
                    stroke: '#D0D0D0',
                  },
                },
                pin: {
                  style: {
                    stroke: '#D0D0D0',
                  },
                },
              },
              statistic: {
                content: {
                  style: {
                    fontSize: '25px',
                    lineHeight: '25px',
                  },
                },
              },
            };
            const appConfig = {
                percent: memorySize.length===2 ? Number(memorySize[1].percentage.slice(memorySize[1].percentage.length-2, 1))/100:0.5,
                range: {
                    ticks: [0, 1 / 3, 2 / 3, 1],
                    color: ['#30BF78', '#FAAD14', '#F4664A'],
                  },
                  indicator: {
                    pointer: {
                      style: {
                        stroke: '#D0D0D0',
                      },
                    },
                    pin: {
                      style: {
                        stroke: '#D0D0D0',
                      },
                    },
                  },
                  statistic: {
                    content: {
                      style: {
                        fontSize: '25px',
                        lineHeight: '25px',
                      },
                    },
                  },
                };

                function onChange(){

                }
    return(
        <div className="site-card-wrapper">

    <Row gutter={16}>
      <Col  className="gutter-row" span={8}>
        
        <Card title="Загрузка ЦП" bordered={false} size="small">
        <Gauge padding={0} height={200} {...gaugeConfig} />
        </Card>
      </Col>
      <Col  className="gutter-row" span={8} >
        <Card title="Память базы данных" bordered={false} size="small">
        <Gauge padding={0} height={200} {...dbConfig} />
        </Card>
      </Col>
      <Col  className="gutter-row" span={8}>
        <Card title="Память приложения" bordered={false} size="small">
        <Gauge padding={0} height={200} {...appConfig} />
        </Card>
      </Col>
    </Row>
    <Divider />
    <Row gutter={16}>
      <Col  className="gutter-row" span={8}>
      <Badge.Ribbon text="Активен" color="green">
        <Card title="Диск 1" bordered={false}>
            <p>Статус: <Badge status="success" text="Активен" /></p>
            
        </Card>
        </Badge.Ribbon>
      </Col>
      <Col  className="gutter-row" span={8}>
        <Card title="Диск 2" bordered={false}>
        <p>Статус: <Badge status="success" text="Активен" /></p>
        </Card>
      </Col>
      <Col  className="gutter-row" span={8}>
        <Card title="Диск 3" bordered={false}>
        <p>Статус: <Badge status="success" text="Активен" /></p>
        </Card>
      </Col>
    </Row>
    <Divider />
    <Row gutter={16}>
      <Col  className="gutter-row" span={8}>
        <Card title="Диск 4" bordered={false}>
        <p>Статус: <Badge status="success" text="Активен" /></p>
        </Card>
      </Col>
      <Col  className="gutter-row" span={8}>
        <Card title="Диск 5" bordered={false}>
        <p>Статус: <Badge status="success" text="Активен" /></p>
        </Card>
      </Col>
      <Col  className="gutter-row" span={8}>
        <Card title="Диск 6" bordered={false}>
        <p>Статус: <Badge status="success" text="Активен" /></p>
        </Card>
      </Col>
    </Row>
    <Divider />
    <Row gutter={16}>
      <Col  className="gutter-row" span={8}>
        <Card title="Диск 7" bordered={false}>
        <p>Статус: <Badge status="success" text="Активен" /></p>
        </Card>
      </Col>
      <Col  className="gutter-row" span={8}>
        <Card title="Диск 8" bordered={false}>
        <p>Статус: <Badge status="success" text="Активен" /></p>
        </Card>
      </Col>
      <Col  className="gutter-row" span={8}>
        <Card title="Диск 9" bordered={false}>
        <p>Статус: <Badge status="success" text="Активен" /></p>
        </Card>
      </Col>
    </Row>
  </div>
       
    )
}

export default ServerStatisticsPage;