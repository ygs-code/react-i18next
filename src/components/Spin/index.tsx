'use client';

import React, { Children, Component } from 'react';

import './index.scss';

interface SpinProps {
  isLoading: boolean;
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  spinnerStyle?: React.CSSProperties;
  maskStyle?: React.CSSProperties;
}

const SpinComponent: React.FC<SpinProps> = (props) => {
  const {
    isLoading,
    children,
    className = '',
    style = {},
    spinnerStyle = {},
    maskStyle = {},
  } = props;
  return (
    <div className={`spin-loading ${className}`} style={style}>
      {isLoading ? (
        <>
          <div className=" spin-loading-anticon-overlay " style={maskStyle}></div>
          <div className=" spin-loading-anticon-loading " >
            <div
              className="spin-loading-spinner"
              style={spinnerStyle}></div>
              {/* 加载中 */}
          </div>
        </>
      ) : null}

      {Children.map(children, (child: React.ReactNode) => {
        return <> {child}</>;
      })}
    </div>
  );

  // <Spin tip={
  //     t("loading")
  // } spinning={isLoading}>
  //     {Children.map(children, (child: React.ReactNode) => {
  //         return <> {child}</>;
  //     })}
  // </Spin>;
};

export default SpinComponent;
