import React from "react"
import { View, ViewStyle } from "react-native"
import { Text } from "react-native-paper"

interface UserDataProps {
    title: string
    value: string
    style?: ViewStyle
}

export const UserData: React.FC<UserDataProps> = ({ title, value, style }) => {
    return (
        <View style={style}>
            <Text>{title}</Text>
            <Text variant="titleLarge" numberOfLines={1} style={{ fontWeight: "bold" }}>
                {value}
            </Text>
        </View>
    )
}
