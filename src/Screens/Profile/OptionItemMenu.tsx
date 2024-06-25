import React, { useState } from "react"
import { Pressable, View } from "react-native"
import { Surface, Text, TouchableRipple } from "react-native-paper"
import { colors } from "../../style/colors"

interface OptionItemMenuProps {
    section: {
        title: string
        data: {
            option: string
        }[]
    }[]
}

export const OptionItemMenu: React.FC<OptionItemMenuProps> = ({ section }) => {
    const [hoverStates, setHoverStates] = useState<{ [key: string]: boolean }>({})

    const handleMouseEnter = (key: string) => {
        setHoverStates((prev) => ({ ...prev, [key]: true }))
    }

    const handleMouseLeave = (key: string) => {
        setHoverStates((prev) => ({ ...prev, [key]: false }))
    }

    return (
        <View>
            {section.map((option) => (
                <View key={option.title} style={{ gap: 2 }}>
                    <Text style={{ color: colors.grey, marginBottom: 5 }}>{option.title}</Text>
                    {option.data.map((item) => (
                        <TouchableRipple
                            key={item.option}
                            onPress={() => console.log("teste")}
                            onHoverIn={() => handleMouseEnter(`${item.option}`)}
                            onHoverOut={() => handleMouseLeave(`${item.option}`)}
                            style={[
                                { paddingVertical: 5, paddingLeft: 5, borderRadius: 5 },
                                hoverStates[`${item.option}`] && { borderColor: colors.primary, borderWidth: 1, paddingVertical: 4, paddingLeft: 4 },
                            ]}
                        >
                            <Text>{item.option}</Text>
                        </TouchableRipple>
                    ))}
                </View>
            ))}
        </View>
    )
}
