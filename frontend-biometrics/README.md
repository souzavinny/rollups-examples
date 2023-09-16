# Frontend Biometrics

This project demonstrates how to implement a web application UI to interact with [biometrics](../biometrics/) DApp, both running locally and deployed on remote testnet networks.
It's implemented mainly in Typescript and uses [reactjs](https://reactjs.org/) library to build ui, and [ethers](https://docs.ethers.io/v5/) library to communicate with the rollups smart contracts.

<div align="center">
    
  <a href="">[![Static Badge](https://img.shields.io/badge/cartesi--rollups-1.0.0-5bd1d7)](https://docs.cartesi.io/cartesi-rollups/)</a>
  <a href="">[![Static Badge](https://img.shields.io/badge/react.js-18.0.17-green)](https://react.dev/)</a>
  <a href="">[![Static Badge](https://img.shields.io/badge/ethers-5.7-brown)](https://docs.ethers.io/v5/)</a>
</div>

## Alias

Biometrics Classifier

![image](https://github.com/souzavinny/rollups-examples/assets/4421825/ecdc97b1-9362-4b54-b080-8623209ad6cf)

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
cd frontend-biometrics/
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

    1. Create a `.env.development` file based in [.env.default](.env.default) and fill it; If running locally, just leave the address as it is.
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

In general terms, the Biometrics offers an interactive, web responsive and enjoyable UI which communicates with the biometrics DApp through transactions, authenticated by a web 3.0 wallet.


