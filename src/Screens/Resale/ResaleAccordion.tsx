import React, { useState } from "react"
import { LayoutAnimation, Platform, View } from "react-native"
import { IconButton, List, Text, useTheme } from "react-native-paper"

interface ResaleAccordionProps {
    title: string
    onAddIconPress: () => void
    children?: React.ReactNode
    modal?: React.ReactNode
}

export const ResaleAccordion: React.FC<ResaleAccordionProps> = ({ title, onAddIconPress, children, modal }) => {
    const theme = useTheme()

    const [expanded, setExpanded] = useState(true)

    const onPress = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        setExpanded((value) => !value)
    }

    return (
        <List.Accordion
            style={[{ backgroundColor: theme.colors.elevation.level1 }]}
            expanded={expanded}
            title={
                <View style={[{ flexDirection: "row", alignItems: "center" }]}>
                    <IconButton icon={expanded ? "chevron-up" : "chevron-down"} style={{ margin: 0 }} />
                    <Text variant="labelLarge">{title}</Text>
                </View>
            }
            onPress={onPress}
            pointerEvents="box-none"
            right={() => (expanded ? <IconButton icon="plus" style={{ margin: 0 }} onPress={onAddIconPress} /> : null)}
        >
            <View style={[{ paddingHorizontal: 30 }, Platform.OS !== "web" && expanded && { paddingBottom: 20 }]}>{children}</View>
            {modal}
        </List.Accordion>
    )
}
