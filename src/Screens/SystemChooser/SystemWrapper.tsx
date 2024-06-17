import React, { useState } from "react"
import { LayoutAnimation, View } from "react-native"
import { SystemComponentProp } from "../../types/SystemComponentProp"
import { Button, List, Surface, Text, useTheme } from "react-native-paper"
import { SystemContainer } from "./SystemContainer"
import { colors } from "../../style/colors"

interface SystemWrapperProps {
    name: string
    systems: SystemComponentProp[]
}

export const SystemWrapper: React.FC<SystemWrapperProps> = ({ name, systems }) => {
    const theme = useTheme()

    const [expanded, setExpanded] = useState(true)

    const onAccordionPress = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        setExpanded((value) => !value)
    }

    return (
        <Surface style={[]}>
            <List.Accordion
                title={
                    <View style={[{ flexDirection: "row", justifyContent: "space-between" }]}>
                        <Text style={[{ fontWeight: "bold", color: colors.grey }]}>{name}</Text>
                        {systems.length > 1 && <View style={[{ flexDirection: "row" }]}></View>}
                    </View>
                }
                expanded={expanded}
                onPress={onAccordionPress}
            >
                <Surface style={[{ padding: 20 }]}>
                    {systems.map((item) => (
                        <SystemContainer key={item.route} name={item.name} route={item.route} />
                    ))}
                </Surface>
            </List.Accordion>
        </Surface>
    )
}
