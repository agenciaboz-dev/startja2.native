import React from "react"
import { View } from "react-native"
import { Checkbox, Divider, Text, useTheme } from "react-native-paper"
import { hasPermission } from "../../tools/hasPermission"
import { ResalePermissionsForm } from "../../types/server/class/Permissions"
import { FormikErrors, FormikTouched } from "formik"

interface WithPermissions {
    permissions: ResalePermissionsForm
}

interface PermissionsCardMobileProps {
    item: [string, number | boolean]
    title: string
    headers: string[]
    permissions_data: {
        value: number
        label: string
    }[]
    onCheckboxPress: (key: string, value: number) => void
    formik: {
        values: WithPermissions
        errors: FormikErrors<WithPermissions>
        touched: FormikTouched<WithPermissions>
        handleChange: (e: React.ChangeEvent<any>) => void
        handleBlur: {
            (e: React.FocusEvent<any, Element>): void
            <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void
        }
        setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void> | Promise<FormikErrors<WithPermissions>>
    }
}

export const PermissionsCardMobile: React.FC<PermissionsCardMobileProps> = ({ item, title, headers, permissions_data, onCheckboxPress, formik }) => {
    const theme = useTheme()
    return (
        <View
            style={[
                {
                    alignItems: "center",
                    gap: 10,
                },
            ]}
        >
            <Text>{title}</Text>
            <View
                style={[
                    {
                        backgroundColor: theme.colors.elevation.level1,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        padding: 20,
                        width: "100%",
                    },
                ]}
            >
                {headers.map((item) => (
                    <Text
                        key={item}
                        style={[
                            {
                                textAlign: "center",
                            },
                        ]}
                    >
                        {item}
                    </Text>
                ))}
            </View>
            <View style={[{ flexDirection: "row", gap: 20 }]}>
                {permissions_data.map((permission) => (
                    <View style={{ alignItems: "center" }} key={permission.value}>
                        <Checkbox
                            onPress={() => onCheckboxPress(item[0], permission.value)}
                            status={
                                // @ts-ignore
                                hasPermission(permission.value, formik.values.permissions[item[0]]) ? "checked" : "unchecked"
                            }
                        />
                    </View>
                ))}
            </View>
            <Divider style={{ width: "100%" }} />
        </View>
    )
}
