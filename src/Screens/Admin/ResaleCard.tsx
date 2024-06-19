import React from "react"
import { View } from "react-native"
import { Button, Surface, Text } from "react-native-paper"
import { colors } from "../../style/colors"
import { Resale } from "../../types/server/class/Resale"

interface ResaleCardProps {
    resale: Resale
    onPress: (resale: Resale) => void
}

export const ResaleCard: React.FC<ResaleCardProps> = ({ resale, onPress }) => {
    return (
        <View>
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
                <Text>{resale.name}</Text>
                <Button onPress={() => onPress(resale)}>Acessar</Button>
            </View>
        </View>
    )
}
