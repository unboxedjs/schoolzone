# Schoolzone

The Schoolzone app could be started with the following commands,

    Create .env File
    yarn
    yarn start

# TODO List

- Implement Automation testing with Code coverage,
  - Create jest.config.js for both frontend and backend since parallel pipelines will be configured based on changed files.
  - Include test builder with nrwl/jest for angular since it is pre configured and supports workspace.
  - import 'jest-preset-angular' in test-setup.ts
- Provide documentation support,
  - compodoc
  - Swagger

# Terminal Commands Used

- yarn add @nrwl/jest
- yarn add @compodoc/compodoc
- yarn add @nestjs/swagger swagger-ui-express

# Problems you might Run Into

- zone is needed for the async() test helper but could not be found
  Check for test-setup.ts

- Nest can't resolve dependencies of the AppService (?). Please make sure that the argument DatabaseConnection at index [0] is available in the RootTestModule context.

> Mongoose: looks like you're trying to test a Mongoose app with Jest's default jsdom test environment. Please make sure you read Mongoose's docs on configuring Jest to test Node.js apps: <http://mongoosejs.com/docs/jest.html>

add testEnvironment: 'node' in jest.config.js

# Lecture 29

- Monorepo Config - Jest and Documentation
