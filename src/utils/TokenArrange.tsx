import { Box, Group } from "@mantine/core";

import { Token } from ".";
import { TokenIcon } from "../components";

// Show tokens overlapped (typically for LP tokens)
export function Overlap({ token }: { token: Token[] }) {
    return (
        <Group>
            {token.map((tkn, index) => {
                const margin = index === 0 ? 0 : -28;

                return (
                    <Box style={{ margin }} key={index}>
                        <TokenIcon name={tkn.name} src={tkn.icon} width={36} />
                    </Box>
                );
            })}
        </Group>
    );
}
