// Copyright 2022 Cartesi Pte. Ltd.

// Licensed under the Apache License, Version 2.0 (the "License"); you may not use
// this file except in compliance with the License. You may obtain a copy of the
// License at http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software distributed
// under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
// CONDITIONS OF ANY KIND, either express or implied. See the License for the
// specific language governing permissions and limitations under the License.

import { FC } from "react";
import { Card } from "../../../atomic/layout.org/card.atm";
import {
    IrisType,
    irisTitle,
    irisDescription,
    irisDataTitle,
    string as cardStrings,
    irisDescriptionSrcLink,
} from "./constants";
import { Col, Row } from "react-grid-system";
import { H2, H4, Paragraph } from "../../../atomic/typography.mol";
import IrisSetosaImg from "../../../../assets/img/iris-setosa.jpg";
import IrisVersicolorImg from "../../../../assets/img/iris-versicolor.jpg";
import IrisVirginicaImg from "../../../../assets/img/iris-virginica.jpg";
import { Image } from "../../../atomic/image.mol/image.mol";
import { SendInputData } from "../../../../controller/send.controller";
import { motion } from "framer-motion";

interface IIrisResultCard {
    irisType: IrisType;
    inputData: SendInputData;
}

const irisImg: Record<IrisType, typeof IrisSetosaImg> = {
    "iris-setosa": IrisSetosaImg,
    "iris-versicolor": IrisVersicolorImg,
    "iris-virginica": IrisVirginicaImg,
};

export const IrisResultCard: FC<IIrisResultCard> = ({
    irisType,
    inputData,
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01],
            }}
        >
            <Card>
                <Col xs={12}>
                    <Row>
                        <Col>
                            <H2 color="dark" noPadding>
                                {cardStrings.resultTitle}
                            </H2>
                            <H2 color="dark" isBold>
                                {`${irisTitle[irisType]}!`}
                            </H2>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={8}>
                            <Image
                                src={irisImg[irisType]}
                                description={irisDescription[irisType]}
                                options={{
                                    textColor: "mediumGray",
                                }}
                            />
                            <Paragraph color="dark">
                                {cardStrings.description.sourceText}
                            </Paragraph>
                            <a
                                href={irisDescriptionSrcLink[irisType]}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {cardStrings.description.sourceLinkText}
                            </a>
                        </Col>
                        <Col xs={4}>
                            <H4 color="mediumGray" noPadding>
                                {cardStrings.dataProvidedTitle}
                            </H4>
                            {Object.keys(inputData).map((key, index) => {
                                const typedKey = key as keyof typeof inputData;
                                return (
                                    <Paragraph
                                        key={`${key}_${index}`}
                                        color="dark"
                                    >
                                        {`${irisDataTitle[typedKey]}: ${inputData[typedKey]}`}
                                    </Paragraph>
                                );
                            })}
                        </Col>
                    </Row>
                </Col>
            </Card>
        </motion.div>
    );
};
