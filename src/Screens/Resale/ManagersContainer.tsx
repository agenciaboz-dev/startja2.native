import React, { useState } from "react"
import { View } from "react-native"
import { User } from "../../types/server/class"
import { Text } from "react-native-paper"
import { ManagerFormModal } from "./ManagerFormModal"
import { Resale } from "../../types/server/class/Resale"
import { ResaleAccordion } from "./ResaleAccordion"

interface ManagersContainerProps {
    managers: User[]
    resale: Resale
    onAddManager: (user: User) => void
}

export const ManagersContainer: React.FC<ManagersContainerProps> = ({ managers, resale, onAddManager }) => {
    const [showManagerForm, setShowManagerForm] = useState(false)

    return (
        <View style={[{ marginHorizontal: -20 }]}>
            <ResaleAccordion
                title="Administradores da revenda"
                onAddIconPress={() => setShowManagerForm(true)}
                modal={
                    <ManagerFormModal visible={showManagerForm} onDismiss={() => setShowManagerForm(false)} resale={resale} onFinish={onAddManager} />
                }
            >
                <View style={{ gap: 10 }}>
                    {managers.map((item) => (
                        <Text variant="labelLarge" key={item.id}>
                            {item.name}
                        </Text>
                    ))}
                </View>
            </ResaleAccordion>
        </View>
    )
}
