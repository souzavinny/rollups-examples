// Copyright 2022 Cartesi Pte. Ltd.

// Licensed under the Apache License, Version 2.0 (the "License"); you may not use
// this file except in compliance with the License. You may obtain a copy of the
// License at http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software distributed
// under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
// CONDITIONS OF ANY KIND, either express or implied. See the License for the
// specific language governing permissions and limitations under the License.

export const string = {
    aboutButton: {
        text: "About",
    },
    aboutModal: {
        title: "About",
        aria: {
            labelledById: "about-modal",
        },
        textTitle: "Titanic Survivor - An DApp by Locus Powered By Cartesi",
        textContent1:
            "This DApp is one from a series of DApps born from the partnership of Locus Custom Software and Cartesi. The main objective was to bring common concepts from the web2 to the web3 through the Cartesi rollups technology.",
        textContent2:
            "Bringing more complex machine learning models than the Iris Classifier, the Titanic Survivor DApp uses Logistic Regression from Scikit-Learn throught m2cgen library and this is used to the prediction step. This prediction, and all the computation, is done inside the blockchain, thanks to the Cartesi API which brings those kind of concepts to the blockchain, therefore, one of the great benefits of using it.",
        CTAButton: {
            text: "OK"
        }
    },
    header: "Locus DApp | Powered By Cartesi",
    manageWalletButton: {
        text: "Manage wallet",
    },
    manageWalletModal: {
        title: "Wallet Management",
        aria: {
            labelledById: "wallet-management-modal",
        },
        switchChainInput: {
            id: "switchChainInput",
            name: "Switch chain",
        },
        connectButton: {
            text: "Connect",
            loading: "Connecting...",
        },
        disconnectButton: {
            text: "Disconnect",
        },
    },
    onboardTourButton: {
        text: "Start DApp tour",
    },
};
