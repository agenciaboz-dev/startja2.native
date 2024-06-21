import React, { useState } from "react"
import { LayoutAnimation, StyleProp, View, ViewStyle } from "react-native"
import { SystemComponentProp } from "../../types/SystemComponentProp"
import { Button, List, Surface, Text, useTheme } from "react-native-paper"
import { SystemContainer } from "./SystemContainer"
import { colors } from "../../style/colors"
import { Style } from "react-native-paper/lib/typescript/components/List/utils"
import { SearchComponent } from "../../components/Tools/SearchComponent"
import { SortComponent } from "../../components/Tools/SortComponent"
import { ExpandButton } from "../../components/Tools/ExpandButton"

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
                right={() => (
                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <SearchComponent placeholder="Procurar por nome" />
                        <SortComponent title="Ordenar" style={{ paddingRight: 10 }} />
                        <ExpandButton onPress={onAccordionPress} />
                    </View>
                )}
                expanded={expanded}
                // onPress={onAccordionPress}
                style={{}}
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
