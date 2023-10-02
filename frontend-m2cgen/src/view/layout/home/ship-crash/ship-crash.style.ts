// Copyright 2022 Cartesi Pte. Ltd.

// Licensed under the Apache License, Version 2.0 (the "License"); you may not use
// this file except in compliance with the License. You may obtain a copy of the
// License at http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software distributed
// under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
// CONDITIONS OF ANY KIND, either express or implied. See the License for the
// specific language governing permissions and limitations under the License.

import { Col, Row } from "react-grid-system";
import styled from "styled-components";
import { linearGradient, radius, zIndex } from "../../../atomic/styleguide.atm";

export const ShipCrashAnimationWrapper = styled(Row)`
    position: relative;
    height: 100%;
`;
export const ShipCrashAnimationBoard = styled(Col)`
    display: flex;
    align-items: center;
    justify-content: center;
`;
export const OceanWrapper = styled.div`
    z-index: ${zIndex.veryLow};
    position: absolute;
    width: 100%;
    height: 80%;
    border-radius: ${radius.md};
    background: ${linearGradient.ocean};
    background-origin: border-box;
    background-position: bottom -20px right;
    background-size: 100% 50%;
    background-repeat: no-repeat;

    @media only screen and (min-width: 768px) {
        background-position: bottom -45px right;
    }
`;
