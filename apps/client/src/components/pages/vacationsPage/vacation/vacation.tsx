import React from 'react';
import { Grid } from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import { followVacationAction, getVacationsAction, unfollowVacationAction } from '../../../../store/asyncFunctions/vacations';
import { IIsFollowed } from '../vacations';
import { useNavigate } from 'react-router-dom';
import { deleteVacationAction } from '../../../../store/asyncFunctions/admin';
import { store } from '../../../../store';
import { ACTIONS } from '../../../../store/actions';

export function Vacation(props: { destination: string, description: string, start_date: string, end_date: string, cost: number, image: string, vacation_id: number, isFollowedObject: IIsFollowed, vacation_follow_count: number }) {
    const authReducer = useSelector((state: any) => state?.authReducer);
    const navigate = useNavigate();
    async function deleteVacation(vacation_id: number) {
        if (!vacation_id) alert("somthing went wrong")
        const result = await deleteVacationAction(vacation_id)
        if (result) {
            alert(`vacation #${vacation_id} deleted successfully`);
            getVacationsAction()
        }
    }
    function editVacation(vacation_id: number) {
        store.dispatch({ type: ACTIONS.ADMIN.EDIT, payload: vacation_id })
        navigate("/management")
    }
    function followVacation(vacation_id: number) {
        if (!vacation_id) alert("somthing went wrong")
        followVacationAction(vacation_id);
    }
    function unfollowVacation(follow_id: any) {
        if (!follow_id) alert("somthing went wrong")
        unfollowVacationAction(follow_id);
    }

    const { destination, description, start_date, end_date, cost, image, vacation_id, vacation_follow_count, isFollowedObject } = props;

    return <Grid item xs={12} sm={6} md={4}>
        <Card sx={{ minWidth: 175 }}>
            {authReducer?.user_role === "admin" ? <CardActions>
                <IconButton onClick={() => {
                    editVacation(vacation_id)
                }} aria-label="edit">
                    <EditIcon />
                </IconButton>
                <IconButton onClick={() => {
                    deleteVacation(vacation_id)
                }} aria-label="delete">
                    <DeleteIcon />
                </IconButton>
            </CardActions> : null}
            <CardContent>
                <CardMedia
                    component="img"
                    height="194"
                    image={image}
                    alt="unkown image"
                />
                <Typography variant="h3" component="div">
                    {destination}
                </Typography>
                <Typography variant="body2">
                    {description}
                </Typography>
                <Typography variant="h6">
                    between {getPrettyDate(start_date)} to {getPrettyDate(end_date)}
                </Typography>
                <Typography variant="h6">
                    cost : {cost} $
                </Typography>
                <Typography variant="h6">
                    followers: {
                        vacation_follow_count
                            ? vacation_follow_count
                            : 0
                    }
                </Typography>
            </CardContent>
            <CardActions>
                {
                    authReducer?.user_role === "admin"
                        ? null
                        : <>
                            {
                                isFollowedObject?.isFollowed
                                    ? <Button variant="contained" onClick={() => {
                                        unfollowVacation(isFollowedObject?.followed_id)
                                    }} size="medium" color="primary">unfollow</Button>
                                    : <Button variant="outlined" onClick={() => {
                                        followVacation(vacation_id)
                                    }} size="medium" color="primary">follow</Button>
                            }
                        </>
                }
            </CardActions>

        </Card>
    </Grid>
}

function getPrettyDate(dateLongString: string): string {
    const date = new Date(dateLongString)
    return date.toLocaleDateString()
}
