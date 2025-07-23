import "./index.scss";

import img from "@/assets/images/404.png";
import Layout, {layout} from "@/components/Layout";
import React, {useState} from "react";
import {addRouterApi} from "@/router";
/*eslint no-undef: "error"*/
/*eslint-env process*/
const {env: {NODE_ENV, PUBLICPATH, RENDER} = {}} = process;
export default addRouterApi((props) => {
  const {
    user: {user: {email, id, name, phone, type} = {}} = {},
    onClick = () => { },
    pushRoute,

  } = props;



  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="no-page">
      <div className="container">
        <img src={img} />
        <h2>抱歉，您访问的页面出错了</h2>
        <p>您可能输错了网址，或该网页已删除或不存在</p>
        <a
          onClick={(e) => {
            pushRoute({
              url: "/",
            });
            e.preventDefault();
          }}
          className="btn btn-primary btn-blue">
          返回主页
        </a>
      </div>
    </div>
  );
});
