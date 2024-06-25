import React from "react"
import { Platform, ScrollView, View } from "react-native"
import { Button, Checkbox, IconButton, Modal, Portal, Text, useTheme } from "react-native-paper"
import { colors } from "../../style/colors"
import { PermissionsHeader } from "./PermissionsHeader"
import { FormikErrors, FormikTouched } from "formik"
import { formatPermissionsLabel } from "../../tools/formatPermissionsLabel"
import { hasPermission } from "../../tools/hasPermission"
import { TwoButtonsView } from "../TwoButtonsView"
import { PermissionsBody } from "./PermissionsBody"
import { ResalePermissionsForm } from "../../types/server/class/Permissions"
import { PermissionsCardMobile } from "./PermissionsCardMobile"

interface WithPermissions {
    permissions: ResalePermissionsForm
}

interface ResalePermissionsModalProps {
    visible: boolean
    onDismiss: () => void
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

export const ResalePermissionsModal: React.FC<ResalePermissionsModalProps> = ({ visible, onDismiss, formik }) => {
    const theme = useTheme()

    const is_admin =
        formik.values.permissions.customers == 31 &&
        formik.values.permissions.natures == 31 &&
        formik.values.permissions.products == 31 &&
        formik.values.permissions.editPermissions &&
        formik.values.permissions.inviteUser

    const permissions_data = [
        { value: 1, label: "Cadastrar" },
        { value: 2, label: "Editar" },
        { value: 4, label: "Ver" },
        { value: 8, label: "Ativar" },
        { value: 16, label: "Deletar" },
    ]

    const onAdminPress = () => {
        formik.setFieldValue("permissions.customers", is_admin ? 0 : 31)
        formik.setFieldValue("permissions.natures", is_admin ? 0 : 31)
        formik.setFieldValue("permissions.products", is_admin ? 0 : 31)
        formik.setFieldValue("permissions.editPermissions", !is_admin)
        formik.setFieldValue("permissions.inviteUser", !is_admin)
    }

    const onCheckboxPress = (key: string, value: number) => {
        // @ts-ignore
        let current_permission = formik.values.permissions[key]
        const is_checked = hasPermission(value, current_permission)

        formik.setFieldValue(`permissions.${key}`, is_checked ? (current_permission -= value) : (current_permission += value))
    }

    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={onDismiss}
                contentContainerStyle={[
                    {
                        backgroundColor: theme.colors.background,
                        padding: 20,
                        margin: 20,
                        justifyContent: "flex-start",
                    },
                    Platform.OS == "web" ? { marginHorizontal: 300, marginVertical: 20 } : {},
                ]}
            >
                <ScrollView>
                    <View
                        style={{
                            gap: 40,
                        }}
                    >
                        <View style={[{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }]}>
                            <Text style={{ color: colors.grey }} variant="headlineLarge">
                                Permissões
                            </Text>
                            <IconButton icon={"close"} style={{ margin: 0 }} onPress={onDismiss} />
                        </View>
                        <View>
                            <PermissionsHeader title="Admin" headers={["Permitir"]} />
                            <PermissionsBody description={"Tornar administrador da revenda"} status={is_admin} onPress={onAdminPress} />
                        </View>
                        {Platform.OS === "web" && (
                            <View>
                                <PermissionsHeader title="Nome" headers={permissions_data.map((item) => item.label)} />
                                {Object.entries(formik.values.permissions)
                                    .filter(([key, value]) => typeof value == "number")
                                    .map((item) => (
                                        // <PermissionItem key={item[0]} description={formatPermissionsLabel(item[0])} onPress={() => onCheckboxPress(item[0], permission.value)} status={hasPermission(permission.value, formik.values.permissions[item[0]]}  />
                                        <View
                                            key={item[0]}
                                            style={[
                                                {
                                                    flexDirection: "row",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                    paddingHorizontal: 20,
                                                },
                                            ]}
                                        >
                                            <Text style={{ flex: 0.4 }}>{formatPermissionsLabel(item[0])}</Text>
                                            <View style={[{ flexDirection: "row", gap: 30, flex: 0.6 }]}>
                                                {permissions_data.map((permission) => (
                                                    <View style={{ flex: 1, alignItems: "center" }} key={permission.value}>
                                                        <Checkbox
                                                            onPress={() => onCheckboxPress(item[0], permission.value)}
                                                            status={
                                                                // @ts-ignore
                                                                hasPermission(permission.value, formik.values.permissions[item[0]])
                                                                    ? "checked"
                                                                    : "unchecked"
                                                            }
                                                        />
                                                    </View>
                                                ))}
                                            </View>
                                        </View>
                                    ))}
                            </View>
                        )}
                        {Platform.OS !== "web" && (
                            <View style={[{ gap: 40 }]}>
                                {Object.entries(formik.values.permissions)
                                    .filter(([key, value]) => typeof value == "number")
                                    .map((item) => (
                                        <PermissionsCardMobile
                                            item={item}
                                            title={formatPermissionsLabel(item[0])}
                                            headers={permissions_data.map((item) => item.label)}
                                            permissions_data={permissions_data}
                                            onCheckboxPress={onCheckboxPress}
                                            formik={formik}
                                        />
                                    ))}
                            </View>
                        )}
                        <View>
                            <PermissionsHeader title="Ações" headers={["Permitir"]} />
                            <PermissionsBody
                                description="Editar permissões"
                                onPress={() => formik.setFieldValue("permissions.editPermissions", !formik.values.permissions.editPermissions)}
                                status={formik.values.permissions.editPermissions ? true : false}
                            />
                            {/* <View style={[{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20 }]}>
                            <Text style={{ flex: 0.4 }}>Editar permissões</Text>
                            <View style={{ flex: 0.6, alignItems: "center" }}>
                                <Checkbox
                                    status={formik.values.permissions.editPermissions ? "checked" : "unchecked"}
                                    onPress={() => formik.setFieldValue("permissions.editPermissions", !formik.values.permissions.editPermissions)}
                                />
                            </View>
                                        </View> */}
                            <PermissionsBody
                                description="Convidar usuário"
                                onPress={() => formik.setFieldValue("permissions.inviteUser", !formik.values.permissions.inviteUser)}
                                status={formik.values.permissions.inviteUser ? true : false}
                            />
                            {/* <View style={[{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20 }]}>
                            <Text style={{ flex: 0.4 }}>Convidar usuário</Text>
                            <View style={{ flex: 0.6, alignItems: "center" }}>
                                <Checkbox
                                    status={formik.values.permissions.inviteUser ? "checked" : "unchecked"}
                                    onPress={() => formik.setFieldValue("permissions.inviteUser", !formik.values.permissions.inviteUser)}
                                />
                            </View>
                                        </View> */}
                        </View>
                        <TwoButtonsView>
                            <Button mode="contained" onPress={onDismiss}>
                                Salvar permissões
                            </Button>
                        </TwoButtonsView>
                    </View>
                </ScrollView>
            </Modal>
        </Portal>
    )
}
