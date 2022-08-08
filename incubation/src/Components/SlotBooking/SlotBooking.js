import React, { useState, useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import './slotBooking.css'
import { adminServer } from '../../Constants/constants'

function SlotBooking() {
    let A, B, C, D, E
    const [slotA, setSlotA] = useState([])
    const [slotB, setSlotB] = useState([])
    const [slotC, setSlotC] = useState([])
    const [slotD, setSlotD] = useState([])
    const [slotE, setSlotE] = useState([])

    const [company, setCompany] = useState([])

    const [slotId, setSlotId] = useState()
    const [slotSection, setSlotSection] = useState()

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    useEffect(() => {
        displaySlots()
        applications()
    }, [show]) 
    const displaySlots = async () => {
        await axios.get(`${adminServer}/getslots`).then((response) => {
            const slots = response.data

            A = slots.filter((item) => {
                return (item.section === 'A')
            })
            setSlotA(A)
            B = slots.filter((item) => {
                return (item.section === 'B')
            })
            setSlotB(B)
            C = slots.filter((item) => {
                return (item.section === 'C')
            })
            setSlotC(C)
            D = slots.filter((item) => {
                return (item.section === 'D')
            })
            setSlotD(D)
            E = slots.filter((item) => {
                return (item.section === 'E')
            })
            setSlotE(E)
        })
    }
    const applications = async () => {
        await axios.get(`${adminServer}/applictions/lists`).then((response) => {
            setCompany(response.data.data)
        })
    }

    const handShow = (slotId, slotSelected) => {
        setSlotId(slotId)
        setSlotSection(slotSelected)
        console.log(slotId, slotSelected);
        setShow(true);
    }
    const slotBooking = async (id) => {
        let applicantId = id
        console.log(applicantId, slotId, slotSection)
        await axios.get(`${adminServer}/update?applicantId=${applicantId}&slotId=${slotId}&slotSection=${slotSection}`)
    }

    return (
        <div className='container'>
            <div className="d-flex sectionA ms-lg-5 mx-auto">
                {slotA &&
                    slotA.map((item) => {

                        return (
                            <div className={item.isBooked ? 'slot  bg-secondary' : 'slot  bg-warning'} onClick={() => { return (item.isBooked ? " " : handShow(item.slot, item.section)) }}></div>
                        )
                    })
                }
            </div>
            <div className="row ms-5">
                <div className="col-md-2 col-sm-6 ms-5 section">
                    {slotB &&
                        slotB.map((item) => {
                            return (
                                <div className={item.isBooked ? 'subSlot col-4  bg-secondary' : 'subSlot col-4  bg-warning'} onClick={() => { return (item.isBooked ? " " : handShow(item.slot, item.section)) }}></div>
                            )
                        })}
                </div>
                <div className="col-md-2 col-sm-6   section">
                    {slotC &&
                        slotC.map((item) => {
                            return (
                                <div className={item.isBooked ? 'subSlot col-4  bg-secondary' : 'subSlot col-4  bg-warning'} onClick={() => { return (item.isBooked ? " " : handShow(item.slot, item.section)) }}></div>
                            )
                        })}
                </div>
                <div className="col-md-2 col-sm-6   section">
                    {slotD &&
                        slotD.map((item) => {
                            return (
                                <div className={item.isBooked ? 'subSlot col-4  bg-secondary' : 'subSlot col-4  bg-warning'} onClick={() => { return (item.isBooked ? " " : handShow(item.slot, item.section)) }}></div>
                            )
                        })}
                </div>
                <div className="col-md-2 col-sm-6  section">
                    {slotE &&
                        slotE.map((item) => {
                            return (
                                <div className={item.isBooked ? 'subSlot col-4  bg-secondary' : 'subSlot col-4  bg-warning'} onClick={() => { return (item.isBooked ? " " : handShow(item.slot, item.section)) }}></div>
                            )
                        })}
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Select a Company</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <select class="form-select" aria-label="Default select example"
                        onChange={(e) => {
                            slotBooking(e.target.value)
                        }}>
                        <option selected>--select--</option>
                        {company &&
                            company.map((item) => {
                                return (
                                    <option value={item._id}> {item.companyname}</option>
                                )
                            })
                        }
                    </select>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default SlotBooking