// Copyright 2022 Cartesi Pte. Ltd.

// Licensed under the Apache License, Version 2.0 (the "License"); you may not use
// this file except in compliance with the License. You may obtain a copy of the
// License at http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software distributed
// under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
// CONDITIONS OF ANY KIND, either express or implied. See the License for the
// specific language governing permissions and limitations under the License.

import styled, { css } from "styled-components";
import { border, color, size, spacing } from "../../styleguide.atm";

export interface SeparatorLayout {
    vertical?: boolean;
    large?: boolean;
    outlined?: boolean;
    color?: keyof typeof color;
}

const verticalSeparatorBaseCss = css<SeparatorLayout>`
    display: inline-block;
    width: ${size.separator.vertical.md.width};
    height: ${size.separator.vertical.md.height};
    margin: ${spacing.margin.separator.vertical.md};
    *:first-child {
        border-right: ${border.separator} ${(props) => props.color || color.gray};
        width: 100%;
        height: 100%;
    }
`;
const verticalSeparatorLargeCss = css`
    height: ${size.separator.vertical.lg.height};
    width: ${size.separator.vertical.lg.height};
`;
const horizontalSeparatorBaseCss = css<SeparatorLayout>`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: ${spacing.margin.separator.horizontal.md};
    *:first-child {
        border-bottom: ${border.separator} ${(props) => props.color || color.gray};
        width: 100%;
    }
`;
const horizontalSeparatorLargeCss = css`
    margin: ${spacing.margin.separator.horizontal.xlg};
`;
export const SeparatorStyled = styled.div<SeparatorLayout>`
    ${({ vertical, large }) => css`
        ${vertical ? verticalSeparatorBaseCss : horizontalSeparatorBaseCss}
        ${large
            ? vertical
                ? verticalSeparatorLargeCss
                : horizontalSeparatorLargeCss
            : ""}
    `}
`;
export const SeparatorStrawStyled = styled.div<SeparatorLayout>`
    ${(props) => !props.outlined && "border: none !important;"}
`;
