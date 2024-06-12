import React from "react"
import { Platform, Pressable, TouchableOpacity, View } from "react-native"
import { Text } from "react-native-paper"
import { colors } from "../../style/colors"

interface LinksComponentProps {}

const TextLink: React.FC<{ text: string; route: string }> = ({ text, route }) => {
    return (
        <TouchableOpacity onPress={() => console.log(route)}>
            <Text variant="titleSmall" style={{ color: colors.primary, fontWeight: "bold" }}>
                {text}
            </Text>
        </TouchableOpacity>
    )
}

export const LinksComponent: React.FC<LinksComponentProps> = ({}) => {
    return (
        <View style={[{ flexDirection: "row", justifyContent: "space-between" }, Platform.OS != "web" && { marginTop: "auto" }]}>
            <TextLink text="Esqueci minha senha" route="" />
            <TextLink text="Não sou cliente" route="" />
        </View>
    )
}
