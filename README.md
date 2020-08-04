# Schoolzone

[Demo App](https://www.master.sz.jsworkbench.com/) - Hosted Application reference
[Documentation](https://udemylectures.gitlab.io/schoolzone/) - Code Coverage and Documentation

The Schoolzone app could be started with the following commands,

    Create .env File
    yarn
    yarn start

### TODO List

- Add ngrx state and its dependencies
- Familarize with actions, reducers, effects and selectors.

### Terminal Commands Used

- yarn add @ngrx/{store,effects,entity,store-devtools,router-store,data}
- yarn add @ngrx/schematics --dev
- ng generate @ngrx/schematics:store State --root --module app.module.ts
- ng add @ngrx/router-store
- ng add @ngrx/entity
- ng add @ngrx/data

### Problems you might Run Into

- do yarn install priorly since package manager might conflict.
- check whether schematics is added as dev dependency

### Lecture 48

- State Management with NgRx
