import React from "react"
import { View } from "react-native"
import { Button, Icon, IconButton, Surface, Text } from "react-native-paper"
import { ButtonWithIcon } from "./ButtonWithIcon"
import { colors } from "../../style/colors"

interface TollBarControlsProps {}

export const TollBarControls: React.FC<TollBarControlsProps> = ({}) => {
    return (
        <View style={{ flex: 1, flexDirection: "row", gap: 20, alignItems: "center" }}>
            <Button mode="contained" style={{ height: 40, padding: 0 }}>
                Emissao de nota fiscal
            </Button>
            <ButtonWithIcon text="Cadastros gerais" />
            <ButtonWithIcon text="Relatórios" />
            <IconButton icon="poll" mode="contained" containerColor={colors.primary} iconColor={colors.box} />
            <IconButton icon="cog" mode="contained" containerColor={colors.primary} iconColor={colors.box} />
        </View>
    )
}
