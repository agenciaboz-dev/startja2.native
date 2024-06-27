import React, { useState } from "react"
import { Platform, View } from "react-native"
import { Button, Modal, Portal, Surface, Text } from "react-native-paper"
import { colors } from "../../style/colors"

const Btn: React.FC<{ text: string; onPress?: () => void }> = ({ text, onPress = () => console.log("clicou") }) => {
    const [hover, setHover] = useState(false)

    return (
        <Button
            mode="outlined"
            style={[{ width: "100%", alignItems: "flex-start", borderRadius: 5 }, hover && { borderWidth: 1, borderColor: colors.primary }]}
            onPointerEnter={() => setHover(true)}
            onPointerLeave={() => setHover(false)}
            onPressIn={() => setHover(true)}
            onPress={onPress}
        >
            <Text>{text}</Text>
        </Button>
    )
}

interface SortMenuProps {}

export const SortMenu: React.FC<SortMenuProps> = () => {
    return (
        <View
            style={[
                {
                    backgroundColor: colors.box,
                    alignSelf: "center",
                    padding: 20,
                    borderRadius: 10,
                },
                Platform.OS == "web" && {},
                Platform.OS !== "web" && {},
            ]}
        >
            <View style={{ gap: 20 }}>
                <View style={{ gap: 5 }}>
                    <Text style={{ marginBottom: 5 }}>Ordenação</Text>
                    <Btn text="A - Z" />
                    <Btn text="Z - A" />
                </View>
                <View style={{ gap: 5 }}>
                    <Text style={{ marginBottom: 5 }}>Filtros</Text>
                    <Btn text="Sem Pendências" />
                    <Btn text="Certificado Vencendo" />
                    <Btn text="Documentos não processados" />
                    <Btn text="Inativos" />
                    <Btn text="Não emitidas" />
                </View>
            </View>
        </View>
    )
}
