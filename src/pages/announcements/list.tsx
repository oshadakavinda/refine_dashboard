import { useModalForm } from "@refinedev/antd";
import { useTable } from "@refinedev/antd";
import { HttpError } from "@refinedev/core";
import { GetFieldsFromList } from "@refinedev/nestjs-query";

import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Space, Table, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import { ANNOUNCEMENTS_QUERY } from "@/graphql/queries";

const AnnouncementsList = ({ children }: React.PropsWithChildren) => {
    const navigate = useNavigate();

    const { tableProps } = useTable({
        resource: "announcements",
        syncWithLocation: true,
        meta: {
            gqlQuery: ANNOUNCEMENTS_QUERY,
        },
    });

    return (
        <div>
            <div style={{ padding: "24px" }}>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "24px"
                }}>
                    <Typography.Title level={2}>Announcements</Typography.Title>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => navigate("/announcements/new")}
                    >
                        Create Announcement
                    </Button>
                </div>

                <Table
                    {...tableProps}
                    rowKey="id"
                    pagination={{
                        ...tableProps.pagination,
                        showSizeChanger: true,
                    }}
                >
                    <Table.Column
                        dataIndex="title"
                        title="Title"
                        sorter
                    />

                    <Table.Column
                        dataIndex={["author", "name"]}
                        title="Author"
                        render={(value) => value || "N/A"}
                    />

                    <Table.Column
                        dataIndex="createdAt"
                        title="Created At"
                        sorter
                        render={(value) => dayjs(value).format("MMM DD, YYYY")}
                    />

                    <Table.Column
                        title="Actions"
                        dataIndex="actions"
                        render={(_, record: any) => (
                            <Space>
                                <Button
                                    size="small"
                                    icon={<EditOutlined />}
                                    onClick={() => navigate(`/announcements/edit/${record.id}`)}
                                >
                                    Edit
                                </Button>
                            </Space>
                        )}
                    />
                </Table>
            </div>
            {children}
        </div>
    );
};

export default AnnouncementsList;
