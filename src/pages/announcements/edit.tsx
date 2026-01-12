import { DeleteButton, useModalForm } from "@refinedev/antd";
import { useNavigation } from "@refinedev/core";

import { Form, Input, Modal } from "antd";
import MDEditor from "@uiw/react-md-editor";

const AnnouncementsEditPage = () => {
    const { list } = useNavigation();

    const { formProps, modalProps, close, queryResult } = useModalForm({
        action: "edit",
        defaultVisible: true,
        resource: "announcements",
        dataProviderName: "announcements",
    });

    const { title, content } = queryResult?.data?.data ?? {};
    const isLoading = queryResult?.isLoading ?? true;

    return (
        <Modal
            {...modalProps}
            onCancel={() => {
                close();
                list("announcements", "replace");
            }}
            title="Edit Announcement"
            width={800}
            footer={
                <DeleteButton
                    type="link"
                    onSuccess={() => {
                        list("announcements", "replace");
                    }}
                >
                    Delete announcement
                </DeleteButton>
            }
        >
            <Form
                {...formProps}
                layout="vertical"
                initialValues={{
                    title,
                    content,
                }}
            >
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: "Please enter a title" }]}
                >
                    <Input placeholder="Enter announcement title" />
                </Form.Item>

                <Form.Item
                    label="Content"
                    name="content"
                    rules={[{ required: true, message: "Please enter content" }]}
                >
                    <MDEditor preview="edit" data-color-mode="light" height={300} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AnnouncementsEditPage;
