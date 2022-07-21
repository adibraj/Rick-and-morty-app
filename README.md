# Rick and Morty App

This is a simple react app to show the Rick and Morty characters with this open graphql endpoint.

> https://rickandmortyapi.com/graphql

## Live link:

Access my live project at [https://rick-and-morty-app-snowy.vercel.app/](https://rick-and-morty-app-snowy.vercel.app/)

## Screenshots

![Landing Page](https://res.cloudinary.com/mdevang10/image/upload/v1658404089/Adib/Screen_Shot_2022-07-21_at_4.30.42_PM_wvd6sw.png)

![Landing Page With Filter option](https://res.cloudinary.com/mdevang10/image/upload/v1658404079/Adib/Screen_Shot_2022-07-21_at_4.31.34_PM_jtfrjs.png)

![Character Detail](https://res.cloudinary.com/mdevang10/image/upload/v1658404082/Adib/Screen_Shot_2022-07-21_at_4.31.42_PM_utm8lz.png)

## Technologies

- [Reactjs](https://reactjs.org/)
- React Router
- React Testing Library for Testing
- TypeScript
- Material UI

## Installation

You need to have `node` and `yarn or npm` installed on your computer.

**Installing the project's dependencies:**

> \$ yarn install

To start the server, run the command below

> \$ yarn start

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Running Tests

To run tests, run the following command

```bash
yarn run test
```

**Test Coverage**

```bash
yarn test --coverage
```

![Test Coverage](https://res.cloudinary.com/mdevang10/image/upload/v1658404066/Adib/Screen_Shot_2022-07-21_at_4.45.31_PM_qhmdzc.png)

## Project Structure

<PRE>
-- src
  -- __mock  
  -- components
  -- container
       -- CharacterDetail
       -- CharacterList
  -- hooks
  -- types
</PRE>

- \_\_mock :- All test related mock files are added in this folder
- components :- All UI only components such as filter,header components are added here
- container :- All Components which have business logic and which calls api are added here (CharacterDetail & CharacterList)
- hooks :- All custom hooks are added in this directory.
- types :- Typescript types are added in this directory.
