import { Box, Group } from "@mantine/core";

import { Token } from ".";

export function Overlap({ token }: { token: Token[] }) {
    return (
        <Group>
            {token.map((tkn, index) => {
                const margin = index === 0 ? 0 : -28;

                return (
                    <Box style={{ margin }} key={index}>
                        {tkn.icon(36)}
                    </Box>
                );
            })}
        </Group>
    );
}
