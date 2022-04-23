import { Box, Group } from "@mantine/core";
import { Token } from "./TokenData";

export function Overlap({ token }: { token: Token[] }) {
    return (
        <Group>
            {token.map((tkn, index) => {
                const margin = index === 0 ? 0 : -24;

                return (
                    <Box style={{ margin }} key={index}>
                        {tkn.icon}
                    </Box>
                );
            })}
        </Group>
    );
}
