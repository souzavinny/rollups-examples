// Copyright 2022 Cartesi Pte. Ltd.

// Licensed under the Apache License, Version 2.0 (the "License"); you may not use
// this file except in compliance with the License. You may obtain a copy of the
// License at http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software distributed
// under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
// CONDITIONS OF ANY KIND, either express or implied. See the License for the
// specific language governing permissions and limitations under the License.

import { FC, useEffect, useState } from "react";
import { Col, Row } from "react-grid-system";
import { NoticeViewModel } from "../../../service/notices.service";
import { BoxWrapper } from "../../atomic/layout.org/layout.mol";
import { H1, H4 } from "../../atomic/typography.mol";
import { string } from "./constants";
import SkullImgSVG from "../../../assets/img/skull.svg";
import CelebrationImgSVG from "../../../assets/img/celebration.svg";
import { UseServiceState } from "../../../controller/use-service/use-service.hook";
import { Image } from "../../atomic/image.mol/image.mol";
import { ShipCrashAnimation } from "./ship-crash/ship-crash.animation";
import { genTimerPromise } from "../../../utils/timer-promise";
import { RESOLVED_REQUEST_TRANSITION_DURATION } from "./ship-crash/constants";
import { motion } from "framer-motion";
import { onboardTourCSSClass } from "./onboard-tour/onboard-tour.style";

interface IFeedbackBoard {
    data: NoticeViewModel[];
    status: UseServiceState<any>["status"];
}

const boardString = string.resultPreview;

export const FeedbackBoard: FC<IFeedbackBoard> = ({ data, status }) => {
    const [shouldShownAnimation, setShouldShownAnimation] = useState<boolean>(false);
    const handleResult = (
        currentData: typeof data,
        currentStatus: typeof status
    ) => {
        if (currentStatus !== "resolved" && !data?.length)
            return { img: null, message: null };

        const notice = currentData[0];
        const isSurvived = notice.payload_parsed === "1";
        const message = isSurvived
            ? boardString.survivedFeeback
            : boardString.sankFeedback;
        const img = isSurvived ? CelebrationImgSVG : SkullImgSVG;

        return { message, img };
    };
    const { img, message } = handleResult(data, status);

    useEffect(() => {
        if (status === "resolved") genTimerPromise(
            (RESOLVED_REQUEST_TRANSITION_DURATION * 1000) + 300
        ).then(() => setShouldShownAnimation(false));
        else if (status === "pending") setShouldShownAnimation(true);
    }, [status]);

    return (
        <BoxWrapper
            className={onboardTourCSSClass["onboard-tour-element-4"]}
            sm={12}
            md={6}
            isFluid
        >
            <Row justify="end">
                <Col xs="content">
                    <H4 color="lightMain">{boardString.title}</H4>
                </Col>
            </Row>
            <Row justify="center" style={{ height: "100%" }}>
                <Col xs={shouldShownAnimation ? 12 : "content"}>
                    {shouldShownAnimation ? (
                        <ShipCrashAnimation status={status} />
                    ) : null}
                    {status === "idle" || status === "rejected" ? (
                        <H1 color="sweetMain" justify="center">
                            {boardString.idleFeedback}
                        </H1>
                    ) : null}
                    {!shouldShownAnimation && img && message ?
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                duration: 0.8,
                                delay: 0.5,
                                ease: [0, 0.71, 0.2, 1.01],
                            }}
                        >

                            <Image src={img} justify="center" size="lg" />
                            <H1 color="sweetMain" justify="center" isBold>
                                {message}
                            </H1>
                        </motion.div>
                    : null}
                </Col>
            </Row>
        </BoxWrapper>
    );
};
