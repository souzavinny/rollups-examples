// Copyright 2022 Cartesi Pte. Ltd.

// Licensed under the Apache License, Version 2.0 (the "License"); you may not use
// this file except in compliance with the License. You may obtain a copy of the
// License at http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software distributed
// under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
// CONDITIONS OF ANY KIND, either express or implied. See the License for the
// specific language governing permissions and limitations under the License.

import { FC, useCallback } from "react";
import { Col, Hidden, Row, Visible } from "react-grid-system";
import { useForm } from "react-hook-form";
import { brandName } from "../../../config/constants";
import { SendInputData } from "../../../controller/send.controller";
import { Button } from "../../atomic/button.mol/button.mol";
import { FieldsetWrapper, FormWrapper } from "../../atomic/form.org/form.mol";
import { InputError } from "../../atomic/form.org/helpers";
import { Input } from "../../atomic/form.org/input.mol";
import { Separator } from "../../atomic/layout.org/separator.mol/separator.atm";
import { H1, Label, Paragraph } from "../../atomic/typography.mol";
import { ChartDraw } from "./chart-draw/chart-draw";
import { useParseChartDrawData } from "./chart-draw/use-parse-chart-draw-data";
import { id, string } from "./constants";
import { OnboardTourHighlightWrapper } from "./onboard-tour/onboard-tour-highlight.wrapper";
import { onboardTourCSSClass } from "./onboard-tour/onboard-tour.style";

interface ISendInputForm {
    handleSendInput: (data: SendInputData) => void;
    onClearForm: () => void;
    isLoading: boolean;
    canClearForm: boolean;
}

const formString = string.sendInputForm;

