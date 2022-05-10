import { Box, Group } from "@mantine/core";

import { Token } from "..";
import { TokenIcon } from "../../components";

// Show tokens overlapped (typically for LP tokens)
export function Overlap({ token }: { token: Token[] }) {
    return (
        <Group>
            {token.map((tkn, index) => {
                const margin = index !== token.length - 1 ? -26 : 0;

                return (
                    <Box style={{ marginRight: margin }} key={index}>
                        <TokenIcon name={tkn.name} src={tkn.icon} width={32} />
                    </Box>
                );
            })}
        </Group>
    );
}
