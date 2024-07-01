import React from "react"
import { Platform, View } from "react-native"
import { Avatar, IconButton, Surface, Text } from "react-native-paper"
import { colors } from "../../style/colors"
import placeholders from "../../components/Tools/placeholders"
import { TollBarControls } from "./ToolbarControls"

interface ClienteHeaderToolbarProps {}

export const ClienteHeaderToolbar: React.FC<ClienteHeaderToolbarProps> = ({}) => {
    return (
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderColor: "#ff0000", borderWidth: 1 }}>
            <View style={[{ flexDirection: "row", alignItems: "center" }, Platform.OS === "web" ? {} : {}]}>
                <Text variant="headlineSmall" ellipsizeMode="tail" numberOfLines={1} style={[{ fontWeight: "bold", color: colors.grey }]}>
                    [Nome do Cliente]
                </Text>
                <IconButton icon={"chevron-down"} onPress={() => console.log} />
            </View>
            <View style={{ flexDirection: "row", gap: 20 }}>
                <View>
                    <TollBarControls />
                </View>
                <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
                    <View>
                        <Text>[Nome do Cliente / Convidado]</Text>
                        <Text>CPF: 000.000.000-00</Text>
                        <Text>Cidade/UF</Text>
                    </View>
                    <Surface style={{ borderRadius: 50 }}>
                        <Avatar.Image source={placeholders.user} />
                    </Surface>
                </View>
            </View>
        </View>
    )
}
