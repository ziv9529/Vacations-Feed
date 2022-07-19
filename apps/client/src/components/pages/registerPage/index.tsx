import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, CircularProgress, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { store } from '../../../store';
import { ACTIONS } from '../../../store/actions';
import { registerAction } from '../../../store/asyncFunctions/auth';
import { handleMouseDownPassword, initialRegisterState, isRegisterError, isRegisterFormValid, RegisterState } from './helpers';

export function RegisterPage() {
    const navigate = useNavigate()

    useEffect(() => {
        // in case user had error and he leave the page
        // after he came back he need to see empty page as he want to re-register
        store.dispatch({ type: ACTIONS.ERROR.TOGGLE, payload: { isError: false, message: "" } })
    }, [])

    const [userRegisterData, setUserRegisterData] = useState<RegisterState>(initialRegisterState);
    const [usershowPassword, setusershowPassword] = useState<boolean>(false);

    const isUserLoggin = useSelector((state: any) => state?.authReducer);
    const isLoading = useSelector((state: any) => state?.loaderReducer?.isLoading);
    const isServiceError = useSelector((state: any) => state.errorReducer);

    const handleChange =
        (prop: keyof RegisterState) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setUserRegisterData({ ...userRegisterData, [prop]: event.target.value })
        };

    const handleClickShowPassword = () => {
        setusershowPassword(!usershowPassword);
    };

    async function registerUser() {
        if (!isRegisterFormValid(userRegisterData)) return
        const result = await registerAction(userRegisterData);
        if (result) {
            setUserRegisterData(initialRegisterState)
            alert(result.message)
            navigate("/login")
        }
    }

    return (
        <>
            <Typography sx={{ m: 1 }} variant='h2' component='div'>
                Register Page
            </Typography>
            {
                (isUserLoggin?.token && isUserLoggin?.user_id)
                    ? <Typography sx={{ m: 1 }} variant='h4' component='div'>
                        User already logged in please move to <Link to={"/"}>Home</Link> page!
                    </Typography>
                    : <>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            <TextField
                                label="User First Name"
                                sx={{ m: 1, width: '25ch' }}
                                onChange={handleChange('user_first_name')}
                                required={true}
                                error={isRegisterError(userRegisterData, 'user_first_name')}
                                value={userRegisterData?.user_first_name}
                            />
                            <TextField
                                label="User Last Name"
                                sx={{ m: 1, width: '25ch' }}
                                onChange={handleChange('user_last_name')}
                                required={true}
                                error={isRegisterError(userRegisterData, 'user_last_name')}
                                value={userRegisterData?.user_last_name}
                            />
                            <TextField
                                type={'email'}
                                label="User Email"
                                sx={{ m: 1, width: '25ch' }}
                                onChange={handleChange('user_email')}
                                required={true}
                                error={isRegisterError(userRegisterData, 'user_email')}
                                value={userRegisterData?.user_email}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            <TextField
                                label="Site User Name"
                                sx={{ m: 1, width: '25ch' }}
                                onChange={handleChange('user_site_username')}
                                required={true}
                                error={isRegisterError(userRegisterData, 'user_site_username')}
                                value={userRegisterData?.user_site_username}
                            />
                            <FormControl error={isRegisterError(userRegisterData, 'user_password')} sx={{ m: 1, width: '25ch' }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    type={usershowPassword ? 'text' : 'password'}
                                    value={userRegisterData?.user_password}
                                    onChange={handleChange('user_password')}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {usershowPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                />
                            </FormControl>
                        </Box>
                        {
                            !isRegisterFormValid(userRegisterData)
                                ? <Typography color="red" sx={{ m: 1 }} variant="caption" component="div">
                                    all register fields must be filled
                                </Typography>
                                : null
                        }
                        <div>
                            <Button
                                sx={{ m: 1, width: '15ch' }}
                                disabled={
                                    !isRegisterFormValid(userRegisterData)
                                }
                                onClick={registerUser}
                                variant="outlined">Register</Button>
                            {
                                isLoading
                                    ? <CircularProgress style={{ 'marginLeft': '20px', 'verticalAlign': 'middle' }} />
                                    : null
                            }
                        </div>
                        {
                            isServiceError?.isError
                                ? <Typography variant="h6" component="div" sx={{ m: 1 }} color='red'>
                                    {isServiceError?.message}
                                </Typography>
                                : null
                        }

                    </>
            }
        </>
    )
}
