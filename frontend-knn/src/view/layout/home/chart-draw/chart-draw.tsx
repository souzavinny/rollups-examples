// Copyright 2022 Cartesi Pte. Ltd.

// Licensed under the Apache License, Version 2.0 (the "License"); you may not use
// this file except in compliance with the License. You may obtain a copy of the
// License at http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software distributed
// under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
// CONDITIONS OF ANY KIND, either express or implied. See the License for the
// specific language governing permissions and limitations under the License.

import { FC, useMemo } from "react";
import { AxisOptions, Chart } from "react-charts";
import { Col } from "react-grid-system";
import {
    ChartDrawSVGDefs,
    ChartDrawWrapper,
    FLOWER_BG_ID,
} from "./chart-draw.style";
import { Measurements, Series } from "./types";
import flowerBg from "../../../../assets/img/flower-bg.svg";
import { SendInputData } from "../../../../controller/send.controller";
import { onboardTourCSSClass } from "../onboard-tour/onboard-tour.style";

interface IChartDraw {
    inputData: SendInputData;
}

export const ChartDraw: FC<IChartDraw> = ({
    inputData: { pl, pw, sl, sw },
}) => {
    const sepalData = [
        {
            l: +sl ?? 0,
            w: 0,
        },
        {
            l: +sl ?? 0,
            w: +sw ?? 0,
        },
    ];
    const sepal = {
        label: "Sepal",
        data: sepalData,
    };
    const petalData = [
        {
            l: +pl ?? 0,
            w: 0,
        },
        {
            l: +pl ?? 0,
            w: +pw ?? 0,
        },
    ];
    const petal = {
        label: "Petal",
        data: petalData,
    };
    const background = sepal;
    const data: [Series, Series, Series] = [background, sepal, petal];

    const primaryAxis = useMemo(
        (): AxisOptions<Measurements> => ({
            getValue: (datum) => datum.w,
            max: 8,
            min: 0,
        }),
        []
    );

    const secondaryAxes = useMemo(
        (): AxisOptions<Measurements>[] => [
            {
                getValue: (datum) => datum.l,
                elementType: "area",
                stacked: false,
                max: 8,
                min: 0,
            },
        ],
        []
    );

    return (
        <Col xs={12}>
            <ChartDrawSVGDefs>
                <defs>
                    <pattern
                        id={FLOWER_BG_ID}
                        patternUnits="userSpaceOnUse"
                        width="400"
                        height="400"
                    >
                        <image xlinkHref={flowerBg} />
                    </pattern>
                </defs>
            </ChartDrawSVGDefs>
            <ChartDrawWrapper className={onboardTourCSSClass['onboard-tour-element-5']}>
                <Chart
                    options={{
                        data,
                        tooltip: false,
                        primaryAxis,
                        secondaryAxes,
                        getSeriesStyle: () => ({
                            line: { opacity: 0 },
                            area: {
                                transition: "all 1.5s ease-out 0s",
                            },
                        }),
                    }}
                />
            </ChartDrawWrapper>
        </Col>
    );
};
