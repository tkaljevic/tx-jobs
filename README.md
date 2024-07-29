# Job Ads Application

## Overview

The aim of the application is to allow users to create, edit, and delete job ads.

The application consists of the following features:

- **Create new job ads:** The user can create new job ads by providing the following information: title, description, skills, and status.
- **Edit existing job ads:** The user can edit existing job ads by changing any of the information provided when the job ad was created.
- **Filter job ads:** The user can filter job ads by title, description, skill, and status.
- **Delete job ads:** The user can delete existing job ads.
- **Change the status of a job ad:** The user can change the status of a job ad from draft to published or from published to archived.
- **List invoices:** The user can list the invoices.
- **Create invoices:** When a job ad is published, an invoice will be created.
- **Responsive design:** The application is fully responsive.

## Prerequisites

| Installation | Version   |
| ------------ | --------- |
| Angular      | `18.1.1`  |
| NodeJS       | `20.15.0` |
| npm          | `10.7.0`  |

It is recommended to use `VS Code` for development. The following VS Code extensions are also recommended:

| Name                     | ID                                      |
| ------------------------ | --------------------------------------- |
| Angular Language Service | `Angular.ng-template`                   |
| Code Spell Checker       | `streetsidesoftware.code-spell-checker` |
| Prettier                 | `esbenp.prettier-vscode`                |
| ESLint                   | `dbaeumer.vscode-eslint`                |

The optional extensions are:

| Name           | ID                             |
| -------------- | ------------------------------ |
| Thunder Client | `rangav.vscode-thunder-client` |
| GitLens        | `eamodio.gitlens`              |

## Getting Started

To continue with development, please clone the project from this [repository](https://github.com/tkaljevic/tx-jobs) and follow the instructions provided in the README file for further guidance.

Instructions are listed below.

### Install Dependencies

> **Note:** Except for npm, any other tool (like Bun or Yarn) could be used for this purpose.

```bash
npm install
```

<br/>

### **DEVELOPMENT INSTRUCTIONS**

Before you continue development on this project, it is recommended to read content from the following links:

| Title                     | Link                                |
| ------------------------- | ----------------------------------- |
| `Naming conventions`      | [link](./.readme/naming.md)         |
| `Applying good practices` | [link](./.readme/good-practices.md) |

## **Running the Application Locally**

<!-- There are two ways to run the application: -->

To run this project, follow instructions as listed bellow:

### Manually start individual parts

```bash
npx json-server './src/assets/db/db.json'
```

```bash
ng serve
```

> **RECOMMENDED:** In this case, type `CTRL + Shift + 5` in your IDE's terminal to split it, so you can see both outputs simultaneously.

<!-- ### Running with the start command

To run the application with a single command, use the following:

```bash
npm run start
```

This command will start the mocked backend (json-server) and serve the frontend application.

> **RECOMMENDED:** Use your editor's integrated terminal to easily see the build output. -->

## **Documentation**

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.1

The application relies on the following technologies and concepts:

- [RxJs](https://rxjs.dev/)
- [NgRx](https://ngrx.io/)
- [Angular Material](https://material.angular.io/)
- [Bootstrap Grid](https://getbootstrap.com/docs/4.0/layout/grid/)
- Observables

### Running Unit Tests

Run `npm run test` to execute the unit tests.

```bash
npm run test
```

### Linting

To start linting, run following command:

```console
npm run lint
```

### Building

To build the project, run following command:

```console
npm run build
```
