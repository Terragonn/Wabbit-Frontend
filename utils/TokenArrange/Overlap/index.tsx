import { Box } from "@mantine/core";
import { Token } from "../../TokenData";

export default function Overlap({ token }: { token: Token[] }) {
    return (
        <>
            {token.map((tkn) => (
                <Box sx={{ margin: "-4px" }}>tkn.icon</Box>
            ))}
        </>
    );
}
