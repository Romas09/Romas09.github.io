import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Dropdown, Form, Modal, Row} from "react-bootstrap";
import {Context} from "../../index";
import {createDevice, fetchBrand, fetchDevice, fetchType} from "../../http/deviceApi";
import {observer} from "mobx-react-lite";

const CreateDevice = observer(({show, onHide}) => {
    const  {device} = useContext(Context)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)
    const [info, setInfo] = useState([])

    useEffect(() => {
        fetchType().then(data => device.setTypes(data))
        fetchBrand().then(data => device.setBrands(data))
    }, [])

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }

    const changeInfo =(key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }
    const  selectFile = e => {
        setFile(e.target.files[0])
    }

    const addDevice = () => {
        /*console.log(name, price, file,
        device.selectedBrand.id, device.selectedType.id,  JSON.stringify(info) )*/
        const formData =new FormData()
        formData.append('name', name)
        formData.append('price', price)
        formData.append('img', file)
        formData.append('brandId', device.selectedBrand.id)
        formData.append('typeId', device.selectedType.id)
       formData.append('info', JSON.stringify(info))// надо чинить
        createDevice(formData).then(data => onHide())
    }



    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить device
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                <Dropdown className="mt-2 mb-2">
                    <Dropdown.Toggle>{device.selectedType.name || "Выберите тип"}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {device.types.map(type =>
                            <Dropdown.Item onClick={() => device.setSelectedType(type)}
                                           key={type.id}>
                                {type.name}</Dropdown.Item>)}
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown className="mt-2 mb-2">
                    <Dropdown.Toggle>{device.selectedBrand.name || "Выберите брэнд"}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {device.brands.map(brand =>
                            <Dropdown.Item onClick={() => device.setSelectedBrand(brand)}
                                           key={brand.id}>
                                {brand.name}</Dropdown.Item>)}
                    </Dropdown.Menu>
                </Dropdown>
                <Form.Control className="mt-3"
                        placeholder="Введите название устройства"
                value={name} onChange={e => setName(e.target.value)}/>
                <Form.Control className="mt-3"
                        placeholder="Введите price устройства"
                type="number"
                value={price} onChange={e => setPrice(Number(e.target.value))}/>
                <Form.Control className="mt-3"
                        placeholder="Введите img устройства"
                type="file"
                onChange={selectFile}/>
                    <hr/>
                    <Button variant="outline-dark" onClick={addInfo}> Добавить новое устройство</Button>
                    { info.map(i =>
                    <Row className="mt-3" key={i.number}>
                    <Col md={4}>
                        <Form.Control value={i.title}
                             onChange={(e) => changeInfo('title', e.target.value, i.number)}
                            placeholder="ВВедите названеи свойства"
                        />
                    </Col>
                        <Col md={4}>
                            <Form.Control value={i.description}
                                 onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                placeholder="ВВедите описание свойства"
                            />
                        </Col>
                        <Col md={4}>
                            <Button  onClick={() => removeInfo(i.number)}
                                variant="outline-danger">
                                Delete
                            </Button>
                        </Col>
                    </Row>)}
                </Form>



            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
                <Button variant="outline-success" onClick={addDevice}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateDevice;