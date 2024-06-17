import React from "react"
import { View } from "react-native"
import { Resale } from "../../types/server/class/Resale"
import { TouchableRipple } from "react-native-paper"
import { Image } from "expo-image"

interface ResaleComponentProps {
    resale: Resale
    active?: boolean
    icon_size: number
}

export const ResaleComponent: React.FC<ResaleComponentProps> = ({ resale, active, icon_size }) => {
    return (
        <TouchableRipple borderless style={{ borderRadius: 100 }}>
            <Image source={resale.profilePic?.url} contentFit="cover" style={[{ height: icon_size, aspectRatio: 1, borderRadius: 100 }]} />
        </TouchableRipple>
    )
}
