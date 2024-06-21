import React from "react"
import { View } from "react-native"
import { Resale } from "../../types/server/class/Resale"
import { Surface, TouchableRipple } from "react-native-paper"
import { Image } from "expo-image"
import { ActiveIndicator } from "./ActiveIndicator"
import { colors } from "../../style/colors"
import placeholders from "../../components/Tools/placeholders"

interface ResaleComponentProps {
    resale: Resale
    active?: boolean
    icon_size: number
    onPress: (resale: Resale) => void
}

export const ResaleComponent: React.FC<ResaleComponentProps> = ({ resale, active, icon_size, onPress }) => {
    return (
        <TouchableRipple borderless style={[{ borderRadius: 100 }, active && { borderRadius: 20 }]} onPress={() => onPress(resale)}>
            <Surface style={{ borderRadius: 100 }}>
                <Image
                    source={resale.profilePic?.url}
                    contentFit="cover"
                    style={[
                        { height: icon_size, aspectRatio: 1, borderRadius: 100 },
                        active && { borderWidth: 3, borderColor: colors.primary, borderRadius: 20 },
                    ]}
                    placeholder={placeholders.resale}
                />
            </Surface>
        </TouchableRipple>
    )
}
