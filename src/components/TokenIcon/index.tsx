import { Image } from "@mantine/core";

export default function TokenIcon({ name, src, width }: { name: string; src: string; width: number }) {
    return <Image src={src} alt={name} width={width} radius="xl" />;
}
