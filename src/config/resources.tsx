import { ProjectOutlined, NotificationOutlined } from "@ant-design/icons";
import { IResourceItem } from "@refinedev/core";

export const resources: IResourceItem[] = [
  {
    name: 'tasks',
    list: '/tasks',
    create: '/tasks/new',
    edit: '/tasks/edit/:id',
    meta: {
      label: 'Tasks',
      icon: <ProjectOutlined />
    }
  },
  {
    name: 'announcements',
    list: '/announcements',
    create: '/announcements/new',
    edit: '/announcements/edit/:id',
    meta: {
      label: 'Announcements',
      icon: <NotificationOutlined />,
    },
    options: {
      liveMode: 'off',
    },
  }
]