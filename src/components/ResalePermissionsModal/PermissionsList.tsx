import React from "react"
import { Platform, View } from "react-native"
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
            <View
                style={[
                    { backgroundColor: theme.colors.elevation.level1, flexDirection: "row", justifyContent: "space-between", padding: 20 },
                    Platform.OS !== "web" && { paddingHorizontal: 15 },
                ]}
            >
                <Text style={[Platform.OS == "web" && { flex: 0.4 }]}>{title}</Text>
                <View style={[{ flexDirection: "row", gap: 30 }, Platform.OS == "web" && { flex: 0.6 }]}>
                    {itemHeaders.map((item) => (
                        <Text
                            key={item}
                            style={[
                                {
                                    marginLeft: "auto",
                                    textAlign: "center",
                                },
                                Platform.OS == "web" && {
                                    flex: itemHeaders.length == 1 ? 0.155 : 1,
                                },
                            ]}
                        >
                            {item}
                        </Text>
                    ))}
                </View>
            </View>
            <View style={[Platform.OS == "web" && { flex: 1 }, Platform.OS !== "web" && {}]}>{children}</View>
        </View>
    )
}
