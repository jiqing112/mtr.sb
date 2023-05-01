import React, {useEffect, useState} from "react";
import {Button, Col, Form, Input, Row, Table} from "antd";
import {ColumnsType} from "antd/es/table";
import {PingResponse} from "../../proto/mtrsb";
import {useOutletContext} from "react-router-dom";
import {serverMap} from "./Root";
import ReactCountryFlag from "react-country-flag";
import {LinkOutlined} from "@ant-design/icons";

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
    render: (_, { ip, ip_geo }) => (
      <span>{ip} <small style={{
        color: "gray"
      }}>{ip_geo}</small></span>
    ),
  },
  {
    title: 'Loss',
    dataIndex: 'loss',
    sorter: (a, b) => a.loss - b.loss,
  },
  {
    title: 'Sent',
    dataIndex: 'sent',
    sorter: (a, b) => a.sent - b.sent,
  },
  {
    title: 'Last',
    dataIndex: 'last',
    sorter: (a, b) => a.last - b.last,
  },
  {
    title: 'Avg',
    dataIndex: 'avg',
    sorter: (a, b) => a.avg - b.avg,
  },
  {
    title: 'Best',
    dataIndex: 'best',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.best - b.best,
  },
  {
    title: 'Worst',
    dataIndex: 'worst',
    sorter: (a, b) => a.worst - b.worst,
  },
  {
    title: 'Stdev',
    dataIndex: 'stdev',
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
  }, [start, target]);

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
      <Row>
        <Col span={12}>
          <Form.Item label="Target" name="Target">
            <Input placeholder="" />
          </Form.Item>
        </Col>
        <Col span={6}>
        </Col>
        <Col span={3}>
          <Form.Item>
            <Button type="primary" onClick={() => {
              setTarget(form.getFieldValue("Target"))
              setStart(true)
            }} disabled={start}>Start</Button>
          </Form.Item>
        </Col>
        <Col span={3}>
          <Form.Item>
            <Button danger type="primary" onClick={() => setStart(false)} disabled={!start}>Stop</Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
    <Table columns={columns} dataSource={tableData()} />
  </>
}
