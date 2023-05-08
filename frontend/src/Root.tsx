import {NavLink, Outlet} from "react-router-dom";
import React, {useCallback, useEffect} from "react";
import {Layout, Menu, theme} from 'antd';
import "./Root.css"
const { Header, Content, Footer } = Layout;

export interface ipGeo {
  country : string,
  region  : string,
  city    : string,
  asn     : number,
  asn_name: string,
  rdns    : string,
}

interface ipInfo {
  [key: string]: ipGeo;
}

export interface serverStruct {
  name    : string,
  provider: string,
  country : string,
  location: string,
  aff_link: string,
}

export interface serverMap {
  [key: string]: serverStruct;
}

export default function Root() {
  const [ipLocation, setIpLocation] = React.useState({} as ipInfo);
  const [serverList, setServerList] = React.useState({} as serverMap);
  const inProgress = React.useRef(false);

  useEffect(() => {
    if (Object.keys(serverList).length > 0) {
      return
    }
    fetch('/api/servers').then(r => r.json()).then(r => {
      setServerList(r)
    })
  });

  const getIP = useCallback((ip:string) : ipGeo => {
    const result = {} as ipGeo
    if (ipLocation[ip] !== undefined) {
      return ipLocation[ip]
    }
    if (inProgress.current || ip === "*") {
      return result
    }
    inProgress.current = true
    fetch(`/api/ip?t=${ip}`).then(r => r.json()).then(r => {
      const newIpLocation = {...ipLocation}
      if (r.asn === 0) {
        newIpLocation[ip] = result
      } else {
        newIpLocation[ip] = r
      }
      setIpLocation(newIpLocation)
      inProgress.current = false
    })
    return result
  }, [ipLocation, inProgress])

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
  <Layout className="layout">
    <Header>
      <Menu
        theme="dark"
        mode="horizontal"
        items={[
          {key: "index", label: <NavLink to='/'>MTR.SB</NavLink>},
          {key: "ping", label: <NavLink to='/ping'>ping</NavLink>},
          {key: "traceroute", label: <NavLink to='/traceroute'>traceroute</NavLink>},
        ]}
      />
    </Header>
    <Content>
      <div className="site-layout-content" style={{ background: colorBgContainer }}>
        <Outlet context={[getIP, serverList]} />
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>MTR.SB</Footer>
  </Layout>
);
}
