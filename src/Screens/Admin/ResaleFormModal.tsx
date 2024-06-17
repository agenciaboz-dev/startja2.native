import React, { useEffect, useState } from "react"
import { Keyboard, Platform, ScrollView, View } from "react-native"
import { Button, IconButton, Modal, Portal, Text, useTheme } from "react-native-paper"
import { colors } from "../../style/colors"
import { useFormik } from "formik"
import { ResaleForm } from "../../types/server/class/Resale"
import { FormText } from "../../components/FormText"
import { ProfilePicInput } from "../../components/ProfilePicInput"
import { ImagePickerAsset } from "expo-image-picker"
import { ResalePermissionsModal } from "../../components/ResalePermissionsModal/ResalePermissionsModal"

interface ResaleFormModalProps {
    visible: boolean
    onDismiss: () => void
}

export const ResaleFormModal: React.FC<ResaleFormModalProps> = ({ visible, onDismiss }) => {
    const theme = useTheme()

    const [profilePic, setProfilePic] = useState<ImagePickerAsset | null>(null)
    const [keyboardVisible, setKeyboardVisible] = useState(false)
    const [showResalePermissions, setShowResalePermissions] = useState(false)

    const formik = useFormik<ResaleForm>({
        initialValues: {
            name: "",
            profilePic: undefined,
            manager: { email: "", name: "", password: "", phone: "", active: false },
            permissions: { customers: 0, natures: 0, products: 0, editPermissions: false, inviteUser: false },
        },
        onSubmit(values, formikHelpers) {
            console.log(values)
        },
        enableReinitialize: true,
    })

    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", () => setKeyboardVisible(true))
        Keyboard.addListener("keyboardDidHide", () => setKeyboardVisible(false))

        return () => {
            Keyboard.removeAllListeners("keyboardDidShow")
            Keyboard.removeAllListeners("keyboardDidHide")
        }
    }, [])

    return (
        <Modal
            visible={visible}
            onDismiss={onDismiss}
            contentContainerStyle={[
                {
                    backgroundColor: theme.colors.background,
                    padding: 20,
                    flex: 1,
                    margin: 20,
                    justifyContent: "flex-start",
                },
                Platform.OS == "web" ? { marginHorizontal: 550, marginVertical: 20 } : { marginBottom: keyboardVisible ? 0 : undefined },
            ]}
        >
            <ScrollView style={[{ flex: 1 }]} contentContainerStyle={[{ gap: 20 }]} keyboardShouldPersistTaps="handled">
                <View style={[{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }]}>
                    <Text style={[{ fontWeight: "bold", color: colors.grey }]}>Adicione uma revenda</Text>
                    <IconButton icon={"close"} style={{ margin: 0 }} onPress={onDismiss} />
                </View>

                <Text style={[{ color: colors.grey, marginTop: -20 }]}>
                    Por favor, forneça as seguintes informações. Não se preocupe, você sempre poderá alterar essas configurações mais tarde.
                </Text>

                <View style={[{ flexDirection: "row", alignItems: "center", gap: 20 }]}>
                    <ProfilePicInput onPick={setProfilePic} />
                    <View style={[{ flex: 1 }]}>
                        <FormText formik={formik} name="name" label="Nome da revenda" placeholder="Revenda 1" />
                    </View>
                </View>

                <Text>
                    Convide o usuário administrador da revenda. Não se preocupe, você sempre poderá alterar as permissões desse usuário mais tarde.
                </Text>

                <FormText formik={formik} name="manager.email" label="E-mail" placeholder="joaozinho@gmail.com" value={formik.values.manager.email} />
                <FormText formik={formik} name="manager.name" label="Nome de usuário" placeholder="Joãozinho" value={formik.values.manager.name} />

                <Text style={{ fontWeight: "bold", color: colors.grey }}>Permissões usuário revenda</Text>
                <Button style={{ alignSelf: "flex-start" }} mode="contained" onPress={() => setShowResalePermissions(true)}>
                    Configurar permissões
                </Button>

                <Portal>
                    <ResalePermissionsModal visible={showResalePermissions} onDismiss={() => setShowResalePermissions(false)} formik={formik} />
                </Portal>
            </ScrollView>
        </Modal>
    )
}
