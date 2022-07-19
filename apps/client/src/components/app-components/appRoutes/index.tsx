import React from "react"
import { RouteConfig, routingConfiguration } from "../navbar";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { ReportsPage } from "../../pages/reportsPage";
import { ErrrorPage } from "../../pages/errorPage";
import { ManagementPage } from "../../pages/ManagementPage";

export function AppRoutes() {
  const user_role = useSelector((state: any) => state?.authReducer?.user_role);

  return (
    <Routes>
      {
        user_role === "admin"
          ?
          <>
            <Route
              key="reports"
              element={<ReportsPage />}
              path={"/reports"}
            ></Route>
            <Route
              key="management"
              element={<ManagementPage />}
              path={"/management"}
            ></Route>
          </>
          : null
      }
      {routingConfiguration.map((route: RouteConfig) => {
        const { label, ...rest } = route;
        return (
          <Route
            key={route.key}
            element={route.element}
            path={route.path}
          ></Route>
        );
      })}

      <Route
        key="error"
        element={<ErrrorPage />}
        path={"*"}
      ></Route>
    </Routes>
  )

}