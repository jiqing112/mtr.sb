import {NavLink, Outlet} from "react-router-dom";
import React, {useCallback, useEffect} from "react";
import {Layout, Menu, theme} from 'antd';
import "./Root.css"
const { Header, Content, Footer } = Layout;

interface ipInfo {
  [key: string]: string;
}

interface serverStruct {
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

  useEffect(() => {
    if (Object.keys(serverList).length > 0) {
      return
    }
    fetch('/api/servers').then(r => r.json()).then(r => {
      setServerList(r)
    })
  });

  const getIP = useCallback((ip:string) : string => {
    if (ipLocation[ip] !== undefined) {
      return ipLocation[ip]
    }
    fetch(`/api/ip?t=${ip}`).then(r => r.text()).then(r => {
      const newIpLocation = {...ipLocation}
      newIpLocation[ip] = r
      setIpLocation(newIpLocation)
    })
    return ""
  }, [ipLocation])

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
          {key: "version", label: <NavLink to='/version'>version</NavLink>},
        ]}
      />
    </Header>
    <Content style={{ padding: '20px 50px' }}>
      <div className="site-layout-content" style={{ background: colorBgContainer }}>
        <Outlet context={[getIP, serverList]} />
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>MTR.SB</Footer>
  </Layout>
);
}
