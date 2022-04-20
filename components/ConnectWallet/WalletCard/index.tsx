import { Group, Image, Text, UnstyledButton } from "@mantine/core";

export default function WalletCard({ name, imgURL, onClick }: { name: string; imgURL: string; onClick: () => void }) {
    return (
        <UnstyledButton
            onClick={onClick}
            mt={24}
            sx={(theme) => ({
                display: "block",
                width: "100%",
                padding: theme.spacing.xs,
                borderRadius: theme.radius.sm,
                color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

                "&:hover": {
                    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
                },
            })}
        >
            <Group position="apart" p="md">
                <Text size="xl" weight={700}>
                    {name}
                </Text>
                <Image width={50} radius="md" src={imgURL} alt={name} />
            </Group>
        </UnstyledButton>
    );
}
