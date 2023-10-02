// Copyright 2022 Cartesi Pte. Ltd.

// Licensed under the Apache License, Version 2.0 (the "License"); you may not use
// this file except in compliance with the License. You may obtain a copy of the
// License at http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software distributed
// under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
// CONDITIONS OF ANY KIND, either express or implied. See the License for the
// specific language governing permissions and limitations under the License.

import styled from "styled-components";
import { color } from "../../../atomic/styleguide.atm";

export const FLOWER_BG_ID = "flowerBg";

export const ChartDrawSVGDefs = styled.svg`
    width: 0;
    height: 0;
    image {
        y: 50;
        width: 20rem;
        height: 20rem;
        @media only screen and (min-width: 288px) {
            x: -60;
        }
        @media only screen and (min-width: 416px) {
            x: -30;
        }
        @media only screen and (min-width: 576px) {
            x: 20;
        }
        @media only screen and (min-width: 768px) {
            x: -50;
        }
        @media only screen and (min-width: 992px) {
            x: -50;
        }
        @media only screen and (min-width: 1200px) {
            x: 0;
        }
    }
`;

export const ChartDrawWrapper = styled.div`
    height: 400px;
    .Series {
        /* Petal */
        g > g:nth-child(1) > path:nth-child(1) {
            fill: #af61b6 !important;
            stroke: #af61b6 !important;
            stroke-width: 2px;
        }
        /* Sepal */
        g > g:nth-child(2) > path:nth-child(1) {
            fill: #a78acf !important;
            stroke: #a78acf !important;
            stroke-width: 2px;
        }
        /* Background */
        g > g:nth-child(3) {
            * {
                display: none;
            }
            path:nth-child(1) {
                display: initial;
                fill: url(#${FLOWER_BG_ID}) !important;
                stroke: none !important;
            }
        }
    }
    .domainAndTicks {
        .domain {
            stroke: #9b3fb8;
        }
        .tick {
            line {
                stroke: #9b3fb8;
            }
            text {
                fill: #9b3fb8 !important;
            }
        }
    }
    .grid {
        .tick {
            line {
                stroke: ${color.mediumGray};
                stroke-dasharray: 1, 1;
            }
        }
        g:nth-child(1) {
            line {
                display: none;
            }
        }
    }
`;
