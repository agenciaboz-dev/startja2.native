import React from "react"
import { View } from "react-native"
import { Button, Surface, Text } from "react-native-paper"
import { colors } from "../../style/colors"
import { Resale } from "../../types/server/class/Resale"

interface ResaleCardProps {
    resale: Resale
}

export const ResaleCard: React.FC<ResaleCardProps> = ({ resale }) => {
    return (
        <View>
            <Text>{resale.name}</Text>
            <View
                style={[
                    {
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: colors.disabled,
                        paddingLeft: 10,
                        borderRadius: 5,
                    },
                ]}
            >
                <Text>[Cliente]</Text>
                <Button>Acessar</Button>
            </View>
        </View>
    )
}
