// Copyright 2022 Cartesi Pte. Ltd.

// Licensed under the Apache License, Version 2.0 (the "License"); you may not use
// this file except in compliance with the License. You may obtain a copy of the
// License at http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software distributed
// under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
// CONDITIONS OF ANY KIND, either express or implied. See the License for the
// specific language governing permissions and limitations under the License.

export const id = {
    sendInputForm: {
        main: "sendInputForm",
        ageInput: "Age",
        sexInput: "Sex",
        embarkedInput: "Embarked",
        clearResultButton: "clearResultButton",
        clearAllButton: "clearAllButton"
    },
};

export const string = {
    resultPreview: {
        title: "Result preview",
        idleFeedback: "Use the form to get started! 🧊🚢",
        pendingFeedback: "Waiting for result...",
        survivedFeeback: "YOU SURVIVED!",
        sankFeedback: "YOU SANK!",
    },
    sendInputForm: {
        ageInputText: "Age",
        sexInputText: "Gender",
        embarkedInputText: "Embarked from",
        submitButtonText: "See result",
        clearResultButtonText: "Clear result",
        clearAllButtonText: "Clear all",
        loadingButtonText: "Waiting...",
        description:
            "Try if you would survive or sink in the Titanic crash! 👀",
    },
    sendInputFeedback: {
        requestStarted:
            "Sending infos, wait please. It may take a few minutes.",
        web3OnboardError:
            "You need to connect the wallet to proceed with this action!",
        onError: "Sorry! An error occurred while send infos, try again later.",
    },
    fetchNoticesFeedback: {
        onSucess: "Your result is ready!",
        onError: "Sorry! An error occurred while get result, try again later.",
    },
};

export const config = {
    ageInput: {
        max: 150,
        min: 10
    }
}
