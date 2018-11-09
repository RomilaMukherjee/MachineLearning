import React from 'react';
import { Form, Icon, Input, Button, Spin } from 'antd';
import { connect } from 'react-redux';
//import { NavLink } from 'react-router-dom';
import * as actions from '../../store/actions/auth';
//import D3Chart from '../../Chart'
import axios from "axios";
import { bindActionCreators } from 'redux';
import { storeAuthentication } from '../../store/actions/auth';

const FormItem = Form.Item;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;


class NormalLoginForm extends React.Component {
    constructor() {
        super();
        this.state = {
          isAuthenticated: false
        };
      }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
        console.log(values.userName+"  "+values.password);  
      if (!err) {
        axios.get("http://127.0.0.1:8000/webapp/login/?username="+values.userName+"&password="+values.password).then(res => {   
            console.log(res.data);
            console.log(res.data.authenticated);
            if(res.data.authenticated){
                this.props.history.push('/map');
                this.setState({ isAuthenticated: res.data.authenticated});
                this.props.isAuthenticated = true;  
                console.log("int "+this.props.isAuthenticated);  
                }
            else{
                this.props.history.push('/');
                this.setState({ isAuthenticated: res.data.authenticated});
                this.props.isAuthenticated = false;
                console.log("inaft "+this.props.isAuthenticated);
                } 
                console.log("aft "+this.props.isAuthenticated);
                return this.props.isAuthenticated;
          });
          
      }
    });
  }

  render() {
    let errorMessage = null;
    if (this.props.error) {
        errorMessage = (
            <p>{this.props.error.message}</p>
        );
    }

    const { getFieldDecorator } = this.props.form;
    return (
        <div>
            {errorMessage}
            {
                this.props.loading ?

                <Spin indicator={antIcon} />

                :

                <Form onSubmit={this.handleSubmit} className="login-form" style={{height:250, width:450}}>

                    <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    )}
                    </FormItem>

                    <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                    </FormItem>

                    <FormItem>
                    <Button type="primary" htmlType="submit" style={{marginRight: '10px'}}>
                        Login
                    </Button>
                    </FormItem>
                   
                </Form>
                
            }
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error,
        isAuthenticated: state.isAuthenticated
    }
}

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        storeAuthentication
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm);