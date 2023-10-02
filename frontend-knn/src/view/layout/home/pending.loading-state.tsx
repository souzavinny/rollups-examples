// Copyright 2022 Cartesi Pte. Ltd.

// Licensed under the Apache License, Version 2.0 (the "License"); you may not use
// this file except in compliance with the License. You may obtain a copy of the
// License at http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software distributed
// under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
// CONDITIONS OF ANY KIND, either express or implied. See the License for the
// specific language governing permissions and limitations under the License.

import { motion } from "framer-motion";
import { FC } from "react";
import { emoji } from "../../atomic/emoji.atm";

export const PengindLoadingState: FC = () => (
    <motion.div
        style={{
            display: "flex",
            justifyContent: "center",
        }}
        initial={{ opacity: 0, scale: 0.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
            duration: 2,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
            repeat: Infinity,
        }}
    >
        <label
            style={{
                fontSize: "10rem",
            }}
        >
            {emoji.magnifyingGlassTiltedRight}
        </label>
    </motion.div>
);
