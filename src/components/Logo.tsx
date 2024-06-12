import React from "react"
import { Image, ImageStyle } from "expo-image"
import { ColorValue } from "react-native"

interface LogoProps {
    size?: number
    tintColor?: ColorValue
    style?: ImageStyle
    contentFit?: "contain" | "cover" | "fill"
}

export const Logo: React.FC<LogoProps> = ({ size = 200, style, contentFit = "contain" }) => {
    return <Image source={require("../../assets/logo.webp")} style={[{ height: size, width: (993 * size) / 369 }, style]} contentFit={contentFit} />
}
