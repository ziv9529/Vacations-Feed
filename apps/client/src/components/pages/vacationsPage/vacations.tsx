import React, { useEffect, useState } from "react";
import { Checkbox, Grid } from "@mui/material"
import { styled } from '@mui/system';
import Typography from '@mui/material/Typography';
import { Vacation } from "./vacation/vacation";
import { useSelector } from "react-redux";
import { getFollowedVacationsAction, getVacationsAction } from "../../../store/asyncFunctions/vacations";
import { FilterSection } from "./filterSection";
import { Link } from "react-router-dom";

export interface IIsFollowed {
    isFollowed: boolean,
    followed_id: number
}
export const StyledGrid = styled(Grid)({
    paddingLeft: "20px",
    paddingRight: "20px"
});

export function VacationsPage() {
    const authReducer = useSelector((state: any) => state?.authReducer);
    const vacationsReducer = useSelector((state: any) => state?.vacationsReducer);
    const isServiceError = useSelector((state: any) => state.errorReducer);
    const onlyFollowMode = useSelector((state: any) => state?.vacationsReducer?.isShowOnlyFollowed);

    const { vacations } = vacationsReducer;

    const initialState: Array<any> = []
    const [followedVacations, setFollowedVacations] = useState(initialState)
    useEffect(() => {
        if (onlyFollowMode === false) getVacationsAction();
    }, [])
    useEffect(() => {
        if (onlyFollowMode === false) getVacationsAction();
        fetchFollowing().catch(console.error);
    }, [vacationsReducer?.follow_action])

    const fetchFollowing = async () => {
        const result = await getFollowedVacationsAction(authReducer?.user_id);
        if (result) setFollowedVacations(result)
    }

    function isFollowed(vacation_id: any): IIsFollowed {
        let result: IIsFollowed = { isFollowed: false, followed_id: -1 }
        if (!Array.isArray(followedVacations) || followedVacations.length < 1) {
            result = { isFollowed: false, followed_id: -1 }
        } else {
            followedVacations?.map((followed_vacation_item: any) => {
                if (followed_vacation_item.vacation_id === vacation_id) {
                    result = { isFollowed: true, followed_id: followed_vacation_item.follow_id }
                }
            })
        }
        return result
    }
    return (
        <div>
            {authReducer?.token && authReducer?.user_id
                // {vacations && vacations.length > 0 && authReducer?.token
                ?
                <>
                    {
                        authReducer?.user_role === "viewer"
                            ? <FilterSection />
                            : null
                    }
                    {
                        vacations && vacations.length > 0
                            ? <div>
                                {
                                    isServiceError?.isError
                                        ? <Typography variant="h6" component="div" sx={{ m: 1 }} color='red'>
                                            {isServiceError?.message}
                                        </Typography>
                                        : null
                                }

                                <StyledGrid container spacing={4}>
                                    {vacations.map((vacation: any) => {
                                        return <Vacation
                                            cost={vacation?.vacation_cost}
                                            description={vacation?.vacation_description}
                                            destination={vacation?.vacation_destination}
                                            end_date={vacation?.vacation_end_date}
                                            start_date={vacation?.vacation_start_date}
                                            image={vacation?.vacation_image}
                                            vacation_id={vacation?.vacation_id}
                                            vacation_follow_count={vacation?.number_of_followers}
                                            key={vacation?.vacation_id}
                                            isFollowedObject={isFollowed(vacation?.vacation_id)}
                                        />
                                    })}
                                </StyledGrid>
                            </div>
                            : <Typography sx={{ m: 1 }} variant="h4" component="div">
                                there is no vacations to display
                            </Typography>
                    }
                </>
                :
                <>
                    <Typography variant="h4" component="div">
                        welcome to my site,
                    </Typography>
                    <Typography variant="h4" component="div">
                        please <Link to={"/login"}>Login</Link> to enter the site
                    </Typography>
                </>

            }

        </div>

    )
}