export const SendInputForm: FC<ISendInputForm> = ({
    handleSendInput,
    onClearForm,
    isLoading,
    canClearForm,
}) => {
    const {
        handleSubmit,
        register,
        formState,
        clearErrors,
        reset,
        watch,
        setError
    } = useForm<SendInputData>();
    const formData = watch();
    const lengthAndWidthMax = 8;
    const chartDrawData = useParseChartDrawData(
        formData,
        lengthAndWidthMax,
        setError,
        clearErrors
    );
    const plMaxFallback = !!formData.sl ? +formData.sl : lengthAndWidthMax;
    const pwMaxFallback = !!formData.sw ? +formData.sw : lengthAndWidthMax;

    const handleClearForm = useCallback(
        (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault();

            const buttonId = e.currentTarget.id;
            const clearForm = () => {
                clearErrors();
                reset();
            };

            switch (buttonId) {
                case id.sendInputForm.clearResultButton: {
                    onClearForm();
                    break;
                }
                case id.sendInputForm.clearAllButton:{
                    clearForm();
                    onClearForm();
                    break;
                }
            }
        },
        [onClearForm, clearErrors, reset]
    );

    return (
        <Col xs={12} md={6}>
            <H1>{brandName}</H1>
            <Paragraph color="gray">{formString.description}</Paragraph>
            <Separator />
            <Row>
                <Col xs={12} md={8} lg={9}>
                    <ChartDraw inputData={chartDrawData} />
                </Col>
                <Col xs={12} md={4} lg={3}>
                    <FormWrapper
                        className={
                            onboardTourCSSClass["onboard-tour-element-2"]
                        }
                        id={id.sendInputForm.main}
                        onSubmit={handleSubmit(handleSendInput)}
                    >
                        <OnboardTourHighlightWrapper className="onboard-tour-element-3">
                            <Row>
                                <Col>
                                    <Label paddingX="sm">
                                        {formString.sepalLabel}
                                    </Label>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={6} md={12}>
                                    <FieldsetWrapper
                                        form={id.sendInputForm.main}
                                        flexDir="row"
                                    >
                                        <Input
                                            id={
                                                id.sendInputForm.sepalWidthInput
                                            }
                                            name={formString.widthLabel}
                                            register={register}
                                            type="number"
                                            flexDir="row"
                                            max={lengthAndWidthMax}
                                            min={0.1}
                                            step={0.1}
                                            isOutilined
                                            required
                                        />
                                    </FieldsetWrapper>
                                    <InputError
                                        error={formState.errors.sw}
                                        name={formString.widthLabel}
                                        options={{
                                            required: true,
                                            max: lengthAndWidthMax,
                                            min: 0.1,
                                        }}
                                    />
                                </Col>
                                <Col xs={6} md={12}>
                                    <FieldsetWrapper
                                        form={id.sendInputForm.main}
                                        flexDir="row"
                                    >
                                        <Input
                                            id={
                                                id.sendInputForm
                                                    .sepalLengthInput
                                            }
                                            name={formString.lengthLabel}
                                            register={register}
                                            type="number"
                                            flexDir="row"
                                            max={lengthAndWidthMax}
                                            min={0.1}
                                            step={0.1}
                                            isOutilined
                                            required
                                        />
                                    </FieldsetWrapper>
                                    <InputError
                                        error={formState.errors.sl}
                                        name={formString.lengthLabel}
                                        options={{
                                            required: true,
                                            max: lengthAndWidthMax,
                                            min: 0.1,
                                        }}
                                    />
                                </Col>
                            </Row>
                        </OnboardTourHighlightWrapper>
                        <Separator />
                        <OnboardTourHighlightWrapper className="onboard-tour-element-4">
                            <Row>
                                <Col>
                                    <Label paddingX="sm">
                                        {formString.petalLabel}
                                    </Label>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={6} md={12}>
                                    <FieldsetWrapper
                                        form={id.sendInputForm.main}
                                        flexDir="row"
                                    >
                                        <Input
                                            id={
                                                id.sendInputForm.petalWidthInput
                                            }
                                            name={formString.widthLabel}
                                            register={register}
                                            type="number"
                                            flexDir="row"
                                            max={pwMaxFallback}
                                            min={0.1}
                                            step={0.1}
                                            isOutilined
                                            required
                                        />
                                    </FieldsetWrapper>
                                    <InputError
                                        error={formState.errors.pw}
                                        name={formString.widthLabel}
                                        options={{
                                            required: true,
                                            max: pwMaxFallback,
                                            min: 0.1,
                                        }}
                                    />
                                </Col>
                                <Col xs={6} md={12}>
                                    <FieldsetWrapper
                                        form={id.sendInputForm.main}
                                        flexDir="row"
                                    >
                                        <Input
                                            id={
                                                id.sendInputForm
                                                    .petalLengthInput
                                            }
                                            name={formString.lengthLabel}
                                            register={register}
                                            type="number"
                                            flexDir="row"
                                            max={plMaxFallback}
                                            min={0.1}
                                            step={0.1}
                                            isOutilined
                                            required
                                        />
                                    </FieldsetWrapper>
                                    <InputError
                                        error={formState.errors.pl}
                                        name={formString.lengthLabel}
                                        options={{
                                            required: true,
                                            max: plMaxFallback,
                                            min: 0.1,
                                        }}
                                    />
                                </Col>
                            </Row>
                        </OnboardTourHighlightWrapper>
                    </FormWrapper>
                </Col>
            </Row>
            <Separator />
            <Row>
                <Col>
                    <Visible xs sm>
                        <Row justify="center">
                            {renderSubmitButton(
                                canClearForm,
                                handleClearForm,
                                isLoading
                            )}
                        </Row>
                    </Visible>
                    <Hidden xs sm>
                        <Row>
                            {renderSubmitButton(
                                canClearForm,
                                handleClearForm,
                                isLoading
                            )}
                        </Row>
                    </Hidden>
                </Col>
            </Row>
            <Visible xs sm>
                <Separator />
            </Visible>
        </Col>
    );
};

const renderSubmitButton = (
    canClearForm: boolean,
    handleClearForm: (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => void,
    isLoading: boolean
) => {
    return (
        <>
            {canClearForm ? (
                <>
                    <Col xs="content" sm={6}>
                        <Button
                            id={id.sendInputForm.clearResultButton}
                            form={id.sendInputForm.main}
                            type="reset"
                            onClick={handleClearForm}
                        >
                            {formString.clearResultButtonText}
                        </Button>
                    </Col>
                    <Visible xs>
                        <Col xs={12}>
                            <Separator />
                        </Col>
                    </Visible>
                    <Col xs="content" sm={6}>
                        <Button
                            id={id.sendInputForm.clearAllButton}
                            onClick={handleClearForm}
                        >
                            {formString.clearAllButtonText}
                        </Button>
                    </Col>
                </>
            ) : (
                <Col xs="content">
                        <Button
                        className={onboardTourCSSClass['onboard-tour-element-6']}
                        form={id.sendInputForm.main}
                        type="submit"
                        sideElement="right"
                        disabled={isLoading}
                    >
                        {isLoading
                            ? formString.loadingButtonText
                            : formString.submitButtonText}
                    </Button>
                </Col>
            )}
        </>
    );
};
