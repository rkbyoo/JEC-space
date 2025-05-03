import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { App as AntdApp } from 'antd';
import { ConfigProvider} from 'antd';
import { Provider } from "react-redux";
// import { StrictMode } from 'react'
import store from "./redux/store";
import { Analytics } from "@vercel/analytics/react"


createRoot(document.getElementById('root')).render(
  <Analytics>
    <Provider store={store}>
     <ConfigProvider theme={{
      components:{
        Button:{
        colorPrimary:'#40513B',
        colorPrimaryHover:"#40513B",
        borderRadius:"2px"
      }
    }
    }}>
      <AntdApp>
        <App></App>
      </AntdApp>
      
    </ConfigProvider>
   </Provider>
   </Analytics>
)
