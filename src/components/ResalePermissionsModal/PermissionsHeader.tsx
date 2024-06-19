import React from "react"
import { Platform, View } from "react-native"
import { PermissionModalItem } from "../../types/PermissionModalItem"
import { Text, useTheme } from "react-native-paper"

interface PermissionsHeaderProps {
    title: string
    headers: string[]
}

export const PermissionsHeader: React.FC<PermissionsHeaderProps> = ({ title, headers }) => {
    const theme = useTheme()
    return (
        <View
            style={[
                {
                    justifyContent: "space-between",
                    flexDirection: "row",
                    backgroundColor: theme.colors.elevation.level1,
                    padding: 20,
                },
                Platform.OS !== "web" && { paddingHorizontal: 15 },
            ]}
        >
            <Text style={[Platform.OS == "web" && { flex: 0.4 }]}>{title}</Text>
            <View style={[{ flexDirection: "row", gap: 30 }, Platform.OS == "web" && { flex: 0.6 }]}>
                {headers.map((item) => (
                    <Text
                        key={item}
                        style={[
                            {
                                marginLeft: "auto",
                                textAlign: "center",
                            },
                            Platform.OS == "web" && {
                                flex: headers.length == 1 ? 0.155 : 1,
                            },
                        ]}
                    >
                        {item}
                    </Text>
                ))}
            </View>
        </View>
    )
}
