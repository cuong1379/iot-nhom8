import React, {useState, useEffect}  from 'react';
import axios from 'axios';
import { Button, Space } from 'antd';
import './main.css'
import { Bar } from 'react-chartjs-2';


function Main(props) {

    const [on, setOn] = useState(false)
    const [loadingOn, setLoadingOn ] = useState(false)

    const [humidity, setHumidity] = useState()
    const [temperature, setTemperature] = useState()
    const [gas, setGas] = useState()


        const handleLightOn = async () => {
            setLoadingOn(true)
            try {
                const res = await axios.get(
                    `https://iotzlearning.herokuapp.com/api/light?key=${localStorage.getItem('_id')}&turn=on`
                )
                
                if(res.data.sendSwitchLight = "OK"){
                    setOn(true)
                    setLoadingOn(false)
                    try {
                        const response = await axios.get(
                            `https://iotzlearning.herokuapp.com/api/update-light?key=${localStorage.getItem('_id')}&turn=on`
                        )               
                    } catch (error) {
                        
                        console.log(error.message)
                    }
                 
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
                    try {
                        const response = await axios.get(
                            `https://iotzlearning.herokuapp.com/api/update-light?key=${localStorage.getItem('_id')}&turn=off`
                        )               
                    } catch (error) {
                        
                        console.log(error.message)
                    }
                    
                }
                console.log('den tat')
                console.log(res.data)
                
            } catch (error) {
                
                console.log(error.message)
            }
        }


            useEffect( async () => {
                try {
                    const res = await axios.get(
                        `https://iotzlearning.herokuapp.com/api/data?key=${localStorage.getItem('_id')}`
                    )
                    const datas = res.data
                    setHumidity(datas[0].humidity)
                    setTemperature(datas[0].temperature)
                    setGas(datas[0].gas)
                    
                   
                    
                } catch (error) {
                    
                    console.log(error.message)
                }
              }, []);


         

    //Style
    const btnStyle = {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 30,
    }
    const resfeshStyle = {
        marginBottom: 100,
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
            
            </div>

            <span className={on ? 'light on' : 'light'}>
                 <i className="fas fa-lightbulb"></i>
            </span>

            
            
            <Bar
                data={{
                labels: [
                    "Độ ẩm",
                    "Nhiệt độ",
                    "Gas",

                ],
                borderColor: "white",
                color: "white",
                datasets: [
                    {
                    label: "độ",
                    backgroundColor: [
                        "#3e95cd",
                        "#8e5ea2",
                        "#3cba9f",

                    ],
                    
                    data: [humidity, temperature, gas]
                    
                    }
                ]
                }}
                options={{
                legend: { display: false },
                title: {
                    display: true,
                    text: "Biểu đồ quan sát độ ẩm, nhiệt độ, gas"
                }
                }}
            />

        </div>
    );
}

export default Main;