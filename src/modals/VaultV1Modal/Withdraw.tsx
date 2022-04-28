import { Box, Button, Group, Slider, Text } from "@mantine/core";

export default function Withdraw() {
    return (
        <>
            <Group grow mt="lg" direction="column">
                <Box mb="lg">
                    <Slider
                        marks={[
                            { value: 20, label: "20%" },
                            { value: 50, label: "50%" },
                            { value: 80, label: "80%" },
                        ]}
                        color="pink"
                    />
                </Box>
                <Button variant="gradient" size="lg" gradient={{ from: "pink", to: "grape", deg: 45 }}>
                    Withdraw
                </Button>
            </Group>
        </>
    );
}
