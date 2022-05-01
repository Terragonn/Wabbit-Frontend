import { Anchor, Checkbox, Text } from "@mantine/core";
import Link from "next/link";

export default function AcceptTOS({ checked, onChange }: { checked: boolean; onChange?: (x: boolean) => void }) {
    return (
        <Checkbox
            checked={checked}
            onChange={(event) => onChange && !checked && onChange(event.currentTarget.checked)}
            color="grape"
            label={
                <Text size="md" align="right">
                    I have read and agreed to the{" "}
                    <Anchor href="https://docs.torque.money" component={Link}>
                        <Text color="grape" component="span" sx={() => ({ cursor: "pointer" })}>
                            terms and conditions
                        </Text>
                    </Anchor>
                    .
                </Text>
            }
        ></Checkbox>
    );
}
