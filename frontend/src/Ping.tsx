import React, {useEffect, useState} from "react";
import {Button, Checkbox, Col, Form, Input, Row, Select, Table} from "antd";
import {ColumnsType} from "antd/es/table";
import {PingResponse} from "../../proto/mtrsb";
import {useOutletContext} from "react-router-dom";
import {serverMap} from "./Root";
import ReactCountryFlag from "react-country-flag";
import {LinkOutlined} from "@ant-design/icons";

const { Option } = Select;

interface DataStruct {
  [key: string]: PingResponse[];
}

interface PingTable {
  key: React.Key;
  country: string;
  location: string;
  provider: string;
  aff: string;
  ip: string;
  ip_geo: string;
  loss: number;
  sent: number;
  last: number;
  avg: number;
  best: number;
  worst: number;
  stdev: number;
}

const columns: ColumnsType<PingTable> = [
  {
    title: 'Location',
    dataIndex: 'location',
    width: 150,
    render: (_, { country, location }) => (
      <>
        <ReactCountryFlag title={country} countryCode={country} svg style={{
          width: '21px',
          height: '15px',
          marginRight: '5px',
        }} />
        <span>{location}</span>
      </>
    ),
  },
  {
    title: 'Provider',
    dataIndex: 'provider',
    width: 100,
    render: (_, { provider, aff }) => {
      if (aff !== "") {
        return (
          <>
            <a href={aff} target="_blank" rel="noreferrer">{provider} <LinkOutlined /></a>
          </>
        )
      } else {
        return (
          <>
            <span>{provider}</span>
          </>
        )
      }
    },
  },
  {
    title: 'IP',
    dataIndex: 'ip',
    width: 500,
    render: (_, { ip, ip_geo }) => (
      <span>{ip} <small style={{
        color: "gray"
      }}>{ip_geo}</small></span>
    ),
  },
  {
    title: 'Loss',
    dataIndex: 'loss',
    width: 100,
    sorter: (a, b) => a.loss - b.loss,
  },
  {
    title: 'Sent',
    dataIndex: 'sent',
    width: 100,
    sorter: (a, b) => a.sent - b.sent,
  },
  {
    title: 'Last',
    dataIndex: 'last',
    width: 100,
    sorter: (a, b) => a.last - b.last,
  },
  {
    title: 'Avg',
    dataIndex: 'avg',
    width: 100,
    sorter: (a, b) => a.avg - b.avg,
  },
  {
    title: 'Best',
    dataIndex: 'best',
    defaultSortOrder: 'ascend',
    width: 100,
    sorter: (a, b) => a.best - b.best,
  },
  {
    title: 'Worst',
    dataIndex: 'worst',
    width: 100,
    sorter: (a, b) => a.worst - b.worst,
  },
  {
    title: 'Stdev',
    dataIndex: 'stdev',
    width: 100,
    sorter: (a, b) => a.stdev - b.stdev,
  },
];

function dev(arr: number[]) : number {
  const n = arr.length
  const mean = arr.reduce((a, b) => a + b, 0) / n
  return Math.sqrt(arr.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b, 0) / n)
}

export default function Ping() {
  const [form] = Form.useForm();
  const [data, setData] = useState({} as DataStruct);
  const [target, setTarget] = useState("");
  const [protocol, setProtocol] = useState("");
  const [rd, setRd] = useState(1);
  const [start, setStart] = useState(false);
  const [getIP, serverList] = useOutletContext() as [(ip: string) => string, serverMap];

  useEffect(() => {
    if (!start || target === "") {
      return
    }
    setData({})
    const sse = new EventSource(`/api/ping?host=${target}`);
    sse.onmessage = (ev) => {
      let parsed = JSON.parse(ev.data)
      let nodeName = parsed.node
      setData((prev) => {
        const newData = {...prev}
        if (newData[nodeName] === undefined) {
          newData[nodeName] = [parsed.data]
        } else {
          newData[nodeName] = [...prev[nodeName], parsed.data]
        }
        return newData
      })
    };
    sse.onerror = () => {
      setStart(false)
    }
    return () => {
      sse.close()
      setStart(false)
    }
  }, [start, target, protocol, rd]);

  let tableData = () => {
    let r: PingTable[] = []
    for (const [key, value] of Object.entries<PingResponse[]>(data)) {
      const rttList = value.filter((x) => x.reply !== undefined).map((x)=>x.reply!.rtt!)
      const ip = value.filter((x) => x.lookup !== undefined).at(0)?.lookup!.ip!
      r.push({
        key: key+value.length,
        country: serverList[key].country,
        location: serverList[key].location,
        provider: serverList[key].provider,
        aff: serverList[key].aff_link,
        ip: ip,
        ip_geo: getIP(ip),
        loss: value.filter((x) => x.timeout !== undefined).length,
        sent: value.filter((x) => x.reply !== undefined || x.timeout !== undefined).length,
        last: rttList.at(-1) ?? -1,
        avg: parseFloat((rttList.reduce((a, b) => a + b, 0) / rttList.length).toFixed(2)),
        best: Math.min.apply(null, rttList),
        worst: Math.max.apply(null, rttList),
        stdev: parseFloat(dev(rttList).toFixed(2)),
      })
    }
    return r
  }

  return <>
    <h1>Ping</h1>
    <Form form={form}>
      <Row gutter={16}>
        <Col xs={24} sm={16} lg={6}>
          <Form.Item label="Target" name="Target">
            <Input placeholder="" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={8} lg={6}>
          <Form.Item label="Protocol" name="Protocol" initialValue="0">
            <Select>
              <Option value="0">Auto</Option>
              <Option value="1">IPv4</Option>
              <Option value="2">IPv6</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} sm={8} lg={6}>
          <Form.Item name="RD">
            <Checkbox checked={true}>Remote DNS</Checkbox>
          </Form.Item>
        </Col>
        <Col xs={12} sm={8} lg={3}>
          <Form.Item>
            <Button type="primary" onClick={() => {
              setTarget(form.getFieldValue("Target"))
              setProtocol(form.getFieldValue("Protocol"))
              setRd(form.getFieldInstance("RD").input.checked ? 1 : 0)
              setStart(true)
            }} disabled={start}>Start</Button>
          </Form.Item>
        </Col>
        <Col xs={12} sm={8} lg={3}>
          <Form.Item>
            <Button danger type="primary" onClick={() => setStart(false)} disabled={!start}>Stop</Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
    <Table columns={columns} dataSource={tableData()} scroll={{ x: 1300 }} sticky />
  </>
}
