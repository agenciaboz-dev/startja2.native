import React from "react"
import { View } from "react-native"
import { colors } from "../../style/colors"
import { BottomNavButton } from "./BottomNavButton"
import { useLinkTo } from "@react-navigation/native"

interface BottomNavProps {}

export const BottomNav: React.FC<BottomNavProps> = ({}) => {
    const linkTo = useLinkTo()

    return (
        <View
            style={{
                flexDirection: "row",
                position: "static",
                backgroundColor: colors.dark,
                height: 80,
                width: "100%",
                justifyContent: "space-evenly",
                alignItems: "center",
            }}
        >
            <BottomNavButton icon="view-grid-outline" title="Home" onPress={() => linkTo("/selecionar-sistema")} />
            <BottomNavButton icon="account-circle" title="Minha Conta" onPress={() => linkTo("/admin")} />
            <BottomNavButton icon="account" title="Cliente" onPress={() => linkTo("/profile")} />
        </View>
    )
}
