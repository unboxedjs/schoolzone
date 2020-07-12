# Schoolzone

The Schoolzone app could be started with the following commands,

    Create .env File
    yarn
    yarn start

# TODO List

- Modularize Backend and make appropriate tsconfig changes
  controllers
  enums
  interfaces
  handlers
  schemas
  utils
- Use exceptions for error handling and interceptor for jwt by registering it either in app level(At least one global handling is expected) or module level.

# Terminal Commands Used

- nest g module controllers/user --no-spec
- nest g controller controllers/user --no-spec
- nest g controller controllers/auth --no-spec
- nest g service controllers/auth --no-spec
- nest g service controllers/user --no-spec
- nest g interceptor handlers/interceptor/global --no-spec

# Problems you might Run Into

- Unique field in mongoose not working
  Restart Server after adding useCreateIndex and also delete db for changes to reflect

# Lecture 28

- Modularize your backend
