// Copyright 2022 Cartesi Pte. Ltd.

// Licensed under the Apache License, Version 2.0 (the "License"); you may not use
// this file except in compliance with the License. You may obtain a copy of the
// License at http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software distributed
// under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
// CONDITIONS OF ANY KIND, either express or implied. See the License for the
// specific language governing permissions and limitations under the License.

import { useState, useEffect } from "react";
import { UseFormSetError, UseFormClearErrors } from "react-hook-form";
import { SendInputData } from "../../../../controller/send.controller";

export const useParseChartDrawData = (
    formData: SendInputData,
    lengthAndWidthMax: number,
    errorHandler: UseFormSetError<SendInputData>,
    clearError: UseFormClearErrors<SendInputData>
): SendInputData => {
    const [parsedFormData, setParsedFormData] = useState<typeof formData>({
        pl: "",
        pw: "",
        sl: "",
        sw: "",
    });

    useEffect(() => {
        Object.keys(formData).forEach((key) => {
            const typedKey = key as keyof typeof formData;
            const dataValue = formData[typedKey];

            if (+dataValue <= lengthAndWidthMax) {
                setParsedFormData((prev) => ({
                    ...prev,
                    [typedKey]: dataValue,
                }));
                clearError(typedKey);
            } else errorHandler(typedKey, { type: "max" });
        });
    }, [formData.pl, formData.pw, formData.sl, formData.sw]);

    const chartDrawData = {
        ...parsedFormData,
        pl:
            +parsedFormData.pl > +parsedFormData.sl
                ? parsedFormData.sl
                : parsedFormData.pl,
        pw:
            +parsedFormData.pw > +parsedFormData.sw
                ? parsedFormData.sw
                : parsedFormData.pw,
    };

    return chartDrawData;
};
