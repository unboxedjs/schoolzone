# Schoolzone

# TODO List

- Tets an Interface that could be shared across applications in both front end and back end.
- Add proxy.conf.json for connecting to API from angular
- Create a shared Library to use across angular projects thereby reducing repetition
- Shared lib should also be linted and tested.
- Should support sharing of assets and styles as well.

# Terminal Commands Used

- nest g interface interfaces/common
- ng g s \_services/general --skip-tests
- ng g library shared --prefix=sz

# Problems you might Run Into

- make sure angular.json and tsconfig are confgiured as per this commit.

# Lecture 26

- Monorepo Config - Shared Resources
