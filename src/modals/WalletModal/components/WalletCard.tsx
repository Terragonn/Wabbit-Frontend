import { Group, Image, Text, UnstyledButton } from "@mantine/core";

export default function WalletCard({ name, imgURL, onClick }: { name: string; imgURL: string; onClick: () => void }) {
    return (
        <UnstyledButton
            onClick={onClick}
            mb="md"
            sx={(theme) => ({
                display: "block",
                width: "100%",
                padding: theme.spacing.xs,
                borderRadius: theme.radius.sm,
                color: theme.colors.dark[0],
                backgroundColor: theme.colors.dark[6],

                "&:hover": {
                    backgroundColor: theme.colors.dark[5],
                },
            })}
        >
            <Group position="apart" p="sm">
                <Text size="xl" weight={700}>
                    {name}
                </Text>
                <Image width={50} radius="md" src={imgURL} alt={name} />
            </Group>
        </UnstyledButton>
    );
}
