import React, { useState, useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { LinearProgress } from '@mui/material';
import axios from 'axios'
import { adminServer } from '../../Constants/constants'
import Progress_bar from '../ProgressBar/ProgressBar';

function Recordtrack() {

    const [allApplication, setAllApplication] = useState([])

    useEffect(() => {

        try {
            axios.get(`${adminServer}/allApllications`).then((response) => {
                console.log(response.data.all)
                setAllApplication(response.data.all)

            }).catch((err) => {
                console.lo(err)
            })

        } catch (err) {
            console.log(err)
        }

    }, [])


    return (
        <div className='main'>
            <h2 className='heading1' >New Applicant list</h2>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead className='tablehead' >
                        <TableRow>
                            <TableCell style={{ color: 'white' }}>S.no </TableCell>
                            <TableCell style={{ color: 'white' }}>Company name</TableCell>
                            <TableCell style={{ color: 'white' }}>Company details</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                          
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {allApplication.map((data, index) => (

                            <TableRow >
                                <TableCell component="th" scope="row">
                                    {parseInt(index) + 1}
                                </TableCell>
                                <TableCell >{data.companyname}</TableCell>
                                <TableCell >{data.address},{data.city},{data.state}</TableCell>
                                <TableCell >
                                    {/* <LinearProgress color="success" variant='determinate' value={data.status === 'cancelled' ? 0 :data.status === 'new' ? 30 : data.status === 'pending' ? 80 : 100 } /> */}
                                    <Progress_bar status={data.status}/>
                                </TableCell>
                            </TableRow>

                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    )
}

export default Recordtrack