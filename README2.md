Page Builder UI

## Key Features

- a library for building a form, page or section of a page
- build page from YML, JSON or page builder UI (demo in library, not implemented in admin yet)

- uses the following building blocks (see below for details):
  - Widget (building block of the page)
  - QuestionControl (form fields of the page, a module set under Question Widget)
  - Validation (question control validations that communicate with parents like pages)
- uses a instance-based state (like redux) that holds all information including the current state of page (ie. current page, validation state) and form field responses
- handles loading state (stops pages from changing page)
- handles nestable pages
  - with validation triggering
  - one navigation handle children pages navigation
- support localisation handled/stored independently
- Page Builder UI decoupled as its own library. Front-end and back-end can also be decoupled. Library not linked to any other services
- support views (ie. display, readOnly, builder, admin) that allow each building block to define its own vue component for each scenario
- all features (ie. Widget, QuestionControl, Validation) is modulised and extendable
- in page builder, each module has extendable handling for:
  - the view
  - view floating control
  - form display handling
  - tree display handling
- page builder is available as a demo in the library, not implemented in admin yet
- uses event listeners to communicate globally within Page
- allow effects on widgets (ie. slide in, fade in, \<a /> tag anchor, background)

## Page (encapuslates everything needed to display the page)

- can be plugged into a page as:
  - top level page
  - a section of a page
  - a form

## Widgets (building block of the page)

- extendable via props
- module examples:
  - pages - paging system that understands how to handle validation and interact with child pages to have a seamless navigation
  - question - a form field handler that call upon questionControl to display specified question (form field) type. This has handling for validation and updating to widget state
  - text - define text at given position, along with its styling like: h1, h2, p, small, underline, align left/right/center. Can handle excel like parsing that can access other fields like validation
  - separator - a horizontal line
  - section - a boxed in container that holds its own widgets
- each widget can ﻿have its own view component (ie. display, readOnly, builder, admin, dtc-ui)
- each widget can have its own singleton service (WidgetItem) that lives for duration of the page component

## WidgetEffects (effects to add to a widget)

- extendable via props
- module examples:
  - background
  - anchor (\<a href=\"#\" />)
  - animation - fade in, slide in (top, left, bottom, right)

## QuestionControls (form fields of the page, a module-set used under [question] Widget)

- extendable via props
- module examples:
  - dropdown
  - radioGroup
  - buttonGroup
  - text
  - datePicker
  - fileUpload
  - signature
- each module can have its own singleton service (QuestionWidgetItem) that handles any long living listeners, validations
- each module can have a component for each view (ie. display, readOnly)

## Validations (question control validations that communicate with parents like pages)

- extendable via props
- handles async validation
- can access other fields as value
- nestable parsable fields like excel commands
  example:

```
=IF($isPaidRoomFees,
        dayjs($hospitalisationEndDate).add(1,
"day").diff($hospitalisationStartDate, "day"),
        MAX(dayjs($hospitalisationEndDate).diff($hospitalisationStartDate,
"day"), 1))
```
