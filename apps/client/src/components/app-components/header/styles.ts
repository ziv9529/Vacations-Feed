import { styled } from '@mui/system';
import { AppBar, Typography } from "@mui/material";

export const StyledAppBar = styled(AppBar)({
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
});

export const StyledHeader = styled(Typography)({
    color: 'rgba(0,183,255, 1)'
});
export const StyledTypography = styled(Typography)({
    borderRadius: 15,
    backgroundColor: 'white',
    border: '1px solid black',
    width: 'max-content',
    paddingLeft: '10px',
    margin: '10px 0'
});