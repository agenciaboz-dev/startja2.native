import React from "react"
import { View } from "react-native"
import { Text } from "react-native-paper"
import { TextInputLabelProp } from "react-native-paper/lib/typescript/components/TextInput/types"

interface LabeledComponentProps {
    label: TextInputLabelProp
    Component: React.ReactNode
    marginBottom?: number
    orientation?: "vertical" | "horizontal"
    reverse?: boolean
}

export const LabeledComponent: React.FC<LabeledComponentProps> = ({ label, Component, marginBottom, orientation = "vertical", reverse }) => {
    return (
        <View
            style={[
                orientation == "horizontal" && { flexDirection: "row", alignItems: "center" },
                reverse && {
                    flexDirection: orientation == "horizontal" ? "row-reverse" : "column-reverse",
                    justifyContent: "flex-start",
                },
            ]}
        >
            <Text variant="bodySmall" style={[{ marginLeft: 5, marginBottom }]}>
                {label}
            </Text>
            {Component}
        </View>
    )
}
