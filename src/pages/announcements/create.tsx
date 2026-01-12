import { useSearchParams } from "react-router-dom";

import { useModalForm } from "@refinedev/antd";
import { useNavigation } from "@refinedev/core";

import { DatePicker, Form, Input, Modal } from "antd";
import MDEditor from "@uiw/react-md-editor";

import { CREATE_ANNOUNCEMENT_MUTATION } from "@/graphql/mutations";

const { TextArea } = Input;

const AnnouncementsCreatePage = () => {
    const [searchParams] = useSearchParams();
    const { list } = useNavigation();

    const { formProps, modalProps, close } = useModalForm({
        action: "create",
        defaultVisible: true,
        resource: "announcements",
        meta: {
            gqlMutation: CREATE_ANNOUNCEMENT_MUTATION,
        },
    });

    return (
        <Modal
            {...modalProps}
            onCancel={() => {
                close();
                list("announcements", "replace");
            }}
            title="Create Announcement"
            width={800}
        >
            <Form
                {...formProps}
                layout="vertical"
                onFinish={(values) => {
                    formProps?.onFinish?.(values);
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

export default AnnouncementsCreatePage;
