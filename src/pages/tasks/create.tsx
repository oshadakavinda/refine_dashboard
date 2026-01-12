import { useSearchParams } from "react-router-dom";

import { useModalForm, useSelect } from "@refinedev/antd";
import { useNavigation } from "@refinedev/core";
import { GetFieldsFromList } from "@refinedev/nestjs-query";

import { DatePicker, Form, Input, Modal, Select } from "antd";
import MDEditor from "@uiw/react-md-editor";
import dayjs from "dayjs";

import { CREATE_TASK_MUTATION } from "@/graphql/mutations";
import { USERS_SELECT_QUERY, TASK_STAGES_SELECT_QUERY } from "@/graphql/queries";
import { UsersSelectQuery, TaskStagesSelectQuery } from "@/graphql/types";


type TaskFormValues = {
  title: string;
  description: string;
  stageId?: number;
  dueDate?: string;
  userIds?: number[];
};

const TasksCreatePage = () => {
  // get search params from the url
  const [searchParams] = useSearchParams();

    /**
     * useNavigation is a hook by Refine that allows you to navigate to a page.
     * https://refine.dev/docs/routing/hooks/use-navigation/
     *
     * list method navigates to the list page of the specified resource.
     * https://refine.dev/docs/routing/hooks/use-navigation/#list
     */ const { list } = useNavigation();

  /**
   * useModalForm is a hook by Refine that allows you manage a form inside a modal.
   * it extends the useForm hook from the @refinedev/antd package
   * https://refine.dev/docs/ui-integrations/ant-design/hooks/use-modal-form/
   *
   * formProps -> It's an instance of HTML form that manages form state and actions like onFinish, onValuesChange, etc.
   * Under the hood, it uses the useForm hook from the @refinedev/antd package
   * https://refine.dev/docs/ui-integrations/ant-design/hooks/use-modal-form/#formprops
   *
   * modalProps -> It's an instance of Modal that manages modal state and actions like onOk, onCancel, etc.
   * https://refine.dev/docs/ui-integrations/ant-design/hooks/use-modal-form/#modalprops
   */
  const { formProps, modalProps, close } = useModalForm<
    GetFieldsFromList<TaskStagesSelectQuery>,
    any,
    TaskFormValues
  >({
    // specify the action to perform i.e., create or edit
    action: "create",
    // specify whether the modal should be visible by default
    defaultVisible: true,
    // specify the gql mutation to be performed
    meta: {
      gqlMutation: CREATE_TASK_MUTATION,
    },
  });

  // Fetch users for the users select field
  const { selectProps: userSelectProps } = useSelect<GetFieldsFromList<UsersSelectQuery>>({
    resource: "users",
    meta: {
      gqlQuery: USERS_SELECT_QUERY,
    },
    optionLabel: "name",
  });

  // Fetch task stages for the stage select field
  const { selectProps: stageSelectProps } = useSelect<GetFieldsFromList<TaskStagesSelectQuery>>({
    resource: "taskStages",
    filters: [
      {
        field: "title",
        operator: "in",
        value: ["TODO", "IN PROGRESS", "IN REVIEW", "DONE"],
      },
    ],
    sorters: [
      {
        field: "createdAt",
        order: "asc",
      },
    ],
    meta: {
      gqlQuery: TASK_STAGES_SELECT_QUERY,
    },
  });

  return (
    <Modal
      {...modalProps}
      onCancel={() => {
        // close the modal
        close();

        // navigate to the list page of the tasks resource
        list("tasks", "replace");
      }}
      title="Add new card"
      width={512}
    >
      <Form
        {...formProps}
        layout="vertical"
        onFinish={(values) => {
          // on finish, call the onFinish method of useModalForm to perform the mutation
          formProps?.onFinish?.({
            ...values,
            stageId: values.stageId
              ? Number(values.stageId)
              : searchParams.get("stageId")
                ? Number(searchParams.get("stageId"))
                : undefined,
            userIds: values.userIds || [],
            dueDate: values.dueDate ? dayjs(values.dueDate).toISOString() : undefined,
          });
        }}
      >
        <Form.Item label="Title" name="title" rules={[{ required: true, message: "Please enter a title" }]}>
          <Input placeholder="Enter task title" />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <MDEditor preview="edit" data-color-mode="light" height={200} />
        </Form.Item>

        <Form.Item
          label="Due Date"
          name="dueDate"
          getValueProps={(value) => {
            if (!value) return { value: undefined };
            return { value: dayjs(value) };
          }}
        >
          <DatePicker
            format="YYYY-MM-DD HH:mm"
            showTime={{
              showSecond: false,
              format: "HH:mm",
            }}
            style={{ width: "100%" }}
            placeholder="Select due date"
          />
        </Form.Item>

        <Form.Item label="Assigned Users" name="userIds">
          <Select
            {...userSelectProps}
            mode="multiple"
            placeholder="Select users"
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item label="Stage" name="stageId">
          <Select
            {...stageSelectProps}
            options={stageSelectProps.options?.map((option) => ({
              ...option,
              label: option.label === "IN REVIEW" ? "NEED HELP" : option.label,
            }))}
            placeholder="Select stage"
            style={{ width: "100%" }}
            allowClear
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TasksCreatePage;
