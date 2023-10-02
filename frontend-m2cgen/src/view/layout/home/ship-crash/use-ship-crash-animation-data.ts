// Copyright 2022 Cartesi Pte. Ltd.

// Licensed under the Apache License, Version 2.0 (the "License"); you may not use
// this file except in compliance with the License. You may obtain a copy of the
// License at http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software distributed
// under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
// CONDITIONS OF ANY KIND, either express or implied. See the License for the
// specific language governing permissions and limitations under the License.

import { HTMLMotionProps } from "framer-motion";
import { useEffect, useLayoutEffect, useState } from "react";
import { UseServiceState } from "../../../../controller/use-service/use-service.hook";
import { genTimerPromise } from "../../../../utils/timer-promise";
import {
    SHIP_INITIAL_X,
    PIXEL_DIVISOR,
    BREAKPOINT,
    RESOLVED_REQUEST_TRANSITION_DURATION,
} from "./constants";

interface UseShipCrashAnimationDataReturn {
    shipMotion: HTMLMotionProps<"div">;
    icebergMotion: HTMLMotionProps<"div">;
    status: "idle" | "pending" | "ready";
}
const initialShipMotionProps: HTMLMotionProps<"div"> = {
    initial: {
        x: -SHIP_INITIAL_X,
        y: -14,
    },
    animate: {
        x: 30,
    },
    transition: {
        duration: 60,
        repeat: Infinity,
    },
};
const initialIcebergMotionProps: HTMLMotionProps<"div"> = {
    initial: {
        x: 20,
        y: 22,
    },
};
const getShipResponsiveX = (breakpoint: number, size: number) =>
    (size * SHIP_INITIAL_X) / breakpoint -
    (breakpoint - size) /
        (size > breakpoint
            ? PIXEL_DIVISOR * (1 + (breakpoint - size))
            : PIXEL_DIVISOR);

export const useShipCrashAnimationData = (
    requestStatus: UseServiceState<any>["status"]
): UseShipCrashAnimationDataReturn => {
    const [status, setStatus] =
        useState<UseShipCrashAnimationDataReturn["status"]>("idle");
    const [shipMotion, setShipMotion] = useState(() => initialShipMotionProps);

    useLayoutEffect(() => {
        if (requestStatus === "pending") {
            const updateShipMotion = async () => {
                setStatus("pending");
                await genTimerPromise(1000);
                setShipMotion((prev) => {
                    const { innerWidth } = window;
                    const breakpointFallback =
                        innerWidth < BREAKPOINT.MOBILE
                            ? BREAKPOINT.MOBILE
                            : BREAKPOINT.DESKTOP;

                    const newShipMotion =
                        typeof prev.initial === "object"
                            ? {
                                  ...prev,
                                  initial: {
                                      ...prev.initial,
                                      x: -getShipResponsiveX(
                                          breakpointFallback,
                                          innerWidth
                                      ),
                                  },
                              }
                            : {};
                    return newShipMotion;
                });
                setStatus("ready");
            };
            window.addEventListener("resize", updateShipMotion);
            updateShipMotion();

            return () => window.removeEventListener("resize", updateShipMotion);
        }
    }, [requestStatus]);

    useEffect(() => {
        if (requestStatus === "resolved") {
            setStatus("pending");
            setShipMotion((prev) => {
                const newShipMotion =
                    typeof prev.initial === "object"
                        ? {
                              ...prev,
                              animate: {
                                  x: 50,
                              },
                              transition: {
                                  duration:
                                      RESOLVED_REQUEST_TRANSITION_DURATION,
                              },
                          }
                        : {};
                return newShipMotion;
            });
            setStatus("ready");
        }
    }, [requestStatus]);

    return {
        shipMotion,
        icebergMotion: initialIcebergMotionProps,
        status,
    };
};
