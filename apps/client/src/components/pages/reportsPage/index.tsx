import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAdminDataAction } from '../../../store/asyncFunctions/admin';
import { VacationsReport } from './adminCharts';

export function ReportsPage() {
    const adminReducer = useSelector((state: any) => state?.adminReducer);
    const isServiceError = useSelector((state: any) => state.errorReducer);

    useEffect(() => {
        getAdminDataAction();
    }, [])

    return (
        <div>
            <h1> Reports Page </h1>
            {
                adminReducer?.adminData
                    ? <>
                        {
                            isServiceError?.isError
                                ? <Typography variant="h6" component="div" sx={{ m: 1 }} color='red'>
                                    {isServiceError?.message}
                                </Typography>
                                : null
                        }
                        <VacationsReport reportData={
                            adminReducer?.adminData?.filter((v: any) => {
                                return v?.number_of_followers > 0
                            })
                        } />
                    </>
                    : <div>
                        <h1> UnAuth please login again <Link to={"/login"} >click here</Link></h1>
                    </div>
            }
        </div>
    )
}
