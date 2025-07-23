/*
 * @Date: 2022-08-11 09:41:40
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-08-16 19:13:35
 * @FilePath: /react-ssr-lazy-loading/@/router/Routers.js
 * @Description:
 */
import NoPages from "@/components/404";
// import Loading from "@/components/Loading";
import Spin from "@/components/Spin";
import {toComponent} from "@/router";
import {
  Route,
  Router,
  Switch as Routes
} from "@/router/react-lazy-router-dom";
import PropTypes from "prop-types";
import React, {useContext} from "react";
import {RoutesComponentContext} from "./RoutesComponentProvider";
// const NoPages = () => {
//   return (
//     <div style={{ padding: "1rem" }}>
//       <p>There s nothing here!</p>
//     </div>
//   );
// };


const Routers = (props) => {
  const {
    history,
    // routesComponent = [],
    level
  } = props;
  const routesComponent = useContext(RoutesComponentContext);
  return (
    <Router
      history={history}
      loading={Spin}
      routesComponent={routesComponent}>
      <Routes>

        {routesComponent
          .filter((item) => {
            return item.level === level;
          })
          .sort((a, b) => {
            return b.path.length - a.path.length;
          })
          .map((route) => {
            let {path, exact = true, Component} = route;

            return (
              <Route
                key={path}
                exact={exact}
                path={path}
                component={Component}
              />
            );
          })}
        <Route path="*" exact={true} component={toComponent(NoPages)} />
      </Routes>
    </Router>
  );
};

Routers.propTypes = {
  history: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  state: PropTypes.object,
  context: PropTypes.object
};
export default Routers;
