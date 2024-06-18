import React, { useState } from "react"
import { LayoutAnimation, View } from "react-native"
import { User } from "../../types/server/class"
import { IconButton, List, Text, useTheme } from "react-native-paper"
import { ManagerFormModal } from "./ManagerFormModal"
import { Resale } from "../../types/server/class/Resale"

interface ManagersContainerProps {
    managers: User[]
    resale: Resale
    onAddManager: (user: User) => void
}

export const ManagersContainer: React.FC<ManagersContainerProps> = ({ managers, resale, onAddManager }) => {
    const theme = useTheme()
    const [expanded, setExpanded] = useState(true)
    const [showManagerForm, setShowManagerForm] = useState(false)

    const onPress = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        setExpanded((value) => !value)
    }

    return (
        <View style={[{ marginHorizontal: -20 }]}>
            <List.Accordion
                style={[{ backgroundColor: theme.colors.elevation.level1 }]}
                expanded={expanded}
                title={
                    <View style={[{ flexDirection: "row", alignItems: "center" }]}>
                        <IconButton icon={expanded ? "chevron-up" : "chevron-down"} style={{ margin: 0 }} />
                        <Text variant="labelLarge">Administradores da revenda</Text>
                    </View>
                }
                onPress={onPress}
                pointerEvents="box-none"
                right={(expanded) => <IconButton icon="plus" style={{ margin: 0 }} onPress={() => setShowManagerForm(true)} />}
            >
                <View style={[{ paddingHorizontal: 30 }]}>
                    {managers.map((item) => (
                        <Text variant="labelLarge" key={item.id}>
                            {item.name}
                        </Text>
                    ))}
                </View>
            </List.Accordion>

            <ManagerFormModal visible={showManagerForm} onDismiss={() => setShowManagerForm(false)} resale={resale} onFinish={onAddManager} />
        </View>
    )
}
