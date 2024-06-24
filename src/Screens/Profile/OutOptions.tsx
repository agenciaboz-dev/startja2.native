import React, { useState } from "react"
import { Pressable, StyleProp, Touchable, View, ViewStyle } from "react-native"
import { Icon, Surface, Text, TouchableRipple } from "react-native-paper"
import { colors } from "../../style/colors"

interface OutOptionsProps {
    style?: StyleProp<ViewStyle>
}

export const OutOptions: React.FC<OutOptionsProps> = ({ style }) => {
    const options = [
        { option: "Gestão de Contas", icon: "logout" },
        { option: "Sair", icon: "logout" },
    ]

    // Estado para gerenciar hover de cada item usando um objeto
    const [hoverStates, setHoverStates] = useState<{ [key: string]: boolean }>({})

    // Handler para definir hover
    const handleMouseEnter = (key: string) => {
        setHoverStates((prev) => ({ ...prev, [key]: true }))
    }

    // Handler para limpar hover
    const handleMouseLeave = (key: string) => {
        setHoverStates((prev) => ({ ...prev, [key]: false }))
    }

    return (
        <View style={[{ width: 210, alignSelf: "flex-end", paddingHorizontal: 10 }, style]}>
            {options.map((option) => (
                <TouchableRipple
                    onPress={() => console.log("teste")}
                    style={{}}
                    onHoverIn={() => handleMouseEnter(`${option.option}`)}
                    onHoverOut={() => handleMouseLeave(`${option.option}`)}
                >
                    <View
                        style={[
                            { maxWidth: 200, gap: 10, flexDirection: "row", paddingVertical: 5, paddingLeft: 5, borderRadius: 5 },
                            hoverStates[`${option.option}`] && {
                                borderColor: colors.primary,
                                borderWidth: 1,
                                paddingVertical: 4,
                                paddingLeft: 4,
                            },
                        ]}
                    >
                        <Icon size={20} source={option.icon}></Icon>
                        <Text>{option.option}</Text>
                    </View>
                </TouchableRipple>
            ))}
        </View>
    )
}
