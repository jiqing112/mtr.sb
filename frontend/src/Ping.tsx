import React, {useEffect, useState} from "react";
import {Button, Col, Form, Input, Row, Table} from "antd";
import {ColumnsType} from "antd/es/table";
import {PingResponse} from "../../proto/mtrsb";

interface DataStruct {
  [key: string]: PingResponse[];
}

interface PingTable {
  key: React.Key;
  node: string;
  ip: string;
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
    title: 'Node',
    dataIndex: 'node',
  },
  {
    title: 'IP',
    dataIndex: 'ip',
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
      r.push({
        key: key+value.length,
        node: key,
        ip: value.filter((x) => x.lookup !== undefined).at(0)?.lookup!.ip!,
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
