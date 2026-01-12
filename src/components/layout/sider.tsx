import { ThemedSiderV2 } from "@refinedev/antd";
import type { RefineThemedLayoutV2SiderProps } from "@refinedev/antd";
import React from "react";

const Sider: React.FC<RefineThemedLayoutV2SiderProps> = (props) => {
    return <ThemedSiderV2 {...props} fixed={false} />;
};

export default Sider;
