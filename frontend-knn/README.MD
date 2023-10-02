# Frontend knn

This project demonstrates how to implement a web application UI to interact with [knn](../knn/) DApp, both running locally and deployed on remote testnet networks.
It's implemented mainly in Typescript and uses [reactjs](https://reactjs.org/) library to build ui, and [ethers](https://docs.ethers.io/v5/) library to communicate with the rollups smart contracts.

## Alias

Iris Classifier

## Requirements

- node.js
- yarn

## Setup

### Cloning

To do the app base setup, first clone the repository as follows:

```shell
git clone https://github.com/cartesi/rollups-examples.git
```

### Installing dependencies

After this, access the app root folder and install dependencies by executing the following commands:

```shell
cd frontend-knn/
yarn
```

### Generating graphql models

Then, generate the graphql models with command:

```shell
yarn gen-graphql
```

### Building app

And in order to create the app build, use the command:

```shell
yarn build
```

## Running

You can run this app in `development` and `production` modes by following the steps below:

- Development

    1. Create a `.env.development` file based in [.env.default](.env.default) and fill it;
    2. Then, run the command:
    ```shell
    yarn dev
    ```
    3. Access the browser url shown in terminal.

- Production

    1. Create the app build. [See how](#building-app);
    2. Create a `.env.production` file based in [.env.default](.env.default) and fill it;
    3. Then run the command:
    ```shell
    yarn preview
    ```
    4. Access the browser url shown in terminal.

## Brief

In general terms, the Iris Classifier offers an interactive, web responsive and enjoyable UI which communicates with the knn DApp through a simple four inputs based forms, authenticated by a web 3.0 wallet.


