import {NavLink, Outlet} from "react-router-dom";
import React from "react";
import {Layout, Menu, theme} from 'antd';
import "./Root.css"
const { Header, Content, Footer } = Layout;

export default function Root() {
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
          {key: "ping", label: <NavLink to='/ping'>ping</NavLink> }
        ]}
      />
    </Header>
    <Content style={{ padding: '20px 50px' }}>
      <div className="site-layout-content" style={{ background: colorBgContainer }}>
        <Outlet />
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>MTR.SB</Footer>
  </Layout>
);
}
