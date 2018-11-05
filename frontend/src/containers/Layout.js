import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import green from '../../src/green.svg'

const { Header, Content, Footer } = Layout;

class CustomLayout extends React.Component {
    render() {
        return (
            <Layout className="App">
                <Header className="Head">
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    style={{ lineHeight: '64px' }}
                >
    
                {
                    this.props.isAuthenticated ?
                    /*<Menu.Item key="2" onClick={this.props = {isAuthenticated: false}}>*/
                    <Menu.Item key="2" onClick={this.props.logout}>
                        <Link to="/">Logout</Link>
                    </Menu.Item>
    
                    :
                    <Menu.Item key="2">
                        <Link to="/login">Login</Link>
                    </Menu.Item>
                }
                        
                </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }} className="Head">
                    <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                    {
                        this.props.isAuthenticated?
                        <Breadcrumb.Item><Link to="/chart">View Prediction</Link></Breadcrumb.Item>
                        :
                        <Breadcrumb.Item/>
                    }
                    
                </Breadcrumb>
                <div className="App-header">
                <img src={green} className="App-logo" alt="green.svg" />         
                <p style={{color:'white', fontSize: 20, marginTop:10}}>
                   Welcome To Energy Consumption Prediction
                </p>
                
                    <div style={{ background: '#fff', minHeight: 280 }}>
                        {this.props.children}
                    </div>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                </Footer>
            </Layout>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())
    }
}

export default withRouter(connect(null, mapDispatchToProps)(CustomLayout));