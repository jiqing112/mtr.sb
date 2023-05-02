import {useEffect, useState} from "react";

interface DataStruct {
  [key: string]: string;
}

export default function Version() {
  const [data, setData] = useState({} as DataStruct)
  const [initEd, setInitEd] = useState(false)

  useEffect(() => {
    if (initEd) {
      return
    }
    const sse = new EventSource(`/api/version`);
    sse.onmessage = (ev) => {
      let parsed = JSON.parse(ev.data)
      let nodeName = parsed.node
      setData((prev) => {
        const newData = {...prev}
        newData[nodeName] = parsed.data
        return newData
      })
    };
    setInitEd(true)
    return () => {
      sse.close()
    }
  }, [initEd]);

  const x = () => {
    const tmpData = {...data}
    const r = [<li>Web - {data["Web"] ?? "N/A"}</li>, <li></li>]
    delete tmpData["Web"]
    for (const [key, value] of Object.entries(tmpData)) {
      r.push(<li>{key} - {value}</li>)
    }
    return r
  }

  return <>
    <h1>Version</h1>
    <ul>
      {x()}
    </ul>
  </>
}
