import React from "react"
import { Platform, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { Checkbox, Surface, Text, useTheme } from "react-native-paper"
import { useUser } from "../../hooks/useUser"

interface PermissionItemProps {
    key?: React.Key | null | undefined
    description: string
    status: boolean
    onPress: () => void
    wrapperStyle?: StyleProp<ViewStyle>
    textStyle?: StyleProp<TextStyle>
    checkboxStyle?: StyleProp<ViewStyle>
}

{
    /* <Text style={{ flex: 0.4 }}>Editar permissões</Text>

<View style={{ flex: 0.6, alignItems: "center" }}>
    <Checkbox
        status={formik.values.permissions.editPermissions ? "checked" : "unchecked"}
        onPress={() => formik.setFieldValue("permissions.editPermissions", !formik.values.permissions.editPermissions)}
    />
</View> */
}

export const PermissionItem: React.FC<PermissionItemProps> = ({ key, status, onPress, wrapperStyle, textStyle, checkboxStyle, description }) => {
    const theme = useTheme()

    return (
        <View
            key={key}
            style={[
                {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: 20,
                },
                Platform.OS !== "web" && { paddingHorizontal: 15 },
                wrapperStyle,
            ]}
        >
            <Text style={[Platform.OS == "web" && { flex: 0.4 }, Platform.OS !== "web" && { flex: 1 }, textStyle]}>{description}</Text>

            <View
                style={[
                    { flex: 0.093, alignItems: "center" },
                    Platform.OS !== "web" && { flex: 0.23, borderColor: "#ff0000", borderWidth: 1 },
                    checkboxStyle,
                ]}
            >
                <Checkbox status={status ? "checked" : "unchecked"} onPress={onPress} />
            </View>
        </View>
    )
}
