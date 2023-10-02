// Copyright 2022 Cartesi Pte. Ltd.

// Licensed under the Apache License, Version 2.0 (the "License"); you may not use
// this file except in compliance with the License. You may obtain a copy of the
// License at http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software distributed
// under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
// CONDITIONS OF ANY KIND, either express or implied. See the License for the
// specific language governing permissions and limitations under the License.

import { ShepherdOptionsWithType } from "react-shepherd";
import { resetTourScroll, getStepButtons } from "./helpers";
import { onboardTourCSSClass } from "./onboard-tour.style";

const sharedOptions: ShepherdOptionsWithType = {
    beforeShowPromise: resetTourScroll,
    buttons: getStepButtons(),
    scrollTo: false,
    cancelIcon: {
        enabled: true,
    },
};

const firstStepOptions: ShepherdOptionsWithType = {
    ...sharedOptions,
    buttons: getStepButtons("FirstStep"),
};

const lastStepOptions: ShepherdOptionsWithType = {
    ...sharedOptions,
    buttons: getStepButtons("LastStep"),
};

export const onBoardTourSteps: ShepherdOptionsWithType[] = [
    {
        attachTo: {
            element: `.${onboardTourCSSClass["onboard-tour-element-1"]}`,
            on: "bottom",
        },
        title: "Wallet connection",
        text: [
            "First, connect your wallet properly. You will need a Metamask and Goerli testnet account with currency to use the DApp.",
        ],
        ...firstStepOptions,
    },
    {
        attachTo: {
            element: `.${onboardTourCSSClass["onboard-tour-element-2"]}`,
            on: "bottom",
        },
        title: "The form",
        text: [
            `The DApp predicts if you could survive the Titanic Accident through the infos passed by this form.
            Age and Gender are self informative, and Embarked Town is the three main cities where the passengers could embark in the trip.`,
        ],
        ...sharedOptions,
    },
    {
        attachTo: {
            element: `.${onboardTourCSSClass["onboard-tour-element-3"]}`,
            on: "bottom",
        },
        title: "Submitting the infos",
        text: [
            "With this button, you can send the operation to the blockchain. It will open the transaction in the Metamask wallet to be confirmed.",
        ],
        ...sharedOptions,
    },
    {
        attachTo: {
            element: `.${onboardTourCSSClass["onboard-tour-element-4"]}`,
            on: "bottom",
        },
        title: "Result preview",
        text: [
            "This area will shown you the prediction result computed by the DApp backend.",
        ],
        ...lastStepOptions,
    },
];
