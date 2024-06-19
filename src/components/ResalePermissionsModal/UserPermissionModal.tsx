import React, { useState } from "react"
import { Platform, ScrollView, View } from "react-native"
import { IconButton, Modal, Portal, Surface, Text, useTheme } from "react-native-paper"
import { colors } from "../../style/colors"
import { PermissionsHeader } from "./PermissionsHeader"
import { PermissionsBody } from "./PermissionsBody"

interface UserPermissionModalProps {
    visible: boolean
    onDismiss: () => void
}

export const UserPermissionModal: React.FC<UserPermissionModalProps> = ({ visible, onDismiss }) => {
    const theme = useTheme()

    // const is_admin =
    //     formik.values.permissions.customers == 31 &&
    //     formik.values.permissions.natures == 31 &&
    //     formik.values.permissions.products == 31 &&
    //     formik.values.permissions.editPermissions &&
    //     formik.values.permissions.inviteUser

    const permissions_data = [
        { value: 1, label: "Cadastrar" },
        { value: 2, label: "Editar" },
        { value: 4, label: "Ver" },
        { value: 8, label: "Ativar" },
        { value: 16, label: "Deletar" },
    ]

    // const onAdminPress = () => {
    //     formik.setFieldValue("permissions.customers", is_admin ? 0 : 31)
    //     formik.setFieldValue("permissions.natures", is_admin ? 0 : 31)
    //     formik.setFieldValue("permissions.products", is_admin ? 0 : 31)
    //     formik.setFieldValue("permissions.editPermissions", !is_admin)
    //     formik.setFieldValue("permissions.inviteUser", !is_admin)
    // }

    const [keyboardVisible, setKeyboardVisible] = useState(false)

    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={onDismiss}
                contentContainerStyle={[
                    {
                        backgroundColor: theme.colors.background,
                        width: 830,
                        alignSelf: "center",
                    },
                    Platform.OS == "web" ? {} : { marginBottom: keyboardVisible ? 0 : undefined },
                ]}
            >
                <ScrollView style={[{ flex: 1 }]} contentContainerStyle={[{ gap: 20, padding: 20 }]} keyboardShouldPersistTaps="handled">
                    <View style={[{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }]}>
                        <Text style={{ color: colors.grey }} variant="headlineLarge">
                            Permissões
                        </Text>
                        <IconButton icon={"close"} style={{ margin: 0 }} onPress={onDismiss} />
                    </View>
                </ScrollView>
                <View>
                    <PermissionsHeader title="Nome" headers={["Permitir"]} />
                    {/* <PermissionsBody description={"Tornar administrador da revenda"} status={is_admin} onPress={onAdminPress} /> */}
                </View>
            </Modal>
        </Portal>
    )
}
