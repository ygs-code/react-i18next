/*
 * @Author: your name
 * @Date: 2020-12-03 10:26:49
 * @LastEditTime: 2021-08-25 15:39:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /error-sytem/@/@/common/components/Breadcrumb/index.js
 */
// import {mapRedux} from "@/redux";
import React, {ComponentType} from "react";
import {CheckDataType} from "@/utils";
import hoistStatics from "hoist-non-react-statics";
import {withRouter} from "@/router/react-lazy-router-dom";
import {dispatch} from "@/redux";
 
interface Options {
  title?: string;
  breadcrumb?: any;
}

interface Props {
  dispatch?: {
    breadcrumb?: {
      setBreadcrumb?: (breadcrumb: any) => void;
    };
  };
  match?: {
    params?: {
      action?: string;
    };
  };
  history?: any;
}

const Index = (options: Options | ((props: Props) => Options)) => {
  return (Component: ComponentType<Props>) => {
    const displayName =
      "withRouter(" + (Component?.displayName || Component?.name) + ")";

    class Index extends React.Component<Props> {
      constructor(props: Props) {
        super(props);
      }

      init(prevProps?: Props, prevState?: any) {
      
        const setBreadcrumb = dispatch?.breadcrumb?.setBreadcrumb;

     

        let $options = options;
        if (CheckDataType.isFunction($options)) {
          if (typeof options === 'function') {
            $options = options(this.props);
          }
        }
        const {title, breadcrumb} = $options as Options;
        if (title) {
          document.title = title;
        }
        if (breadcrumb) {
         
          setBreadcrumb?.(breadcrumb);
        }
      }

      componentDidMount() {
        this.init();
      }

      render() {
        return <Component {...this.props} />;
      }
    }

    (Index as any).displayName = displayName;
    (Index as any).WrappedComponent = Component;
    return Index;
  };
};






export default Index;
