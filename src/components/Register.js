import React, {useState} from 'react';
import { Form, Input, Button, message  } from 'antd';
import axios from 'axios';
import { useHistory
} from "react-router-dom";
import Password from 'antd/lib/input/Password';
// import {useAuth} from '../App'



function Register(props) {

  const [loadingRegister, setLoadingRegister ] = useState(false)

  // let auth = useAuth();
  let history = useHistory();

  const onFinish = async values => {
    setLoadingRegister(true)
  
    try {
      const response = await axios.get(
        `https://iotzlearning.herokuapp.com/api/check-user?username=${values.username}`,                     
      )
      console.log(response.data)
      if(response.data.userExist === true) {
        setLoadingRegister(false)
        message.error('Xin lỗi, Tên đăng nhập đã được dùng!')
        console.log('deodc')
      } else{
        const res = await axios.post(
          'https://iotzlearning.herokuapp.com/api/register', 
              values,
        ) 
        setLoadingRegister(false)
        message.success('Đăng ký thành công')
        history.push('/login') 
        // localStorage.setItem ('_id', res.data._id);  
      }
     
      
        
     
    } catch (error) {
        console.log(error)     
    }
}
    //style
    const titleLoginStyle = {
        marginBottom: '20px',
        color: 'green',
        fontSize: '30px',
    }

   
    const lableStyle = {
      color: 'white ',
      
    }
    
      
    



    return (
        <div>
            <div style={titleLoginStyle}>
                Trang đăng ký tài khoản
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
        <Button type="primary" htmlType="submit" loading={loadingRegister}>
          Submit
        </Button>
      </Form.Item>
    </Form>
        </div>
    );
}

export default Register;