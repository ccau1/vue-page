import { Page } from '../../src/lib-components';
import { PageState } from '../../src/lib-components/models/PageState';

export default {
  page: {
    id: '7347ef09-7778-4c5c-898d-bede667f4c0b',
    widgets: [
      {
        id: '1f2ad689-74e0-422c-b4d6-ea6a1f90b5ee',
        type: 'pages',
        properties: {
          pages: [
            {
              labelKey: 'step_1',
              idx: 0,
              children: ['4420fbc2-0e12-46d0-8dac-b55e8d685f3e'],
            },
            {
              labelKey: 'step_2',
              idx: 1,
              children: [],
            },
          ],
          hasCompleteButton: true,
          tabsVisible: true,
          // tabsPosition: ["top", "center"],
          navigationVisible: true,
          navigationIntegrateChildrenPages: true,
        },
      },
      {
        id: '4420fbc2-0e12-46d0-8dac-b55e8d685f3e',
        type: 'pages',
        parent: '1f2ad689-74e0-422c-b4d6-ea6a1f90b5ee',
        properties: {
          pages: [
            {
              labelKey: 'page_1',
              idx: 0,
              children: [
                '1e6e8ead-591c-43cc-bc44-f99ad76062ef',
                '24d84b9f-19e6-49d4-9123-6fbda60361ec',
                '010f664f-bf1d-4abe-8782-957cc024c414',
              ],
            },
            {
              labelKey: 'page_2',
              idx: 1,
              children: [
                'aa104b5b-1a13-47b8-8590-7fa5b9927d97',
                '4036afd0-0d81-4b99-b862-4e1f3d44509a',
                '7a9f4686-f41b-4bce-a7ff-c5f6fbfe8d34',
                '8946731a-c5e1-43b2-850d-d542990067bf',
                'cf155c9c-05c9-4e98-8d4e-ad6baf066e88',
                'be059ba0-326a-4985-84e7-c20ef4f447f7',
                'ea28032b-b29c-4812-a60f-da34eb341a42',
                'd42e770d-a753-41c6-96d7-0c61c3d3b29f',
                'ecaae14f-2c0c-42e5-adf3-85277ec0b448',
                'da07bc99-88ef-460d-824e-24972e2bebe1',
                'e6d238e9-1bdc-4d9d-bfff-5499c2e67179',
                '14f4c2d4-2cb0-488a-b39a-063292d6bb77',
              ],
            },
          ],
          tabsVisible: true,
          navigationVisible: false,
          detachParentIntegration: false,
        },
      },
      {
        id: '1e6e8ead-591c-43cc-bc44-f99ad76062ef',
        type: 'text',
        parent: '4420fbc2-0e12-46d0-8dac-b55e8d685f3e',
        properties: {
          tagType: 'h1',
        },
      },
      {
        id: '24d84b9f-19e6-49d4-9123-6fbda60361ec',
        type: 'html',
        parent: '4420fbc2-0e12-46d0-8dac-b55e8d685f3e',
        effects: [
          {
            type: 'reveal',
            properties: {
              origin: 'left',
              distance: '500px',
              delay: 500,
              duration: 300,
            },
          },
        ],
        properties: {
          from: 'default',
        },
      },
      {
        id: '010f664f-bf1d-4abe-8782-957cc024c414',
        type: 'question',
        code: 'isAgreedTerms',
        parent: '4420fbc2-0e12-46d0-8dac-b55e8d685f3e',
        effects: [
          {
            type: 'anchor',
            properties: {
              id: 'agreement',
              top: -20,
            },
          },
        ],
        validationRules: [
          {
            conditions: ['isTrue'],
            error: 'err1',
          },
        ],
        properties: {
          responseType: 'BOOLEAN',
          control: 'checkbox',
          hideLabel: true,
          controlProperties: {},
        },
      },
      {
        id: 'aa104b5b-1a13-47b8-8590-7fa5b9927d97',
        type: 'text',
        parent: '4420fbc2-0e12-46d0-8dac-b55e8d685f3e',
        properties: {
          tagType: 'h1',
        },
      },
      {
        id: '4036afd0-0d81-4b99-b862-4e1f3d44509a',
        type: 'text',
        parent: '4420fbc2-0e12-46d0-8dac-b55e8d685f3e',
        properties: {
          tagType: 'h2',
        },
      },
      {
        id: '7a9f4686-f41b-4bce-a7ff-c5f6fbfe8d34',
        type: 'alert',
        parent: '4420fbc2-0e12-46d0-8dac-b55e8d685f3e',
        properties: {
          type: 'default',
          customBackgroundColor: '#f00',
          customBorderColor: '#ff0',
          customTextColor: 'green',
          showCloseBtn: true,
        },
      },
      {
        id: '8946731a-c5e1-43b2-850d-d542990067bf',
        type: 'question',
        parent: '4420fbc2-0e12-46d0-8dac-b55e8d685f3e',
        code: 'gender',
        validationRules: [
          {
            conditions: ['required'],
            error: 'err1',
          },
        ],
        // style: ".question-wrapper { background-color: blue; }",
        properties: {
          responseType: 'TEXT',
          control: 'radio',
          controlProperties: {
            options: [
              { labelKey: 'opt1', value: 'M' },
              { labelKey: 'opt2', value: 'F' },
            ],
          },
        },
      },
      {
        id: 'cf155c9c-05c9-4e98-8d4e-ad6baf066e88',
        type: 'question',
        code: 'isPregnant',
        parent: '4420fbc2-0e12-46d0-8dac-b55e8d685f3e',
        reflexiveRules: [{ fact: 'gender', operator: 'equal', value: 'F' }],
        properties: {
          responseType: 'BOOLEAN',
          control: 'checkbox',
          controlProperties: {},
        },
      },
      {
        id: 'be059ba0-326a-4985-84e7-c20ef4f447f7',
        type: 'separator',
        parent: '4420fbc2-0e12-46d0-8dac-b55e8d685f3e',
        properties: {
          dir: 'horizontal',
          hasLabel: true,
          labelPosition: 'start',
        },
      },
      {
        id: 'ea28032b-b29c-4812-a60f-da34eb341a42',
        type: 'section',
        parent: '4420fbc2-0e12-46d0-8dac-b55e8d685f3e',
        properties: {
          children: [
            'd1440655-4257-4b03-9693-df53def669ae',
            '4831a778-4c87-471e-a33f-71feaf343d57',
          ],
        },
      },
      {
        id: 'd1440655-4257-4b03-9693-df53def669ae',
        type: 'separator',
        parent: 'ea28032b-b29c-4812-a60f-da34eb341a42',
        properties: {
          dir: 'horizontal',
          hasLabel: true,
          labelPosition: 'start',
        },
      },
      {
        id: '4831a778-4c87-471e-a33f-71feaf343d57',
        type: 'question',
        code: 'age',
        parent: 'ea28032b-b29c-4812-a60f-da34eb341a42',
        validationRules: [
          {
            conditions: ['inRange(0, 18)'],
            error: 'err1',
          },
        ],
        properties: {
          responseType: 'NUMBER',
          control: 'numberPicker',
          controlProperties: {
            min: 0,
            max: 150,
            default: 20,
            step: 1,
          },
        },
      },
      {
        id: 'd42e770d-a753-41c6-96d7-0c61c3d3b29f',
        type: 'question',
        code: 'incidentDate',
        parent: '4420fbc2-0e12-46d0-8dac-b55e8d685f3e',
        properties: {
          responseType: 'DATE',
          control: 'datePicker',
          controlProperties: {
            defaultDate: 'Date.now()',
            minDate: 'Date.now()',
            maxDate: "add(7, 'day')",
          },
        },
      },
      {
        id: 'ecaae14f-2c0c-42e5-adf3-85277ec0b448',
        type: 'question',
        code: 'incidentLocation',
        parent: '4420fbc2-0e12-46d0-8dac-b55e8d685f3e',
        properties: {
          responseType: 'TEXT',
          control: 'text',
          controlProperties: {
            multiline: true,
            maxLen: 300,
          },
        },
      },
      {
        id: 'da07bc99-88ef-460d-824e-24972e2bebe1',
        type: 'question',
        code: 'injuryPart',
        parent: '4420fbc2-0e12-46d0-8dac-b55e8d685f3e',
        properties: {
          responseType: 'TEXT',
          control: 'dropdown',
          controlProperties: {
            options: [
              { labelKey: 'opt1', value: 'knee' },
              { labelKey: 'opt2', value: 'shoulder' },
              { labelKey: 'opt3', value: 'arm' },
            ],
          },
        },
      },
      {
        id: 'e6d238e9-1bdc-4d9d-bfff-5499c2e67179',
        type: 'question',
        code: 'injuryType',
        parent: '4420fbc2-0e12-46d0-8dac-b55e8d685f3e',
        // fetchPropertiesOnWidgetsChange: ['injuryPart'],
        // defined in page level?
        // fetchPropertiesApi: 'http://backend/fetch-properties',
        asyncValidation: [
          {
            url: '',
            verb: 'GET',
            parseResult: () => true,
            errorKey: 'async_validation_err1',
          },
        ],
        properties: {
          responseType: 'TEXT',
          control: 'dropdown',
          listenedOn: ['injuryPart'],
          controlProperties: {
            options: [
              { labelKey: 'opt1', value: 'amputation' },
              { labelKey: 'opt2', value: 'burn' },
              { labelKey: 'opt3', value: 'cut' },
              {
                labelKey: 'opt4',
                value: 'dislocation',
                conditions: [
                  {
                    any: [
                      {
                        fact: 'injuryPart',
                        operator: 'in',
                        value: ['shoulder', 'arm'],
                      },
                      {
                        fact: 'injuryPart',
                        operator: 'equal',
                        value: null,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        },
      },
      {
        id: '14f4c2d4-2cb0-488a-b39a-063292d6bb77',
        type: 'question',
        code: 'isPaidRoomFees',
        parent: '4420fbc2-0e12-46d0-8dac-b55e8d685f3e',
        properties: {
          responseType: 'TEXT',
          control: 'buttonGroup',
          controlProperties: {
            options: [
              { labelKey: 'opt1', value: 'knee' },
              { labelKey: 'opt2', value: 'shoulder' },
              { labelKey: 'opt3', value: 'arm' },
            ],
          },
        },
      },
    ],
  } as Page,
  configs: {},
  state: new PageState({}),
};
