import React, { useState } from "react"
import { LoginPage } from "../../pages/loginPage";
import { RegisterPage } from "../../pages/registerPage";
import { Link, useNavigate } from "react-router-dom";
import { MenuItem, Typography } from "@mui/material";
import { VacationsPage } from "../../pages/vacationsPage/vacations";
import { logOutAction } from "../../../store/asyncFunctions/auth";
import { useSelector } from "react-redux";
import './styles.css'
import { StyledAppBar } from "../header/styles";

export const routingConfiguration = [
    {
        key: "home",
        path: "/",
        label: "Home",
        element: <VacationsPage />,
    },
    {
        key: "login",
        path: "/login",
        label: "Login",
        element: <LoginPage />,
    },
    {
        key: "register",
        path: "/register",
        label: "Register",
        element: <RegisterPage />,
    }
];
export type RouteConfig = typeof routingConfiguration[0];

export function AppNavBar() {
    const authReducer = useSelector((state: any) => state?.authReducer);
    const navigate = useNavigate()

    async function logout() {
        const res = await logOutAction();
        if (res) {
            alert("user logged out")
            navigate("/login");
        }
    }

    return (
        <StyledAppBar position="static" color="inherit">
            {
                authReducer?.user_first_name
                    ? <Typography className="navLink">
                        welcome {authReducer?.user_first_name}
                    </Typography>
                    : null
            }
            {routingConfiguration.map((route: RouteConfig) => {
                if (authReducer?.user_first_name && (route.key === "login" || route.key === "register")) return
                return (
                    <MenuItem key={route.key}>
                        <Typography textAlign="center">
                            <Link className="navLink" to={route.path}>{route.label}</Link>
                        </Typography>
                    </MenuItem>
                )
            })}
            {
                authReducer?.user_role === "admin"
                    ?
                    <MenuItem key={"reports"}>
                        <Typography textAlign="center">
                            <Link className="navLink" to={"/reports"}>Reports</Link>
                        </Typography>
                    </MenuItem>
                    : null
            }
            {
                authReducer?.user_role === "admin"
                    ?
                    <MenuItem key={"management"}>
                        <Typography textAlign="center">
                            <Link className="navLink" to={"/management"}>Management</Link>
                        </Typography>
                    </MenuItem>
                    : null
            }
            {
                authReducer?.user_first_name
                    ? <MenuItem onClick={logout}>
                        <Typography className="navLink" textAlign="center">
                            Logout
                        </Typography>
                    </MenuItem>
                    : null
            }

        </StyledAppBar>
    )

}