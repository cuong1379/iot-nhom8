import React, {useEffect, useState} from 'react';
import { Form, Input, Button, message } from 'antd';
import {useAuth} from '../App'
import axios from 'axios';
import {useHistory
} from "react-router-dom";
import './login.css'

export function Login(props) {

  const [loadingLogin, setLoadingLogin ] = useState(false)


  let auth = useAuth();
  let history = useHistory();

  useEffect(() => {
    console.log(auth.user)
    auth.user && history.push('/')
  })

    const onFinish = async values => {
      setLoadingLogin(true)
        try {
          const res = await axios.post(
              'https://iotzlearning.herokuapp.com/api/login', 
                  values
          )
          if(res.data._id){
            setLoadingLogin(false)
            message.success('Đăng nhập thành công')


            // localStorage.setItem('user', res.data)
           
            console.log(res.data)
            localStorage.setItem ('_id', res.data._id);

            auth.signin(res.data) 
            history.push('/')
          }else{
            message.error('Đăng nhập thất bại')
          }
        } catch (error) {
            console.log(error)
        }
    }

    
    const redirectRegister = () => {
      history.push('/register') 
    }

    const titleLoginStyle = {
        marginBottom: '20px',
        color: 'green',
        fontSize: '30px',
    }
    
    const pStyle = {
      paddingTop: '50px'
    }

    const lableStyle = {
      color: 'white ',
      
    }
    

    return (
        <div>
            <div style={titleLoginStyle}>
                Trang đăng nhập
            </div>
            <Form
      name="basic"
      onFinish={onFinish}
    >
      <Form.Item
        label={
          <div style={lableStyle}>
            Username
          </div>
        }
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={
          <div style={lableStyle}>
            Password
          </div>
        }
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loadingLogin}>
          Submit
        </Button>
      </Form.Item>
    </Form>
    
      <p style={pStyle}>Nếu bạn chưa có tài khoản, vui lòng đăng ký</p>
      <button  className="button2 b-blue rot-135" onClick={redirectRegister}>Đăng ký</button>
    
    
        </div>
    );
}

export default Login;