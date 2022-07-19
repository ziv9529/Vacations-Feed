import { Container } from '@mui/material';
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

export function ErrrorPage() {

    return (
        <Container>
            <div>
                want to travel to the site again ? click here to login
                <Link to='/login'> Click Me</Link>
            </div>
            <h1>
                <img width={"80%"} src="/images/error404.png" alt="404 not found" />
            </h1>
        </Container>
    )
}