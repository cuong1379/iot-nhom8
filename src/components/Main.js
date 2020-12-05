import React, {useState}  from 'react';
import axios from 'axios';
import { Button, Space } from 'antd';
import './main.css'


function Main(props) {

    // const [infoLogin, setInfoLogin] = useState('')
    
    // const [userId, setUserId] = useState('')

    
    // const getInfoUser = async () => {
    //       try {
    //           const res = await axios.get(
    //               `https://iotzlearning.herokuapp.com/`
    //           )
    //           console.log(res.data)

    //           setInfoLogin(res.data)
    //       } catch (error) {
    //           console.log(error.message)
    //       }
    // }
    
    
    const [on, setOn] = useState(false)
    const [loadingOn, setLoadingOn ] = useState(false)
    const [loadingOff, setLoadingOff ] = useState(false)
    
        
          
    

    
        const handleLightOn = async () => {
            setLoadingOn(true)
            try {
                const res = await axios.get(
                    `https://iotzlearning.herokuapp.com/api/light?key=${localStorage.getItem('_id')}&turn=on`
                )
                
                if(res.data.sendSwitchLight = "OK"){
                    setOn(true)
                    setLoadingOn(false)
                }
                console.log('den sang')
                console.log(res.data)
                
            } catch (error) {
                
                console.log(error.message)
            }
        }
          
   

        const handleLightOff = async () => {
            
            try {
                const res = await axios.get(
                    `https://iotzlearning.herokuapp.com/api/light?key=${localStorage.getItem('_id')}&turn=off`
                )
                if(res.data.sendSwitchLight = "OK"){
                    setOn(false)
                    
                }
                console.log('den tat')
                console.log(res.data)
                
            } catch (error) {
                
                console.log(error.message)
            }
        }

        //Phan nay doi sever Pi lam moi uncmt duoc

        // const handleCurrentLightStatus = async () => {
        //     try {
        //         const res = await axios.get(
        //             `https://iotzlearning.herokuapp.com/api/light?key=${localStorage.getItem('_id')}`
        //         )
        //         console.log(res.data)
                
        //     } catch (error) {
        //         console.log(error.message)
        //     }
        // }



        // const { loadings } = this.state;
        // const enterLoading = index => {
        //     this.setState(({ loadings }) => {
        //       const newLoadings = [...loadings];
        //       newLoadings[index] = true;
        
        //       return {
        //         loadings: newLoadings,
        //       };
        //     });
        //     setTimeout(() => {
        //       this.setState(({ loadings }) => {
        //         const newLoadings = [...loadings];
        //         newLoadings[index] = false;
        
        //         return {
        //           loadings: newLoadings,
        //         };
        //       });
        //     }, 6000);
        //   };

    //    const loadingState = () => {
    //        {loading}
    //    }


    //Style
    const btnStyle = {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 30,
    }

   
    
    return (
        
        <div>
           
            <div>
                <div style={btnStyle}>
                    <Space  size={30}>
                        <Button type="primary" onClick={handleLightOn} loading={loadingOn}>Light On</Button>
                        <Button type="primary" danger onClick={handleLightOff} >Light Off</Button>
                    </Space>
                </div>
                {/* <Button type="primary" onClick={handleCurrentLightStatus} >Check Light Status</Button> */}
            </div>

            <span className={on ? 'light on' : 'light'}>
                 <i className="fas fa-lightbulb"></i>
            </span>
            
            
        </div>
    );
}

export default Main;