import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, CircularProgress, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { store } from '../../../store';
import { ACTIONS } from '../../../store/actions';
import { loginAction } from '../../../store/asyncFunctions/auth';
import { handleMouseDownPassword, initialLoginState, isLoginError, isLoginFormValid, LoginState } from './helpers';
import "./login.css"

export function LoginPage() {
    const navigate = useNavigate()
    useEffect(() => {
        // in case user had error and he leave the page
        // after he came back he need to see empty page as he want to re-login
        store.dispatch({ type: ACTIONS.ERROR.TOGGLE, payload: { isError: false, message: "" } })
    }, [])

    const [loginData, setLoginData] = useState<LoginState>(initialLoginState);

    const isUserLoggin = useSelector((state: any) => state?.authReducer);
    const isServiceError = useSelector((state: any) => state?.errorReducer);
    const isLoading = useSelector((state: any) => state?.loaderReducer?.isLoading);

    const handleChange =
        (prop: keyof LoginState) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setLoginData({ ...loginData, [prop]: event.target.value })
        };

    const handleClickShowPassword = () => {
        setLoginData({
            ...loginData,
            showPassword: !loginData.showPassword,
        });
    };
    async function login() {
        if (!isLoginFormValid(loginData)) return
        const res = await loginAction({ user_site_username: loginData?.userName, user_password: loginData?.password });
        if (res) {
            setLoginData(initialLoginState)
            navigate("/")
        }
    }
    return (
        <>
            <Typography sx={{ m: 1 }} variant='h2' component='div'>
                Login Page
            </Typography>
            {
                (isUserLoggin?.token && isUserLoggin?.user_id)
                    ? <Typography sx={{ m: 1 }} variant='h4' component='div'>
                        User already logged in please move to <Link className='linkStyle' to={"/"}>Home</Link> page!
                    </Typography>
                    :
                    <>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            <div>
                                <TextField
                                    error={isLoginError(loginData, 'userName')}
                                    label="User Name"
                                    id="outlined-start-adornment"
                                    sx={{ m: 1, width: '25ch' }}
                                    onChange={handleChange('userName')}
                                />
                                <FormControl error={isLoginError(loginData, 'password')} sx={{ m: 1, width: '25ch' }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={loginData.showPassword ? 'text' : 'password'}
                                        value={loginData.password}
                                        onChange={handleChange('password')}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {loginData.showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                    />
                                </FormControl>
                                <div>
                                    {
                                        !isLoginFormValid(loginData)
                                            ? <Typography color="red" sx={{ m: 1 }} variant="caption" component="div">
                                                all login fields must be filled
                                            </Typography>
                                            : null
                                    }
                                    <Button
                                        sx={{ m: 1, width: '15ch' }}
                                        disabled={!isLoginFormValid(loginData)}
                                        onClick={login}
                                        variant="outlined">Login</Button>
                                </div>
                                {
                                    isLoading
                                        ? <CircularProgress />
                                        : null
                                }
                                {
                                    isServiceError?.isError
                                        ? <Typography variant="h6" component="div" sx={{ m: 1 }} color='red'>
                                            {isServiceError?.message}
                                        </Typography>
                                        : null
                                }
                                <Typography sx={{ m: 1 }} variant="h5" component="div">
                                    dont have user ? go to <Link to='/register'>Register</Link> page and create one!
                                </Typography>
                            </div>
                        </Box>
                    </>
            }
        </>
    )
}
