import { Box, Group } from "@mantine/core";
import { Token } from "../../TokenData";

export default function Overlap({ token }: { token: Token[] }) {
    return (
        <Group>
            {token.map((tkn) => (
                <Box sx={{ margin: "-4px" }}>{tkn.icon}</Box>
            ))}
        </Group>
    );
}
