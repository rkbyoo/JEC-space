import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { App as AntdApp } from 'antd';
import { ConfigProvider} from 'antd';


createRoot(document.getElementById('root')).render(
  <StrictMode>
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
  </StrictMode>
)
