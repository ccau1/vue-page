import { Form } from "@/components/DynamicForm";
import { FormState } from "@/components/DynamicForm/models/FormState";

export default {
  form: {
    id: "7347ef09-7778-4c5c-898d-bede667f4c0b",
    widgets: [
      {
        id: "1f2ad689-74e0-422c-b4d6-ea6a1f90b5ee",
        type: "paging",
        data: {
          pages: [
            {
              labelKey: "step_1",
              idx: 0,
              children: ["4420fbc2-0e12-46d0-8dac-b55e8d685f3e"],
            },
            {
              labelKey: "step_2",
              idx: 1,
              children: [],
            },
          ],
          stepperShow: true,
          stepperPosition: ["top", "center"],
        },
      },
      {
        id: "4420fbc2-0e12-46d0-8dac-b55e8d685f3e",
        type: "paging",
        parent: "1f2ad689-74e0-422c-b4d6-ea6a1f90b5ee",
        data: {
          pages: [
            {
              labelKey: "page_1",
              idx: 0,
              children: [
                "8946731a-c5e1-43b2-850d-d542990067bf",
                "cf155c9c-05c9-4e98-8d4e-ad6baf066e88",
                "be059ba0-326a-4985-84e7-c20ef4f447f7",
                "ea28032b-b29c-4812-a60f-da34eb341a42",
              ],
            },
            {
              labelKey: "page_2",
              idx: 1,
              children: [],
            },
          ],
        },
      },
      {
        id: "8946731a-c5e1-43b2-850d-d542990067bf",
        type: "question",
        parent: "4420fbc2-0e12-46d0-8dac-b55e8d685f3e",
        code: "gender",
        data: {
          responseType: "TEXT",
          control: "radio",
          // labelKey can be standardized in languages json
          // labelKey: "__label",
          controlData: {
            options: [
              { labelKey: "opt1", value: "M" },
              { labelKey: "opt2", value: "F" },
            ],
          },
        },
      },
      {
        id: "cf155c9c-05c9-4e98-8d4e-ad6baf066e88",
        type: "question",
        code: "isPregnant",
        parent: "4420fbc2-0e12-46d0-8dac-b55e8d685f3e",
        reflexives: [{ fact: "gender", operator: "equal", value: "F" }],
        data: {
          responseType: "BOOLEAN",
          control: "checkbox",
          controlData: {},
        },
      },
      {
        id: "be059ba0-326a-4985-84e7-c20ef4f447f7",
        type: "separator",
        parent: "4420fbc2-0e12-46d0-8dac-b55e8d685f3e",
        data: {
          dir: "horizontal",
          hasLabel: true,
          labelPosition: "start",
        },
      },
      {
        id: "ea28032b-b29c-4812-a60f-da34eb341a42",
        type: "section",
        parent: "4420fbc2-0e12-46d0-8dac-b55e8d685f3e",
        data: {
          children: [
            "d1440655-4257-4b03-9693-df53def669ae",
            "4831a778-4c87-471e-a33f-71feaf343d57",
          ],
        },
      },
      {
        id: "d1440655-4257-4b03-9693-df53def669ae",
        type: "separator",
        parent: "ea28032b-b29c-4812-a60f-da34eb341a42",
        data: {
          dir: "horizontal",
          hasLabel: true,
          labelPosition: "start",
        },
      },
      {
        id: "4831a778-4c87-471e-a33f-71feaf343d57",
        type: "question",
        code: "age",
        parent: "ea28032b-b29c-4812-a60f-da34eb341a42",
        validations: [
          {
            conditions: [
              { fact: "response", operator: "greaterThanInclusive", value: 0 },
              { fact: "response", operator: "lessThanInclusive", value: 25 },
            ],
            error: "err1",
          },
        ],
        data: {
          responseType: "NUMBER",
          control: "numberPicker",
          controlData: {
            min: 0,
            max: 150,
            default: 25,
            step: 1,
          },
        },
      },
    ],
  } as Form,
  configs: {},
  state: new FormState({}),
};
