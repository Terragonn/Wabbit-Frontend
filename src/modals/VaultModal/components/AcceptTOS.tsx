import { Anchor, Checkbox, Text } from "@mantine/core";

export default function AcceptTOS({ checked, onChange }: { checked: boolean; onChange?: (x: boolean) => void }) {
    return (
        <Checkbox
            checked={checked}
            onChange={(event) => onChange && !checked && onChange(event.currentTarget.checked)}
            color="grape"
            label={
                <Text size="md" align="right">
                    I have read and agreed to the{" "}
                    <Anchor href="https://docs.torque.money" underline={false}>
                        <Text color="grape" component="span">
                            terms and conditions
                        </Text>
                    </Anchor>
                    .
                </Text>
            }
        ></Checkbox>
    );
}
