import { ThemedLayoutV2, ThemedTitleV2 } from "@refinedev/antd"
import Header from "./header"
import Footer from "./footer"
import Sider from "./sider"

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <ThemedLayoutV2
        Header={Header}
        Sider={Sider}
        Title={() => (
          <img
            src="/1.1.png"
            alt="Logo"
            style={{ height: '124px', padding: '8px', maxWidth: '100%', objectFit: 'contain' }}
          />
        )}
      >
        {children}
      </ThemedLayoutV2>
      
    </>
  )
}

export default Layout