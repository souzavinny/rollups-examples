// Copyright 2022 Cartesi Pte. Ltd.

// Licensed under the Apache License, Version 2.0 (the "License"); you may not use
// this file except in compliance with the License. You may obtain a copy of the
// License at http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software distributed
// under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
// CONDITIONS OF ANY KIND, either express or implied. See the License for the
// specific language governing permissions and limitations under the License.

import { GlobalStyle } from "./view/atomic/global-style.mol";
import { HomeView } from "./view/layout/home/home-view";
import { setConfiguration } from "react-grid-system";
import { ToastContainer } from "react-toast";
import { initWeb3Wallet } from "./config/web3-wallet.setup";

// Grid system setup
setConfiguration({ maxScreenClass: "xl" });
// web3 wallet setup
initWeb3Wallet();

export const App = () => {
    return (
        <>
            <GlobalStyle />
            <HomeView />
            <ToastContainer position="bottom-center" delay={6000} />
        </>
    );
};
