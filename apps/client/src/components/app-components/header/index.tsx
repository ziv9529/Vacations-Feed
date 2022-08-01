import React from "react"
import { StyledAppBar, StyledHeader } from "./styles"

export function AppHeader() {
    return (
        <StyledAppBar position="static" color="inherit">
            <StyledHeader variant="h2" align="center">Trip With Me!</StyledHeader>
        </StyledAppBar>
    )
}
