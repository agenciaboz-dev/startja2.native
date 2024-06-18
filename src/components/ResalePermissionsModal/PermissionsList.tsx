import React from "react"
import { View } from "react-native"
import { PermissionModalItem } from "../../types/PermissionModalItem"
import { Text, useTheme } from "react-native-paper"

interface PermissionsListProps {
    title: string
    itemHeaders: string[]
    children?: React.ReactNode
}

export const PermissionsList: React.FC<PermissionsListProps> = ({ title, itemHeaders, children }) => {
    const theme = useTheme()

    return (
        <View>
            <View style={{ backgroundColor: theme.colors.elevation.level1, flexDirection: "row", justifyContent: "space-between", padding: 20 }}>
                <Text style={{ flex: 0.4 }}>{title}</Text>
                <View style={[{ flexDirection: "row", gap: 30, flex: 0.6 }]}>
                    {itemHeaders.map((item) => (
                        <Text
                            key={item}
                            style={{
                                flex: itemHeaders.length == 1 ? 0.155 : 1,
                                marginLeft: "auto",
                                textAlign: "center",
                            }}
                        >
                            {item}
                        </Text>
                    ))}
                </View>
            </View>
            <View style={[{ flex: 0.6 }]}>{children}</View>
        </View>
    )
}
