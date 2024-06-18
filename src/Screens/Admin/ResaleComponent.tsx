import React from "react"
import { View } from "react-native"
import { Resale } from "../../types/server/class/Resale"
import { TouchableRipple } from "react-native-paper"
import { Image } from "expo-image"
import { ActiveIndicator } from "./ActiveIndicator"
import { colors } from "../../style/colors"

interface ResaleComponentProps {
    resale: Resale
    active?: boolean
    icon_size: number
    onPress: (resale: Resale) => void
}

export const ResaleComponent: React.FC<ResaleComponentProps> = ({ resale, active, icon_size, onPress }) => {
    return (
        <View style={[{ position: "relative" }]}>
            <TouchableRipple borderless style={[{ borderRadius: 100 }, active && { borderRadius: 20 }]} onPress={() => onPress(resale)}>
                <Image
                    source={resale.profilePic?.url}
                    contentFit="cover"
                    style={[
                        { height: icon_size, aspectRatio: 1, borderRadius: 100 },
                        active && { borderWidth: 3, borderColor: colors.primary, borderRadius: 20 },
                    ]}
                    placeholder={require("../../../assets/icon.png")}
                />
            </TouchableRipple>
            {/* {active && <ActiveIndicator size={icon_size} />} */}
        </View>
    )
}
