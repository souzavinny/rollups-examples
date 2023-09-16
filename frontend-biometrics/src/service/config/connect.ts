// Copyright 2022 Cartesi Pte. Ltd.

// Licensed under the Apache License, Version 2.0 (the "License"); you may not use
// this file except in compliance with the License. You may obtain a copy of the
// License at http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software distributed
// under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
// CONDITIONS OF ANY KIND, either express or implied. See the License for the
// specific language governing permissions and limitations under the License.

import { ethers } from "ethers";
import { genRollupsContracts, RollupsContracts } from "./rollups";
import { WalletState, ConnectedChain } from "@web3-onboard/core";

export const connect = (
    chainId: ConnectedChain["id"],
    walletProvider: WalletState["provider"]
): RollupsContracts => {
    const provider = new ethers.providers.Web3Provider(walletProvider);
    const rollupContract = genRollupsContracts(chainId, provider);
    return rollupContract;
};
