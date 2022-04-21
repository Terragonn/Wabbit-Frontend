import { Badge, Box, Container, Divider, Group, Modal, Text } from "@mantine/core";
import Overlap from "../../../utils/TokenArrange/Overlap";
import TokenData from "../../../utils/TokenData";

export default function VaultV1({ name, description, tags, color }: { name: string; description: string; tags?: string[]; color: string }) {
    // **** I need some way of getting a list of tokens that the user can use
    // **** When they click on the vault it will toggle the modal which will show all of the options they have to interact with the vault
    // **** Should also be some sort of agreement

    return (
        <>
            {/* <Modal></Modal> */}

            <Container
                p="xl"
                mb="md"
                sx={(theme) => ({
                    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[1],
                    border: `2px solid ${theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]}`,
                    borderRadius: theme.radius.md,
                    cursor: "pointer",

                    "&:hover": {
                        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2],
                        border: `2px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]}`,
                    },
                })}
            >
                <Overlap token={[TokenData.FTM, TokenData.USDC]} />
                <Box
                    mt="md"
                    pb="md"
                    sx={(theme) => ({
                        borderBottom: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]}`,
                    })}
                >
                    <Text size="xl" weight={700}>
                        {name}
                    </Text>
                    <Group mt="sm">{tags && tags.map((tag) => <Badge color={color}>{tag}</Badge>)}</Group>
                    <Text mt="sm" color="dimmed" size="md">
                        {description}
                    </Text>
                </Box>
            </Container>
        </>
    );
}
