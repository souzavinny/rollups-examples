<div align="center">
    <h1>Biometrics classifier</h1>
    <i>A Decentralized Biometrics Solution</i>
</div>
<div align="center">
  This repository contains an OpenCV Biometrics DApp developed using cartesi rollups.
</div>

<div align="center">
  
  <a href="">[![Static Badge](https://img.shields.io/badge/cartesi--rollups-1.0.0-5bd1d7)](https://docs.cartesi.io/cartesi-rollups/)</a>
  <a href="">[![Static Badge](https://img.shields.io/badge/OpenCV-4.8-red)](https://opencv.org/)</a>
  <a href="">[![Static Badge](https://img.shields.io/badge/python-3.11-yellow)](https://www.python.org/)</a>
  <a href="">[![Static Badge](https://img.shields.io/badge/C%2B%2B-17-blue)](https://en.wikipedia.org/wiki/C%2B%2B)</a>
</div>







# Table of contents

- [Intro](#intro)
  - [Key Features](#key-features)
  - [Benefits](#benefits)
- [Biometrics Workflow Explanation](#biometrics-workflow-explanation)
- [Requirements](#requirements)
- [Install Process](#install-process)
  - [Creating the needed files](#creating-the-needed-files)
  - [Loading and running in production mode](loading-and-running-in-production-mode)
  - [Running the back-end in host mode](running-the-back-end-in-host-mode)
- [Understanding the application](#understanding-the-application)
- [Interacting with the application](#interacting-with-the-application)
  - [Frontend-Console](#frontend-console)
  - [Using the Frontend-biometrics](#using-the-frontend-biometrics)

# Intro

The DApp leverages Support Vector Machine [SVM](https://en.wikipedia.org/wiki/Support-vector_machine) models created with [scikit-learn](https://scikit-learn.org/), [NumPy](https://numpy.org/) and [pandas](https://pandas.pydata.org/) to perform biometric analysis. Subsequently, the model is transpiled into native Python code with zero dependencies using [m2cgen (Model to Code Generator)](https://github.com/BayesWitnesses/m2cgen), a Model to Code Generator. This approach is inspired by a machine learning [tutorial](https://www.freecodecamp.org/news/transform-machine-learning-models-into-native-code-with-zero-dependencies/) and is particularly beneficial for a Cartesi DApp as it eliminates the necessity of porting extensive machine learning libraries to the Cartesi Machine's RISC-V architecture. This not only simplifies the development process but also makes the final back-end code more efficient to execute. Additionally, this DApp utilizes C++ OpenCV to generate histograms for all images used during the training and testing phases, as well as for new image inputs.

The practical goal of this application is to predict a classification for Fingerprints. As such, users can submit images as inputs to classify as "Live" or "Fake". 

## Key Features
[(Back to top)](#table-of-contents)

- SVM Model Generation: Utilizes scikit-learn, NumPy, and pandas to generate a Support Vector Machine (SVM) model for biometric analysis.
- Model Transpilation: Uses m2cgen to transpile the SVM model into native Python code with zero dependencies, facilitating its integration into the Cartesi DApp.
- Image Processing: Employs C++ OpenCV to generate histograms for all images used during training, testing, and new image inputs.
- Cartesi Rollups: Leverages the Cartesi Rollups infrastructure to ensure the DApp is scalable, decentralized, and secure.

## Benefits

[(Back to top)](#table-of-contents)
- Simplified Development: Eliminates the need to port extensive machine learning libraries to the Cartesi Machine's RISC-V architecture.
- Efficient Execution: Transpiling the model into native code with no dependencies ensures efficient execution on the back-end.
- Robust Image Processing: Utilizing C++ OpenCV for image processing ensures efficiency and robustness.
- Scalability and Security: By leveraging Cartesi Rollups, the DApp benefits from enhanced scalability and security.

# Biometrics Workflow Explanation

[(Back to top)](#table-of-contents)
This example employs a supervised approach to classify fingerprint samples as either 'live' or 'fake'. The workflow used is standard for this type of scenario: providing a classifier with labeled inputs and then utilizing the generated algorithm to classify new inputs with a label. In this case, we are dealing with binary classification, where the classifier will predict the inputs as one class or the other (in this instance as 'live' or 'fake'). The diagram below illustrates the workflow with every technology utilized in this experiment.


![image](https://github.com/souzavinny/rollups-examples/assets/4421825/f3efe69d-8ae0-4e64-9865-b8ae76e53a0d)



The whole DApp uses C++ OpenCV and Python to achieve the main goal. It is a product of much research applied with the Cartesi API.

# Requirements
[(Back to top)](#table-of-contents)
Please refer to the [rollups-examples requirements](https://github.com/cartesi/rollups-examples/tree/main/README.md#requirements).

# Install Process
The steps below show how to set up and run the Decentralized Biometrics example. Those steps were executed and tested in Ubuntu 20 and 22 environments.

## Creating the needed files
[(Back to top)](#table-of-contents)
To run the biometrics example, clone the repository as follows:

```shell
$ git clone https://github.com/souzavinny/rollups-examples.git
```

The clone of this repository will give a sample dataset with the ideal structure for this experiment. Any change in it needs to be evaluated, but if the main structure fits the diagram below, it will work for any texture classification example:

![dataset drawio (2)](https://user-images.githubusercontent.com/4421825/172436480-a9043209-25b1-4de3-b769-465c5a4272e9.png)


You'll also need the riscv toolchain from cartesi to cross-compile the C++ code. You can see how to do that in this [article](https://medium.com/cartesi/guest-post-how-opencv-cross-compiles-in-the-blockchain-os-79a9eba6108b). We'll consider that you have it in /home/riscv/riscv64-cartesi-linux-gnu/. With that:

```shell
$ cd rollups-examples/biometrics/model/build_model_files
$ ./build_prod_model_files dataset
```


This command generates the files needed to train the model and also builds the fexrvv to be used in the server folder. Keep in mind you will have errors if you don't have the OpenCV installed and the cartesi riscv toolchain as explained above. Below you can see a terminal window with the result. Your execution should be similar to this:

```shell
-- The C compiler identification is GNU 11.4.0

-- The CXX compiler identification is GNU 11.4.0

-- Detecting C compiler ABI info

-- Detecting C compiler ABI info - done

-- Check for working C compiler: /usr/bin/cc - skipped

-- Detecting C compile features

-- Detecting C compile features - done

-- Detecting CXX compiler ABI info

-- Detecting CXX compiler ABI info - done

-- Check for working CXX compiler: /usr/bin/c++ - skipped

-- Detecting CXX compile features

-- Detecting CXX compile features - done

-- Found OpenCV: /usr/local (found version "4.8.0") 

-- Configuring done (2.0s)

-- Generating done (0.0s)

-- Build files have been written to: ../rollups-examples/biometrics/model/build_model_files

[100%] Linking CXX executable fex

[100%] Built target fex

Creating �Gp�� files 

Creating �Gp�� files 

```




After that, you construct the model with the command below.

```shell
$ cd rollups-examples/biometrics/model
$ make
```

This command takes the generated files from the step before training a model to be used in the back end and also shows the scores for the trained model.

```shell
True Positive-->The classifier model predicted 162 Live(Positive) samples as Live(Positive)
False Negative-->The classifier model predicted 38 Live(Positive) samples as Fake(Negative)
True Positive-->The classifier model predicted 43 Fake(Negative) samples as Live(Positive)
True Negative-->The classifier model predicted 157 Fake(Negative) samples as Fake(Negative)
Precision of the Linear SVM: 0.7902439024390244
Recall of the Linear SVM: 0.81
Accuracy of the Linear SVM: 0.7975
Precision 0.7902439024390244
Recall 0.81
Accuracy 0.7975
```
## Loading and running in production mode
[(Back to top)](#table-of-contents)

With all the files needed ready, run the following command:

```shell
docker buildx bake -f docker-bake.hcl -f docker-bake.override.hcl --load
```
Be sure this command is executed while the terminal is in the biometrics root folder. This will create the dapp with all the Cartesi structure needed. This process takes a while to be ready, so don't worry about it being long. Your terminal window will be something similar to the screen below:

![image](https://github.com/souzavinny/rollups-examples/assets/4421825/7db12460-dc9a-40bb-ada7-976c36f65696)


After this command, you can execute the following to finally run the backend with the dapp logic:

```shell
docker compose -f ../docker-compose.yml -f ./docker-compose.override.yml up
```

You will see in the terminal window something similar to the window below:

![image](https://github.com/souzavinny/rollups-examples/assets/4421825/847de1fd-e1a9-4cfb-88d1-c87d63e317cc)


The application can afterward be shut down with the following command:
```shell
docker compose -f ../docker-compose.yml -f ./docker-compose.override.yml down -v
```
This is a very important command while dealing with the application because it turns down the dapp and also deletes the docker volumes. While testing this can be crucial while dealing with the blockchain node. Sometimes you want to restart the blockchain from the start, and only by doing this command this can be accomplished. 

## Running the back-end in host mode
[(Back to top)](#table-of-contents)

When developing an application, it is often important to easily test and debug it. For that matter, it is possible to run the Cartesi Rollups environment in [host mode](https://github.com/cartesi/rollups-examples/tree/main/README.md#host-mode), so that the DApp's back-end can be executed directly on the host machine, allowing it to be debugged using regular development tools such as an IDE.

This DApp's back-end is written in Python, so to run it in your machine you need to have `python3` installed.

In order to start the back-end, run the following commands in a dedicated terminal:

```shell
python3 -m venv .env
. .env/bin/activate
pip install -r requirements.txt
ROLLUP_HTTP_SERVER_URL="http://127.0.0.1:5004" python3 biometrics.py
```

# Understanding the application
[(Back to top)](#table-of-contents)

As explained before, The DApp will receive an image as input to classify as a Live(genuine) finger or Fake(Spoof attack). 

When building the machine, the dataset is used as training data for building a Support Vector Machine model. The model currently takes into the LBP histogram of characteristics ([See](https://en.wikipedia.org/wiki/Local_binary_patterns)). This generates a histogram to be used as features to classify.

The predicted classification result will be given as "Live" (Genuine Finger) or "Fake" (Spoof Attack).

# Interacting with the application
[(Back to top)](#table-of-contents)
There are two ways to interact with the application. One is the [frontend console](../frontend-console) and another is the [frontend-biometrics](../frontend-biometrics). Here is a detailed explanation of how to do both.

## Frontend-Console 
[(Back to top)](#table-of-contents)
We can use the [frontend-console](../frontend-console) application to interact with the DApp.
Ensure that the [application has already been built](../frontend-console/README.md#building) before using it.

First, go to a separate terminal window and switch to the `frontend-console` directory:

```shell
cd frontend-console
```
Then, send an input using the python script in this folder, as follows:

```shell
$  python ./inputimg.py
Please Enter the image file
fake.png #We have two sample images in this folder, just pass the image name and extension.
```

We strongly recommend using that since input images are sent by turning them in strings base 64. However since the images are too long, they are divided into chunks to fit the size supported by the bash. Also, The backend expects a JSON with other information generated by this script.

The input will have been accepted when you receive a response similar to the following one:

```shell
Image Sent!
Time Elapsed was: 38.65782713890076
Time per chunks was : 9.66445678472519
```
While in the backend, you can also see in the terminal window running something similar to:

![image](https://github.com/souzavinny/rollups-examples/assets/4421825/f7a6f873-2203-4ecd-ba2d-1ce6e39bd133)

Where, as you can see:

```shell
rollups-examples-server_manager-1         | INFO:__main__:Data =0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266_fake.png, Predicted: fake

rollups-examples-server_manager-1         | INFO:__main__:Adding notice with payload: fake
```

This means the predicted result of your input image and the payload being added to the notice.

In order to verify the notices generated by your inputs, run the command:

```shell
yarn start notice list
```

The response should be something like this:

```shell
querying http://localhost:4000/graphql for notices of input index "undefined"...
[{"index":0,"input":1,"payload":"Image not loaded"},{"index":0,"input":2,"payload":"Image not loaded"},{"index":0,"input":3,"payload":"Image not loaded"},{"index":0,"input"4:,"payload":"fake"}]
```
Below is a short video on how the input front frontend console should work:

[cartesi.webm](https://github.com/souzavinny/rollups-examples/assets/4421825/38cc34e7-5732-47ed-88b3-5f7e738598e1)


## Using the Frontend-biometrics
[(Back to top)](#table-of-contents)

We can use the [frontend-console](../frontend-biometrics) application to interact with the DApp.
Ensure that the [application has already been built](../frontend-biometrics/README.md#building) before using it.

First, you will need to import a local wallet to the metamask, since the frontend console uses it to send the transactions to the backend. With that said, you will need to connect to the local blockchain. To do that, do the following:

You can find a private key when you run the up command explained above. In one of the logs, you will see some public wallets and their private keys. Something similar to below:

![image](https://github.com/souzavinny/rollups-examples/assets/4421825/9784c7c3-c207-4fac-b5c7-0d7282e14b26)

With this private key, and the localhost blockchain running, import the wallet into the metamask. You can also follow this [guide](https://medium.com/publicaio/how-import-a-wallet-to-your-metamask-account-dcaba25e558d#:~:text=After%20creating%20an%20account%2C%20click,key%20string%20and%20click%20Import.).

The biometrics frontend has a Manage Wallet option in the up-right sector of the page. Click there to connect your wallet to the biometrics frontend. You can also bring the localhost blockchain through there. See below:

![image](https://github.com/souzavinny/rollups-examples/assets/4421825/f55222ed-e688-4f80-b0d8-2c19bd4031a1)

If everything goes as expected, you will see the funds of the localhost blockchain in the wallet as follows:

![image](https://github.com/souzavinny/rollups-examples/assets/4421825/25349fad-8dc0-4a1d-97f4-f673aeb3e58c)

Now you can send any of the images in the gallery to the backend through transactions. Keep in mind you will be prompted to confirm the transaction four times in sequence. See the following video below that showcases the frontend:

[biometrics-feedback-animation.webm](https://github.com/souzavinny/rollups-examples/assets/4421825/8b9f68a1-1368-4cb1-a9bb-7889fc41412f)

# Deploying to a testnet

Deploying the application to a blockchain requires creating a smart contract on that network, as well as running a validator node for the DApp.

The first step is to build the DApp's back-end machine, which will produce a hash that serves as a unique identifier.

```shell
docker buildx bake -f docker-bake.hcl -f docker-bake.override.hcl machine --load
```

Once the machine docker image is ready, we can use it to deploy a corresponding Rollups smart contract. This requires you to define a few environment variables to specify which network you are deploying to, which account to use, and which RPC gateway to use when submitting the deploy transaction.

```shell
export NETWORK=<network>
export MNEMONIC=<user sequence of twelve words>
export RPC_URL=<https://your.rpc.gateway>
```

For example, to deploy to the Sepolia testnet using an Alchemy RPC node, you could execute:

```shell
export NETWORK=sepolia
export MNEMONIC=<user sequence of twelve words>
export RPC_URL=https://eth-sepolia.g.alchemy.com/v2/<USER_KEY>
```

With that in place, you can submit a deploy transaction to the Cartesi DApp Factory contract on the target network by executing the following command:

```shell
DAPP_NAME=biometrics docker compose -f ./deploy-testnet.yml up
```

This will create a file at `./deployments/<network>/template.json` with the deployed contract's address.
Once the command finishes, it is advisable to stop the docker compose and remove the volumes created when executing it.

```shell
DAPP_NAME=biometrics docker compose -f ./deploy-testnet.yml down -v
```

After that, a corresponding Cartesi Validator Node must also be instantiated in order to interact with the deployed smart contract on the target network and handle the back-end logic of the DApp.

Aside from the environment variables defined above, the node will also need a secure websocket endpoint for the RPC gateway (WSS URL).

For example, for Sepolia and Alchemy, you would set the following additional variable:

```shell
export WSS_URL=wss://eth-sepolia.g.alchemy.com/v2/<USER_KEY>
```

Then, the node itself can be started by running a docker compose as follows:

```shell
DAPP_NAME=biometrics docker compose --env-file ./env.<network> -f ./docker-compose-testnet.yml -f ./docker-compose.override.yml up
```

Which, in the case of Sepolia, would be:

```shell
DAPP_NAME=biometrics docker compose --env-file ./env.sepolia -f ./docker-compose-testnet.yml -f ./docker-compose.override.yml up
```



