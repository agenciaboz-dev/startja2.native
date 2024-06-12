import { useLinkProps } from "@react-navigation/native"
import React from "react"
import { TouchableOpacity, View } from "react-native"
import { Text } from "react-native-paper"
import { colors } from "../style/colors"

interface LinkButtonProps {
    to: string
    params?: any
    children?: React.ReactNode
}

export const LinkButton: React.FC<LinkButtonProps> = ({ to, children, params }) => {
    const { onPress, ...props } = useLinkProps({ to })
    return (
        <TouchableOpacity onPress={onPress} {...props}>
            <Text variant="titleSmall" style={{ color: colors.primary, fontWeight: "bold" }}>
                {children}
            </Text>
        </TouchableOpacity>
    )
}
