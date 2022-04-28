import { Box, Group } from "@mantine/core";

import { Token } from ".";

export function Overlap({ token }: { token: Token[] }) {
    return (
        <Group>
            {token.map((tkn, index) => {
                const margin = index === 0 ? 0 : -30;

                return (
                    <Box style={{ margin }} key={index}>
                        {tkn.icon(40)}
                    </Box>
                );
            })}
        </Group>
    );
}
