import React from "react"
import { View } from "react-native"
import { Button, Surface, Text, useTheme } from "react-native-paper"
import { SystemComponentProp } from "../../types/SystemComponentProp"
import { useLinkTo } from "@react-navigation/native"

export const SystemContainer: React.FC<SystemComponentProp> = ({ name, route }) => {
    const theme = useTheme()
    const linkTo = useLinkTo()

    const onPress = () => {
        linkTo(route)
    }

    return (
        <View
            style={[
                {
                    flexDirection: "row",
                    padding: 10,
                    backgroundColor: theme.colors.background,
                    borderRadius: 5,
                    justifyContent: "space-between",
                    alignItems: "center",
                },
            ]}
        >
            <Text>{name}</Text>
            <Button labelStyle={[{ fontWeight: "bold" }]} onPress={onPress}>
                Gerenciar conta
            </Button>
        </View>
    )
}
