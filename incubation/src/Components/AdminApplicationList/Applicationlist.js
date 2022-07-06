import React, { useState, useEffect, useContext } from 'react'
import { Modal } from 'react-bootstrap';
import './applicationList.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material'
import axios from 'axios';
import { adminServer } from '../../Constants/constants'
import { ApplicationContext } from '../../Store/ApplicationContext'
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


function Applicationlist() {

    const navigate = useNavigate()
    const [newApplicationList, setNewApplicationList] = useState([])
    const [pendingApplication, setPendingApplication] = useState([])
    const { viewApplications, setViewApplications } = useContext(ApplicationContext)
    let list, newApplicants, index = 1, pendingList

    useEffect(() => {
        displyAll()
    }, [newApplicationList])

    async function displyAll() {
        let response = await axios.get(`${adminServer}/applictions/list`)
        list = response.data.data
        //    console.log(response.data.data);

        newApplicants = list.filter((item) => {
            return item.status === 'new'
        })
        pendingList = list.filter((item) => {
            return item.status === 'pending'
        })
        setNewApplicationList(newApplicants)
        setPendingApplication(pendingList)
        // console.log(newApplicants);
    }
    
    // Modal
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [form, setForm] = useState()
    

    const makePending = async (id) => {
        // console.log(id);
        const response = await axios.get(`${adminServer}/user/change/${id}`)
        // console.log(response);
        setNewApplicationList(newApplicants)
    }
    const makeApprove = async (id)=>{
        await axios.get(`${adminServer}/user/approve/${id}`)
    }
    const makeCancel = async (id)=>{
        await axios.get(`${adminServer}/user/cancel/${id}`)
    }
    return (
        <div className='main'>
            {/* modal */}



            
            <Modal   show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Application For Incubation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {form &&
                        <div>

                            <div className="row">
                                <div className="mb-3 col-6">
                                    <label>Name</label>
                                    <input
                                        readOnly
                                        value={form.name}
                                        type="text"
                                        className="form-control"
                                        placeholder="First name"
                       
                                    />
                                </div>
                                <div className="mb-3 col-6">
                                    <label>Address</label>
                                    <input
                                        readOnly
                                        value={form.address}
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter email"
                                    
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="mb-3 col-6">
                                    <label>City</label>
                                    <input
                                        readOnly
                                        value={form.city}
                                        type="text"
                                        className="form-control"
                                        placeholder="First name"
                                   
                                    />
                                </div>

                                <div className="mb-3 col-6">
                                    <label>State</label>
                                    <input
                                        readOnly
                                        value={form.state}
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter email"
                                    
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="mb-3 col-6">
                                    <label>Email</label>
                                    <input
                                        readOnly
                                        value={form.email}
                                        type="text"
                                        className="form-control"
                                        placeholder="First name"
                                   
                                    />
                                </div>

                                <div className="mb-3 col-6">
                                    <label>Phone no</label>
                                    <input
                                        readOnly
                                        value={form.phoneno}
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter email"
                                   
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="mb-3 col-6">
                                    <label>Company Name</label>
                                    <input
                                        readOnly
                                        value={form.companyname}
                                        type="text"
                                        className="form-control"
                                        placeholder="First name"
                                  
                                    />
                                </div>


                            </div>
                            <div className="mb-3 ">
                                <label>Question : Describe Your Team and Background</label>
                                <textarea
                                    readOnly
                                    value={form.teamandbackground}
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter email"
                              
                                />
                            </div>
                            <div className="mb-3 ">
                                <label>Question : Describe Your Company and Products</label>
                                <textarea
                                    readOnly
                                    value={form.companyandproduct}
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter email"
                              
                                />
                            </div>
                            <div className="mb-3 ">
                                <label>Question : Describe the problem you are trying to solve</label>
                                <textarea
                                    readOnly
                                    value={form.problem}
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter email"
                              

                                />
                            </div>
                            <div className="mb-3 ">
                                <label>Question : What is unique about your solution </label>
                                <textarea
                                    readOnly
                                    value={form.solution}
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter email"
                              

                                />
                            </div>
                            <div className="mb-3 ">
                                <label>Question :  what is your value proposition for the customer</label>
                                <textarea
                                    readOnly
                                    value={form.valueproposition}
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter email"
                          

                                />
                            </div>
                            <div className="mb-3 ">
                                <label>Question : Who are your competitors and what is your competative advantage ?</label>
                                <textarea
                                    readOnly
                                    value={form.competators}
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter email"
                               

                                />
                            </div>
                            <div className="mb-3 ">
                                <label>Question : Explain your revenue model</label>
                                <textarea
                                    readOnly
                                    value={form.revenue}
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter email"
                       

                                />
                            </div>
                            <div className="mb-3 ">
                                <label>Question : What is the potential market size of the product ?</label>
                                <textarea
                                    readOnly
                                    value={form.potentialmarketsize}
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter email"
                               
                                />
                            </div>
                            <div className="mb-3 ">
                                <label>Question : How do you market or plan to market your product and services </label>
                                <textarea
                                    readOnly
                                    value={form.plan}
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter email"
                            
                                />
                            </div>
                            <label>Question : Type of Incubation</label>
                            <textarea
                                value={form.type}
                                type="text"
                                className="form-control"
                                placeholder="Enter email"
                                readOnly
                            

                            />
                            <div>

                            </div>
                            <div className="mb-3 ">
                                <label>Question : Upload a detailed bussiness proposal</label>
                                <textarea
                                    readOnly
                                    value={form.businessproposal}
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter email"
                               
                                />
                            </div>

                        </div>
                    }

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
            {/* modal */}
            <h2 className='heading1' >New Applicant list</h2>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead className='tablehead' >
                        <TableRow>
                            <TableCell style={{ color: 'white' }}>S.no </TableCell>
                            <TableCell style={{ color: 'white' }}>Company name</TableCell>
                            <TableCell style={{ color: 'white' }}>Company details</TableCell>
                            <TableCell style={{ color: 'white' }}></TableCell>
                            <TableCell style={{ color: 'white' }}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {newApplicationList && newApplicationList.map((data, index) => (


                            <TableRow >
                                <TableCell component="th" scope="row">
                                    {parseInt(index) + 1}
                                </TableCell>
                                <TableCell >{data.companyname}</TableCell>
                                <TableCell >{data.address},{data.city},{data.state}</TableCell>
                                <TableCell >
                                    <Button variant="outlined" color="success" onClick={() => {
                                        setForm(data)
                                        handleShow()
                                    }}>
                                        open
                                    </Button>
                                </TableCell>
                                <TableCell >
                                    <Button variant="outlined" color="error" onClick={() => {
                                        makePending(data._id)
                                    }}>
                                        Pending
                                    </Button>
                                </TableCell>
                            </TableRow>))}
                    </TableBody>
                </Table>
            </TableContainer>
            <h2 className='heading2' >Pending Applicant list</h2>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead className='tablehead' >
                        <TableRow>
                            <TableCell style={{ color: 'white' }}>S.no </TableCell>
                            <TableCell style={{ color: 'white' }}>Company name</TableCell>
                            <TableCell style={{ color: 'white' }}>Company details</TableCell>
                            <TableCell style={{ color: 'white' }}></TableCell>
                            <TableCell style={{ color: 'white' }}></TableCell>
                            <TableCell style={{ color: 'white' }}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {pendingApplication && pendingApplication.map((data, index) => (

                            <TableRow >
                                <TableCell component="th" scope="row">
                                    {parseInt(index) + 1}
                                </TableCell>
                                <TableCell >{data.companyname}</TableCell>
                                <TableCell >{data.address},{data.city},{data.state}</TableCell>
                                <TableCell >
                                    <Button variant="contained" color="success"
                                        onClick={() => {
                                            setForm(data)
                                            handleShow()
                                        }}>
                                        open

                                    </Button>
                                </TableCell>
                                <TableCell >
                                    <Button variant="outlined" onClick={() => {
                                        makeApprove(data._id)
                                    }}>
                                        Approve
                                    </Button>
                                </TableCell>
                                <TableCell >
                                    <Button style={{ backgroundColor: '#b8b8b8', color: 'red' }} onClick={() => {
                                        makeCancel(data._id)
                                    }}>
                                        decline
                                    </Button>
                                </TableCell>
                            </TableRow>))}

                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Applicationlist