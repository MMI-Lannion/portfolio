import { $competencesCles } from "@/store/Store";
import { useStore } from "@nanostores/react";
import { Text, Flex } from "@radix-ui/themes";

export function ListCompetencesCles() {
    const ListCompetences = useStore($competencesCles);

    return (
        <>
            {ListCompetences.competence_cles.map((comp, index) => (
                <Flex key={index}>
                    <input
                        type="checkbox"
                        checked={comp.checked}// Passez une fonction fléchée
                    />
                    <Text>{comp.name}</Text>
                </Flex>
            ))}
        </>
    );
}
