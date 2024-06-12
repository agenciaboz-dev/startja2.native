import React from "react"
import { Platform, Pressable, TouchableOpacity, View } from "react-native"
import { Text } from "react-native-paper"
import { colors } from "../../style/colors"
import { Link, NavigationProp, useNavigation } from "@react-navigation/native"
import { LinkButton } from "../../components/LinkButton"

interface LinksComponentProps {}

export const LinksComponent: React.FC<LinksComponentProps> = ({}) => {
    return (
        <View
            style={[{ flexDirection: "row", justifyContent: "space-between" }, Platform.OS == "web" ? { marginVertical: 20 } : { marginTop: "auto" }]}
        >
            <LinkButton to="/login">Esqueci minha senha</LinkButton>
            <LinkButton to="/budget">Não sou cliente</LinkButton>
        </View>
    )
}
