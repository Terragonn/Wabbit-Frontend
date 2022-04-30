import { Anchor, Box, Checkbox, Text } from "@mantine/core";
import Link from "next/link";

export default function AcceptTOS({ onChange }: { onChange?: (x: boolean) => void }) {
    return (
        <Box
            pt="md"
            sx={(theme) => ({
                borderTop: `1px solid ${theme.colors.dark[4]}`,
            })}
        >
            <Checkbox
                onChange={(event) => onChange && onChange(event.currentTarget.checked)}
                color="grape"
                label={
                    <Text size="md" align="right">
                        I have read and agreed to the{" "}
                        <Anchor href="https://docs.torque.money" component={Link}>
                            terms and conditions
                        </Anchor>
                        .
                    </Text>
                }
            ></Checkbox>
        </Box>
    );
}
