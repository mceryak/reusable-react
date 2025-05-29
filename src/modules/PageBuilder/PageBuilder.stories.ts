import type { Meta, StoryObj } from '@storybook/react';
import PageBuilder from "./PageBuilder";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof PageBuilder> = {
  component: PageBuilder,
  title: 'Modules/PageBuilder'
};


export default meta;
type Story = StoryObj<typeof PageBuilder>;


export const EmptyPage: Story = {
  args: {
    page: {
      header: {
        type: 'heading',
        htmlId: 'h',
        children: []
      },
      body: {
        type: 'body',
        htmlId: 'b',
        children: []
      }
    }
  },
};

export const NotepadGrid: Story = {
  args: {
    page: {
      "header": {
        "type": "heading",
        "htmlId": "h",
        "children": []
      },
      "body": {
        "type": "body",
        "htmlId": "b",
        "children": [
          {
            "type": "section",
            "htmlId": "b0-",
            "htmlIdCustom": "section",
            "children": [
              {
                "type": "grid",
                "htmlId": "b00-",
                "htmlIdCustom": "grid",
                "children": [
                  {
                    "type": "notepad",
                    "htmlId": "b000-",
                    "htmlIdCustom": "notepad",
                    "children": [],
                    "title": "We Will Never...",
                    "theme": "red"
                  },
                  {
                    "type": "notepad",
                    "htmlId": "b001-",
                    "htmlIdCustom": "notepad",
                    "children": [],
                    "title": "We Will...",
                    "theme": "green"
                  }
                ],
                "columns": {
                  "sm": "1",
                  "md": "2",
                  "lg": "2"
                }
              }
            ],
            "title": "What Sets Us Apart",
            "bgImageRef": {
              "type": "public",
              "ref": ""
            },
            "backgroundOverlay": {
              "from": "",
              "to": ""
            },
            "topShadow": false,
            "americanFlags": false,
            "contentWidth": "large"
          }
        ]
      }
    }
  }
}

export const ContactForm: Story = {
  args: {
    page: {
      "header": {
        "type": "heading",
        "htmlId": "h",
        "children": []
      },
      "body": {
        "type": "body",
        "htmlId": "b",
        "children": [
          {
            "type": "section",
            "htmlId": "UmdJmf33nt6l_Whm6X17d-",
            "htmlIdCustom": "section",
            "children": [
              {
                "type": "contactForm",
                "htmlId": "AXBQKWniy1ivKa196QSMt-",
                "htmlIdCustom": "contactForm",
                "children": [
                  {
                    "type": "formInput",
                    "htmlId": "AJxvk2eQqlG4HRuoiZ-ph-",
                    "htmlIdCustom": "name",
                    "label": "Name",
                    "name": "name",
                    "required": true,
                    "inputType": "text",
                    "options": ""
                  },
                  {
                    "type": "formInput",
                    "htmlId": "AUXHiiZLTPulxfXR_u5mt-",
                    "htmlIdCustom": "email",
                    "label": "Email",
                    "name": "email",
                    "required": true,
                    "inputType": "email",
                    "options": ""
                  },
                  {
                    "type": "formInput",
                    "htmlId": "4t8Xup7GG4U0Reiacb5KD-",
                    "htmlIdCustom": "message",
                    "label": "Message",
                    "name": "message",
                    "required": true,
                    "inputType": "textarea",
                    "options": ""
                  }
                ]
              }
            ],
            "title": "",
            "bgImageRef": {
              "type": "public",
              "ref": ""
            },
            "backgroundOverlay": {
              "from": "",
              "to": ""
            },
            "topShadow": false,
            "americanFlags": false,
            "contentWidth": "large",
            "textColor": "light"
          }
        ]
      }
    }
  }
}
