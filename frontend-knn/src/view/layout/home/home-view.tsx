// Copyright 2022 Cartesi Pte. Ltd.

// Licensed under the Apache License, Version 2.0 (the "License"); you may not use
// this file except in compliance with the License. You may obtain a copy of the
// License at http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software distributed
// under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
// CONDITIONS OF ANY KIND, either express or implied. See the License for the
// specific language governing permissions and limitations under the License.

import { FC, useState } from "react";
import { fetchNotices } from "../../../controller/notices.controller";
import { SendInputData, sendInput } from "../../../controller/send.controller";
import { useService } from "../../../controller/use-service/use-service.hook";
import { NoticeViewModel } from "../../../service/notices.service";
import { SendInputViewModel } from "../../../service/send.service";
import { SharedLayout } from "../shared/shared-layout";
import { Row } from "react-grid-system";
import { toast } from "react-toast";
import { string } from "./constants";
import { resetServiceState } from "../../../controller/common.controller";
import { useOnboardedService } from "../../../controller/use-service/use-onboarded-service";
import { SendInputForm } from "./send-input.form";
import { FeedbackBoard } from "./feedback.board";
import { OnboardTourProvider } from "./onboard-tour/onboard-tour.context";

//TODO: implement context pattern to improve state management

export const HomeView: FC = () => {
    const [noticesState, noticesDispatch] = useService<NoticeViewModel[]>();
    const [sendInputState, sendInputDispatch] =
        useOnboardedService<SendInputViewModel>();
    const [inputData, setInputData] = useState<SendInputData | null>(null);
    const handleSendInput = (data: SendInputData) => {
        if (sendInputState.chain) {
            toast.info(string.sendInputFeedback.requestStarted);
            sendInput(
                sendInputDispatch,
                data,
                sendInputState.chain?.id,
                sendInputState.wallet.provider
            )
                .then((result) =>
                    fetchNotices(
                        noticesDispatch,
                        {
                            epoch_index: result?.epochNumber ?? 0,
                            input_index: result?.inputIndex ?? 0,
                        },
                        true
                    )
                        .then(() => {
                            setInputData(data);
                            toast.success(string.fetchNoticesFeedback.onSucess);
                        })
                        .catch(() =>
                            toast.error(string.fetchNoticesFeedback.onError)
                        )
                )
                .catch(() => toast.error(string.sendInputFeedback.onError));
        } else toast.error(string.sendInputFeedback.web3OnboardError);
    };
    const handleResetStates = () => {
        resetServiceState(noticesDispatch);
        resetServiceState(sendInputDispatch);
    };

    return (
        <OnboardTourProvider>
            <SharedLayout>
                <Row>
                    <SendInputForm
                        handleSendInput={handleSendInput}
                        onClearForm={handleResetStates}
                        isLoading={
                            sendInputState.status === "pending" ||
                            noticesState.status === "pending"
                        }
                        canClearForm={
                            sendInputState.status === "resolved" &&
                            noticesState.status === "resolved"
                        }
                    />
                    <FeedbackBoard
                        data={noticesState.data ?? []}
                        inputData={inputData}
                        status={
                            sendInputState.status === "pending"
                                ? "pending"
                                : noticesState.status
                        }
                    />
                </Row>
            </SharedLayout>
        </OnboardTourProvider>
    );
};
