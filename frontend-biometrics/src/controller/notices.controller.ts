// Copyright 2022 Cartesi Pte. Ltd.

// Licensed under the Apache License, Version 2.0 (the "License"); you may not use
// this file except in compliance with the License. You may obtain a copy of the
// License at http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software distributed
// under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
// CONDITIONS OF ANY KIND, either express or implied. See the License for the
// specific language governing permissions and limitations under the License.

import { Dispatch } from "react";
import { NoticesByInputQueryVariables } from "../../generated/graphql";
import { getNotices, NoticeViewModel } from "../service/notices.service";
import { genTimerPromise } from "../utils/timer-promise";
import { REFETCH_TIME_DEFAULT } from "./config/constants";
import { ServiceReducerActions } from "./use-service/use-service.hook";

export const fetchNotices = async (
    dispatch: Dispatch<ServiceReducerActions<NoticeViewModel[]>>,
    params: NoticesByInputQueryVariables,
    refetchIfEmpty?: boolean
) => {
    dispatch({ type: "start_request" });
    try {
        let fetchedNotices = await getNotices(params);
        //TODO: change refetch to pub/sub
        const hasUnableToFindError = fetchedNotices.error?.match(
            /(unable|find|input)/
        );

        if (refetchIfEmpty || hasUnableToFindError) {
            let refetchCount = 0;
            let refetchTime = REFETCH_TIME_DEFAULT;

            while (!fetchedNotices.data?.length) {
                await genTimerPromise(refetchTime);
                const refetch = await getNotices(params, true);
                fetchedNotices = refetch;
                refetchCount += 1;
                if (refetchCount % 5 === 0) refetchTime += refetchCount * 1000;
            }
        }
        if (!!fetchedNotices.error) throw new Error(fetchedNotices.error);

        dispatch({ type: "resolve_request", data: fetchedNotices.data });

        return fetchedNotices;
    } catch (err) {
        dispatch({ type: "fail_request", error: err });

        throw err;
    }
};
