import React from 'react';
import {Card, Col, Image} from "react-bootstrap";
import star from "../assets/star.png"
import { useNavigate } from "react-router-dom"
import {DEVICE_ROUTE} from "../utils/consts";
const DeviceItem = ({device}) => {
    const history = useNavigate()
    console.log(history)
    return (
        <Col md={3} className="mt-2" onClick={() => history(DEVICE_ROUTE + '/' + device.id)}>
            <Card style={{width: 150, cursor: 'pointer'}} border={"light"} >
                <Image width={150} height={150} src={process.env.REACT_APP_API_URL+device.img} />
                <div className=" my-1 d-flex justify-content-between  align-items-center">
                    <div>Samsung...</div>
                    <div className="d-flex align-items-center">
                        <div>{device.rating}</div>
                        <Image src={star} width={18} height={18}/>
                    </div>

                </div>
                <div>{device.name}</div>
            </Card>
        </Col>
    );
};

export default DeviceItem;