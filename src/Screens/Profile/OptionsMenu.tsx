import React from "react"
import { Platform, SectionList, StyleProp, View, ViewStyle } from "react-native"
import { Divider, Surface, Text } from "react-native-paper"
import { OptionItemMenu } from "./OptionItemMenu"

interface OptionsMenuProps {
    style?: StyleProp<ViewStyle>
}

export const OptionsMenu: React.FC<OptionsMenuProps> = ({ style }) => {
    const section1 = [{ title: "Configurações Admin. Master", data: [{ option: "Minha Conta" }, { option: "Usuários" }] }]
    const section2 = [{ title: "Configurações Globais", data: [{ option: "Produtos" }, { option: "Natureza de Operação" }] }]

    return (
        <View
            style={[
                { width: 210, alignSelf: "flex-end", paddingTop: 100, paddingHorizontal: 10 },
                Platform.OS !== "web" && { width: "100%", alignSelf: "center", paddingTop: 0, paddingHorizontal: 0 },
                style,
            ]}
        >
            <View style={[{ maxWidth: 200, gap: 15 }, Platform.OS !== "web" && { maxWidth: "100%", gap: 20 }]}>
                <OptionItemMenu section={section1} />
                <Divider />
                <OptionItemMenu section={section2} />
            </View>
        </View>
    )
}
