import React, { useEffect, useState } from "react"
import { Keyboard, Platform, ScrollView, View } from "react-native"
import { Button, IconButton, Modal, Portal, Text, useTheme } from "react-native-paper"
import { colors } from "../../style/colors"
import { useFormik } from "formik"
import { Resale, ResaleForm } from "../../types/server/class/Resale"
import { FormText } from "../../components/FormText"
import { ProfilePicInput } from "../../components/ProfilePicInput"
import { ImagePickerAsset } from "expo-image-picker"
import { ResalePermissionsModal } from "../../components/ResalePermissionsModal/ResalePermissionsModal"
import { TwoButtonsView } from "../../components/TwoButtonsView"
import * as Yup from "yup"
import { validationErrors } from "../../tools/validationErrors"
import { getFilename } from "../../tools/pickMedia"
import { api } from "../../backend/api"
import { manager_schema } from "../../schemas/manager_schema"
import { UserPermissionModal } from "../../components/ResalePermissionsModal/UserPermissionModal"

interface ResaleFormModalProps {
    visible: boolean
    onDismiss: () => void
    onNewResale: (resale: Resale) => void
}

export const ResaleFormModal: React.FC<ResaleFormModalProps> = ({ visible, onDismiss, onNewResale }) => {
    const theme = useTheme()

    const [profilePic, setProfilePic] = useState<ImagePickerAsset | null>(null)
    const [keyboardVisible, setKeyboardVisible] = useState(false)
    const [showResalePermissions, setShowResalePermissions] = useState(false)
    const [showUserPermissions, setShowUserPermissions] = useState(false)
    const [loading, setLoading] = useState(false)

    const validation_schema = Yup.object().shape({
        name: Yup.string().required(validationErrors.required),
        manager: manager_schema,
    })

    const formik = useFormik<ResaleForm>({
        initialValues: {
            name: "",
            profilePic: undefined,
            manager: { email: "", name: "", password: "", phone: "", active: false },
            permissions: { customers: 0, natures: 0, products: 0, editPermissions: false, inviteUser: false },
        },
        validationSchema: validation_schema,
        validateOnChange: false,

        async onSubmit(values, formikHelpers) {
            if (loading) return

            if (profilePic) {
                values.profilePic = { name: getFilename(profilePic), base64: profilePic.base64 }
            }

            console.log(values)

            try {
                const response = await api.post("/resale", values)
                onNewResale(response.data)
                onDismiss()
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        },
    })

    useEffect(() => {
        console.log(profilePic)
    }, [profilePic])

    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", () => setKeyboardVisible(true))
        Keyboard.addListener("keyboardDidHide", () => setKeyboardVisible(false))

        return () => {
            Keyboard.removeAllListeners("keyboardDidShow")
            Keyboard.removeAllListeners("keyboardDidHide")
        }
    }, [])

    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={onDismiss}
                contentContainerStyle={[
                    {
                        backgroundColor: theme.colors.background,
                        margin: 20,
                        alignSelf: "center",
                    },
                    Platform.OS == "web" ? {} : { marginBottom: keyboardVisible ? 0 : undefined },
                ]}
            >
                <ScrollView style={[{ flex: 1 }]} contentContainerStyle={[{ gap: 20, padding: 20 }]} keyboardShouldPersistTaps="handled">
                    <View style={[{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }]}>
                        <Text style={[{ fontWeight: "bold", color: colors.grey }]}>Adicione uma revenda</Text>
                        <IconButton icon={"close"} style={{ margin: 0 }} onPress={onDismiss} />
                    </View>

                    <Text style={[{ color: colors.grey, marginTop: -20 }]}>
                        Por favor, forneça as seguintes informações. Não se preocupe, você sempre poderá alterar essas configurações mais tarde.
                    </Text>

                    <View style={[{ flexDirection: "row", alignItems: "center", gap: 20 }]}>
                        <ProfilePicInput onPick={setProfilePic} profilePic={profilePic} />
                        <View style={[{ flex: 1 }]}>
                            <FormText formik={formik} name="name" label="Nome da revenda" placeholder="Revenda 1" />
                        </View>
                    </View>

                    <Text>
                        Convide o usuário administrador da revenda. Não se preocupe, você sempre poderá alterar as permissões desse usuário mais
                        tarde.
                    </Text>

                    <FormText
                        formik={formik}
                        name="manager.email"
                        keyboardType="email-address"
                        autoCapitalize={"none"}
                        label="E-mail"
                        placeholder="usuario@email.com"
                    />
                    <FormText formik={formik} name="manager.name" label="Nome de usuário" placeholder="Nome de usuário" />

                    <Text style={{ fontWeight: "bold", color: colors.grey }}>Permissões usuário revenda</Text>
                    <Button style={{ alignSelf: "flex-start" }} mode="contained" onPress={() => setShowResalePermissions(true)}>
                        Configurar permissões
                    </Button>

                    <Text style={{ fontWeight: "bold", color: colors.grey }}>Permissões usuário cliente</Text>
                    <Button style={{ alignSelf: "flex-start" }} mode="contained" onPress={() => setShowUserPermissions(true)}>
                        Configurar permissões
                    </Button>

                    <TwoButtonsView>
                        <Button mode="contained" onPress={() => formik.handleSubmit()} loading={loading}>
                            Criar
                        </Button>
                    </TwoButtonsView>

                    <ResalePermissionsModal visible={showResalePermissions} onDismiss={() => setShowResalePermissions(false)} formik={formik} />
                    <UserPermissionModal visible={showUserPermissions} onDismiss={() => setShowUserPermissions(false)} />
                </ScrollView>
            </Modal>
        </Portal>
    )
}
