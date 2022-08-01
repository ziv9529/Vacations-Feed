import React, { useEffect, useRef, useState } from 'react'
import { Box, TextField, Typography, Button, FormControl, InputLabel, OutlinedInput, InputAdornment, CircularProgress } from '@mui/material'
import { DesktopDatePicker, StaticDatePicker } from '@mui/x-date-pickers'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { addVacationService, editVacationService } from '../../../store/services/adminService'
import './styles.css'
import { store } from '../../../store'
import { clearError, updateError } from '../../../store/asyncFunctions/auth'
import { ACTIONS } from '../../../store/actions'
import { getinitialDate, initialAdminVacationState, isAdminFormValid, isErrorInManagement, ManagementState } from './helpers'
export function ManagementPage(props: any) {
    const navigate = useNavigate();
    const formRef = useRef();

    const adminReducer = useSelector((state: any) => state?.adminReducer);
    const vacationsReducer = useSelector((state: any) => state?.vacationsReducer);
    const isServiceError = useSelector((state: any) => state.errorReducer);
    const isLoading = useSelector((state: any) => state?.loaderReducer?.isLoading);
    const [isFilePicked, setIsFilePicked] = useState(false);

    const [vacationData, setVacationData] = useState<ManagementState>(initialAdminVacationState);
    const [lastImgPath, setLastImgPath] = useState<string>("");

    useEffect(() => {
        if (adminReducer?.vacationIDToEdit > 0) {
            // if the admin try to edit a vacation he need to get all the data in the input fields 
            const vacationInformation = vacationsReducer?.vacations?.filter((vacation: any) => {
                return vacation?.vacation_id === adminReducer?.vacationIDToEdit
            })
            const { vacation_destination, vacation_description, vacation_start_date, vacation_end_date, vacation_cost, vacation_image } = vacationInformation[0]
            setLastImgPath(vacation_image)
            setVacationData({
                ...vacationData,
                vacation_destination,
                vacation_description,
                vacation_start_date: vacation_start_date.slice(NaN, 10),
                vacation_end_date: vacation_end_date.slice(NaN, 10),
                vacation_cost
            })
        }
    }, [adminReducer?.vacationIDToEdit])

    const changeHandler = (event: any) => {
        setIsFilePicked(true);
    };

    const handleAdminSubmit = async (event: any) => {
        if (!isFilePicked) return alert("file must be filled")
        if (adminReducer.vacationIDToEdit < 0) {
            // user add new vacation
            try {
                event.preventDefault();
                const data = new FormData(formRef.current);
                const result = await addVacationService(data)
                store.dispatch({ type: ACTIONS.LOADER.SET_LOADER })
                store.dispatch(clearError())
                if (result) {
                    setVacationData(initialAdminVacationState)
                    alert(`vacation to ${vacationData.vacation_destination} added successfully!`)
                    navigate('/')
                }
            } catch (error) {
                store.dispatch(updateError(((error as any)?.response?.data) as string))
                alert("somthing went wrong please try again")
                console.error(error)
            } finally {
                store.dispatch({ type: ACTIONS.LOADER.CLEAR_LOADER })
            }
        } else {
            // user edit vacation
            try {
                event.preventDefault();
                const data = new FormData(formRef.current);
                const VacID = adminReducer?.vacationIDToEdit
                const result = await editVacationService(data, VacID)
                if (result) {
                    store.dispatch({ type: ACTIONS.ADMIN.RESET_EDIT })
                    setVacationData(initialAdminVacationState)
                    alert(`vacation to ${vacationData.vacation_destination} edited successfully!`)
                    navigate('/')
                }
            } catch (error) {
                store.dispatch(updateError(((error as any)?.response?.data) as string))
                alert("somthing went wrong please try again")
                console.error(error)
            } finally {
                store.dispatch({ type: ACTIONS.LOADER.CLEAR_LOADER })
            }

        }
    }

    return (
        <div>
            {
                adminReducer
                    ? <div>
                        {
                            isServiceError?.isError
                                ? <Typography variant="h6" component="div" sx={{ m: 1 }} color='red'>
                                    {isServiceError?.message}
                                </Typography>
                                : null
                        }
                        <Typography sx={{ m: 1 }} variant='h2' component='div' >
                            {
                                adminReducer.vacationIDToEdit > -1
                                    ? "Edit Vacation"
                                    : "Add Vacation"
                            }
                        </Typography>
                        <div >
                            <form onSubmit={handleAdminSubmit} ref={formRef as any}>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                    <TextField
                                        name='vacation_destination'
                                        error={isErrorInManagement(vacationData, 'vacation_destination')}
                                        label="Destination"
                                        id="outlined-start-adornment"
                                        sx={{ m: 1, width: '30ch' }}
                                        value={vacationData.vacation_destination}
                                        onChange={(e: any) => {
                                            setVacationData({ ...vacationData, vacation_destination: e.target.value })
                                        }}
                                    />
                                    <TextField
                                        name='vacation_description'
                                        error={isErrorInManagement(vacationData, 'vacation_description')}
                                        label="Description"
                                        id="outlined-start-adornment"
                                        sx={{ m: 1, width: '94ch' }}
                                        value={vacationData.vacation_description}
                                        onChange={(e: any) => {
                                            setVacationData({ ...vacationData, vacation_description: e.target.value })
                                        }}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                    <TextField
                                        type='date'
                                        error={isErrorInManagement(vacationData, 'vacation_start_date')}
                                        name='vacation_start_date'
                                        label="Vacation Start Date"
                                        id="outlined-start-adornment"
                                        sx={{ m: 1, width: '30ch' }}
                                        value={vacationData.vacation_start_date}
                                        onChange={(e: any) => {
                                            setVacationData({ ...vacationData, vacation_start_date: e.target.value })
                                        }}
                                    />
                                    <TextField
                                        type='date'
                                        name='vacation_end_date'
                                        error={isErrorInManagement(vacationData, 'vacation_end_date')}
                                        label="Vacation End Date"
                                        id="outlined-start-adornment"
                                        sx={{ m: 1, width: '30ch' }}
                                        value={vacationData.vacation_end_date}
                                        onChange={(e: any) => {
                                            setVacationData({ ...vacationData, vacation_end_date: e.target.value })
                                        }}
                                    />
                                    <TextField
                                        type='number'
                                        name='vacation_cost'
                                        error={isErrorInManagement(vacationData, 'vacation_cost')}
                                        label="Vacation Cost $"
                                        id="outlined-start-adornment"
                                        sx={{ m: 1, width: '30ch' }}
                                        value={vacationData.vacation_cost}
                                        onChange={(e: any) => {
                                            setVacationData({ ...vacationData, vacation_cost: e.target.value })
                                        }}
                                    />
                                    <TextField
                                        type='file'
                                        name='vacation_image'
                                        id="outlined-start-adornment"
                                        sx={{ m: 1, width: '30ch' }}
                                        onChange={changeHandler}
                                    />
                                </Box>

                                <div>
                                    <button disabled={!isAdminFormValid(vacationData) || isFilePicked === false} className="submitButton" type="submit">
                                        {
                                            adminReducer.vacationIDToEdit > -1
                                                ? "Submit Edit"
                                                : "Add Vacation"
                                        }
                                    </button>
                                    {
                                        isLoading
                                            ? <CircularProgress style={{ 'marginLeft': '20px', 'verticalAlign': 'middle' }} />
                                            : null
                                    }
                                    {
                                        !isAdminFormValid(vacationData)
                                            ? <Typography sx={{ ml: 4 }} color='red' component='p'>
                                                all fields must be filled !
                                            </Typography>
                                            : null
                                    }
                                    {
                                        isFilePicked === false
                                            ? <Typography sx={{ ml: 4 }} color='red' component='p'>
                                                file must be picked
                                            </Typography>
                                            : null
                                    }
                                </div>


                            </form>
                        </div>
                        {/* <div className="formImage" >
                            <form onSubmit={handleAdminSubmit} ref={formRef as any}>
                                <div className='inputField'>
                                    <label htmlFor="vacation_destination">vacation destination</label>
                                    <input type="text" name="vacation_destination" placeholder='vacation_destination'
                                        onChange={(e: any) => {
                                            setVacationData({ ...vacationData, vacation_destination: e.target.value })
                                        }} value={vacationData.vacation_destination} />
                                </div>
                                <div className='inputField'>
                                    <label htmlFor="vacation_description">vacation description</label>
                                    <input type="text" name="vacation_description" placeholder='vacation_description'
                                        onChange={(e: any) => {
                                            setVacationData({ ...vacationData, vacation_description: e.target.value })
                                        }} value={vacationData.vacation_description} />
                                </div>
                                <div className='inputField'>
                                    <label htmlFor="vacation_start_date">vacation start date</label>
                                    <input type="date" name="vacation_start_date" placeholder='vacation_start_date'
                                        onChange={(e: any) => {
                                            setVacationData({ ...vacationData, vacation_start_date: e.target.value })
                                        }} value={vacationData.vacation_start_date} />
                                </div>
                                <div className='inputField'>
                                    <label htmlFor="vacation_end_date">vacation end date</label>
                                    <input type="date" name="vacation_end_date" placeholder='vacation_end_date'
                                        onChange={(e: any) => {
                                            setVacationData({ ...vacationData, vacation_end_date: e.target.value })
                                        }} value={vacationData.vacation_end_date} />
                                </div>
                                <div className='inputField'>
                                    <label htmlFor="vacation_cost">vacation cost</label>
                                    <input type="number" name="vacation_cost" placeholder='vacation_cost'
                                        onChange={(e: any) => {
                                            setVacationData({ ...vacationData, vacation_cost: e.target.value })
                                        }} value={vacationData.vacation_cost} />
                                </div>
                                <div className='inputField'>
                                    <label htmlFor="">vacation_image</label>
                                    <input onChange={changeHandler} type="file" name="vacation_image" placeholder='vacation_image' />
                                </div>
                                <div className="formButtonImage">
                                    <button type="submit">
                                        {
                                            adminReducer.vacationIDToEdit > -1
                                                ? "Submit Edit"
                                                : "Add Vacation"
                                        }
                                    </button>
                                </div>
                            </form>
                        </div> */}
                    </div>
                    : <div>
                        <h1> UnAuth please login again <Link to={"/login"} >click here</Link></h1>
                    </div>
            }
        </div>
    )

}