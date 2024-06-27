import React from "react"
import { View } from "react-native"
import { Customer } from "../../types/server/class/Customer"
import { Button, Surface, Text } from "react-native-paper"
import { Image } from "expo-image"
import { TwoButtonsView } from "../../components/TwoButtonsView"

interface CustomerComponentProps {
    // customer: Customer
}

export const CustomerComponent: React.FC<CustomerComponentProps> = ({}) => {
    return (
        <Surface style={[{ padding: 10, gap: 10 }]}>
            <View style={[{ flexDirection: "row", gap: 10 }]}>
                <Surface style={{ borderRadius: 10 }}>
                    <Image
                        source={require("../../../assets/icon.png")}
                        contentFit="cover"
                        style={[{ height: 50, aspectRatio: 1, borderRadius: 10 }]}
                    />
                </Surface>

                <View style={[{ justifyContent: "space-between" }]}>
                    <Text variant="labelSmall">Acessado a [tempo] por [usuário]</Text>
                    <Text variant="bodyLarge">Nome do cliente</Text>
                </View>
            </View>
            <Text>CPF: 000.000.000/00</Text>
            <Text>Cidade/UF</Text>
            <Text>Certificado digital expira em 00/00</Text>
            <Text>cliente@email.com</Text>
            <Text>00 0 0000-0000</Text>

            <TwoButtonsView>
                <Button mode="contained" compact>
                    Acessar sistema
                </Button>
                <Button mode="outlined" compact>
                    Sem pendências
                </Button>
            </TwoButtonsView>
        </Surface>
    )
}
