import React from "react"
import { StyleProp, View, ViewStyle } from "react-native"
import { Button, Icon, IconButton, Surface, Text, useTheme } from "react-native-paper"
import { colors } from "../../style/colors"

interface SortComponentProps {
    title?: string
    style?: StyleProp<ViewStyle>
}

export const SortComponent: React.FC<SortComponentProps> = ({ title, style }) => {
    return title ? (
        <Button
            icon="swap-vertical"
            onPress={() => console.log("clicou no sort")}
            style={[
                {
                    backgroundColor: "white",
                    borderColor: colors.grey,
                    borderWidth: 1,
                    borderRadius: 5,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "auto",
                },
                style,
            ]}
        >
            {title}
        </Button>
    ) : (
        <IconButton
            icon="swap-vertical"
            iconColor={colors.primary}
            style={{ borderColor: colors.grey, borderWidth: 1, borderRadius: 5 }}
            onPress={() => console.log("clicou no sort")}
        />
    )
}


