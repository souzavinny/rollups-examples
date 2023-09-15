// Copyright 2022 Cartesi Pte. Ltd.

// Licensed under the Apache License, Version 2.0 (the "License"); you may not use
// this file except in compliance with the License. You may obtain a copy of the
// License at http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software distributed
// under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
// CONDITIONS OF ANY KIND, either express or implied. See the License for the
// specific language governing permissions and limitations under the License.

import {
    IInputBox,
    ICartesiDApp,
    IInputBox__factory,
    ICartesiDApp__factory,
    IERC20Portal,
    IERC721Portal,
    IERC20Portal__factory,
    IERC721Portal__factory,
} from "@cartesi/rollups";
import { Deployment, Contract } from "../../abi";
import { Web3Provider } from "@ethersproject/providers";
import { ConnectedChain } from "@web3-onboard/core";
import { ChainId } from "../../config/types";
import { env } from "../../config/constants";
import {
    readAddressFromFile,
    readAllContractsFromDir
} from "../../utils"
import { networks } from "../../networks";
export interface RollupsContracts {
    dapp: string;
    inputContract: IInputBox;
    outputContract: ICartesiDApp;
    erc20Portal: IERC20Portal;
    erc721Portal: IERC721Portal;
}

export const addressMap: Record<ChainId, string> = {
    [ChainId.localhost]: env.VITE_LOCAL_DAPP_ADDRESS,
    [ChainId.testnet]: env.VITE_TESTNET_DAPP_ADDRESS,
};

export const genRollupsContracts = (
    chainId: ConnectedChain["id"],
    provider: Web3Provider
): RollupsContracts => {
    // TODO: get programatically instead of this hardcode
    const address = addressMap[chainId as ChainId];

    if (!address) {
        throw new Error("unable to resolve DApp address");
    }
    //TODO
    const InputBox = "0x59b22D57D4f067708AB0c00552767405926dc768";
    const ERC20Portal = "0x9C21AEb2093C32DDbC53eEF24B873BDCd1aDa1DB";
    const ERC721Portal = "0x237F8DD094C0e47f4236f12b4Fa01d6Dae89fb87";
    const OutputContract = "0x70ac08179605AF2D9e75782b8DEcDD3c22aA4D0C"
    // connect to contracts
    const inputContract = IInputBox__factory.connect(
        InputBox,
        provider.getSigner()
    );
    const outputContract = ICartesiDApp__factory.connect(
        OutputContract,
        provider.getSigner()
    );

    const erc20Portal = IERC20Portal__factory.connect(
        ERC20Portal,
        provider.getSigner()
    );
    const erc721Portal = IERC721Portal__factory.connect(
        ERC721Portal,
        provider.getSigner()
    );

    console.log("This is the inputbox address: ", InputBox)
    console.log("This is the ERC20Portal address: ", ERC20Portal)
    console.log("This is the outputContract address: ", OutputContract)
    console.log("This is the ERC721Portal address: ", ERC721Portal)
    console.log("This is dapp: adress: ", address)
    
    return {
        dapp: OutputContract,
        inputContract,
        outputContract,
        erc20Portal,
        erc721Portal
    };
};
