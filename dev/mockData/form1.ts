import { Form } from "../../src/lib-components";
import { FormState } from "../../src/lib-components/models/FormState";

export default {
  form: {
    id: "7347ef09-7778-4c5c-898d-bede667f4c0b",
    widgets: [
      {
        id: "1f2ad689-74e0-422c-b4d6-ea6a1f90b5ee",
        type: "pages",
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
          tabsVisible: true,
          // tabsPosition: ["top", "center"],
          navigationVisible: true,
        },
      },
      {
        id: "4420fbc2-0e12-46d0-8dac-b55e8d685f3e",
        type: "pages",
        parent: "1f2ad689-74e0-422c-b4d6-ea6a1f90b5ee",
        data: {
          pages: [
            {
              labelKey: "page_1",
              idx: 0,
              children: [
                "aa104b5b-1a13-47b8-8590-7fa5b9927d97",
                "4036afd0-0d81-4b99-b862-4e1f3d44509a",
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
          tabsVisible: true,
          navigationVisible: true,
        },
      },
      {
        id: "aa104b5b-1a13-47b8-8590-7fa5b9927d97",
        type: "header",
        parent: "4420fbc2-0e12-46d0-8dac-b55e8d685f3e",
        data: {
          tagType: "h1",
        },
      },
      {
        id: "4036afd0-0d81-4b99-b862-4e1f3d44509a",
        type: "header",
        parent: "4420fbc2-0e12-46d0-8dac-b55e8d685f3e",
        data: {
          tagType: "h2",
        },
      },
      {
        id: "8946731a-c5e1-43b2-850d-d542990067bf",
        type: "question",
        parent: "4420fbc2-0e12-46d0-8dac-b55e8d685f3e",
        code: "gender",
        validationRules: [
          {
            conditions: [
              { fact: "response", operator: "notEqual", value: undefined },
            ],
            error: "err1",
          },
        ],
        // style: ".question-wrapper { background-color: blue; }",
        data: {
          responseType: "TEXT",
          control: "radio",
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
        reflexiveRules: [{ fact: "gender", operator: "equal", value: "F" }],
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
        validationRules: [
          {
            conditions: [
              { fact: "response", operator: "greaterThanInclusive", value: 0 },
              { fact: "response", operator: "lessThanInclusive", value: 18 },
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
            default: 20,
            step: 1,
          },
        },
      },
    ],
  } as Form,
  configs: {},
  state: new FormState({}),
};
