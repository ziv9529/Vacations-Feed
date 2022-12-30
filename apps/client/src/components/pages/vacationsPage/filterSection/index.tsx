import { Checkbox, Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getFilteredVacationsAction, getVacationsAction } from '../../../../store/asyncFunctions/vacations';
import { useSelector } from 'react-redux';
import { StyledTypography } from '../../../app-components/header/styles';
import { store } from '../../../../store';
import { ACTIONS } from '../../../../store/actions';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export function FilterSection() {
    const authReducer = useSelector((state: any) => state?.authReducer);
    const vacationsReducer = useSelector((state: any) => state?.vacationsReducer);

    const [filterFollowed, setFilterFollowed] = useState(false);

    useEffect(() => {
        if (filterFollowed === true) {
            setFilterFollowed(true);
            getFilteredVacationsAction(authReducer?.user_id);
        }
    }, [vacationsReducer?.follow_action])

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            getFilteredVacationsAction(authReducer?.user_id);
            store.dispatch({ type: ACTIONS.VACATIONS.SHOW_ONLY_FOLLOWED })
        } else {
            getVacationsAction();
            store.dispatch({ type: ACTIONS.VACATIONS.UNDO_SHOW_ONLY_FOLLOWED })
        }
        setFilterFollowed(event.target.checked);
    };

    return (
        <Container>
            <StyledTypography variant="subtitle2" align="left">
                Filter by only followed vacations
                <Checkbox {...label} checked={filterFollowed} onChange={handleFilterChange} />
            </StyledTypography>
        </Container>
    )
}