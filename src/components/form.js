import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

export default function FormData() {

    const [Height, setHeight] = useState('');
    const [Weightt, setWeight] = useState('');
    const [Age, setAge] = useState('');
    const [waist, setWaist] = useState('');
    const [message, setMessage] = useState(null);
    const [isselected, setisselected] = useState(false);
    const [isother, setisother] = useState(false);
    let [optionList, setOptionList] = useState([]);





    async function Selectwaist() {

        try {
            let data = JSON.stringify({
                "height": Height,
                "weight": Weightt,
                "age": Age
            });
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://127.0.0.1:8000/measurements/',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };
            let response = await axios.request(config)

            console.log(response.data.data);
            setisselected(true)
            if (response.data.data[0] !== "other") {
                setWaist(response.data.data[0])
            } else {
                setisother(true)
            }
            setOptionList(response.data.data);
            console.log("jlgds", optionList)

        } catch (e) {
            setisselected(false)
        }
    }

    async function addwaist() {
        try {
            let data = JSON.stringify({
                "height": Height,
                "weight": Weightt,
                "age": Age,
                "waist": waist
            });
            let config = await {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://127.0.0.1:8000/add_measurements/',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };
            axios.request(config)
                .then((response) => {

                    console.log(JSON.stringify(response.data));
                    setMessage(response.data);
                    window.location.reload();
                })

                .catch((error) => {
                    console.log(error);
                });
            console.log("tetststsstt", data)
        } catch (e) {

        }
    }



    function selectwaist(value) {
        if (value === "other") {
            setisother(true)
        } else {
            setWaist(value)
            setisother(false)
        }

    }

    const [isValid, setValid] = useState(false);
    const validate = () => {
        return Height.length & Weightt.length && Age;
    };
    useEffect(() => {
        const isValid = validate();
        setValid(isValid);
    }, [Height, Weightt, Age,]);



    return (

        <div>
            <div className='main-div'>
                <h3 className='message'>{message && <span>{message.msg}</span>}</h3>
                <Container>
                    <div className="Measurement">
                    <h2 className='title'>Measurement</h2>
                        <Row className='justify-content-center m-auto'>
                            <Col lg={7}>
                                <Form.Group className="mb-3"    >
                                    <Form.Label>Height</Form.Label>
                                    <Form.Control required onChange={(e) => setHeight(e.target.value)} type="number" placeholder="enter height" />
                                </Form.Group>
                            </Col>
                            <Col lg={7}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Weight</Form.Label>
                                    <Form.Control required onChange={(e) => setWeight(e.target.value)} type="number" placeholder="enter weight" />
                                </Form.Group>
                            </Col>
                            <Col lg={7}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Age</Form.Label>
                                    <Form.Control required onChange={(e) => setAge(e.target.value)} type="number" placeholder="enter age" />
                                </Form.Group>
                            </Col>
                            {isselected && <Col lg={7}>
                                <Form.Group className="mb-3">
                                    <Form.Label>waist</Form.Label>
                                    <Form.Control disabled={!isother} onChange={(e) => setWaist(e.target.value)} value={waist} type="text" placeholder="enter waist" />
                                </Form.Group>
                            </Col>}
                            <Col lg={7}>
                                {isselected && <Form.Select onChange={(e) => selectwaist(e.target.value)}>
                                    {optionList?.map((option, index) => (
                                        <option key={index} value={option}>{option}</option>
                                    ))}
                                </Form.Select>}
                            </Col>
                        </Row>

                        <Button type="submit" disabled={!isValid} onClick={!isselected ? Selectwaist : addwaist} className='submit mb-3'>{!isselected ? "select-waist" : "add-waist"}</Button>

                    </div>


                </Container>
            </div>

        </div>
    )

}

