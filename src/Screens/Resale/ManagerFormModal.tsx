import React, { useState } from "react"
import { Platform, View } from "react-native"
import { Resale } from "../../types/server/class/Resale"
import { Button, IconButton, Modal, Portal, Text, useTheme } from "react-native-paper"
import { FormText } from "../../components/FormText"
import { colors } from "../../style/colors"
import { TwoButtonsView } from "../../components/TwoButtonsView"
import { useFormik } from "formik"
import { manager_schema } from "../../schemas/manager_schema"
import { ResaleUserForm } from "../../types/server/class/ResaleUser"
import * as Yup from "yup"
import { ResalePermissionsModal } from "../../components/ResalePermissionsModal/ResalePermissionsModal"
import { api } from "../../backend/api"
import { User } from "../../types/server/class"

interface ManagerFormModalProps {
    visible: boolean
    onDismiss: () => void
    resale: Resale
    onFinish: (user: User) => void
}

export const ManagerFormModal: React.FC<ManagerFormModalProps> = ({ visible, onDismiss, resale, onFinish }) => {
    const theme = useTheme()

    const [loading, setLoading] = useState(false)
    const [showPermissionsModal, setShowPermissionsModal] = useState(false)

    const formik = useFormik<ResaleUserForm>({
        initialValues: {
            user: { email: "", name: "", password: "", phone: "", active: false },
            permissions: { customers: 0, natures: 0, products: 0, editPermissions: false, inviteUser: false },
            resale_id: resale.id,
        },
        async onSubmit(values, formikHelpers) {
            if (loading) return
            console.log(values)
            setLoading(true)
            try {
                const response = await api.post("/resale/manager", values)
                onFinish(response.data)
                onDismiss()
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        },
        validationSchema: Yup.object().shape({ user: manager_schema }),
        validateOnChange: false,
    })

    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={onDismiss}
                contentContainerStyle={[
                    {
                        backgroundColor: theme.colors.background,
                        alignSelf: "center",
                        padding: 20,
                        gap: 20,
                    },
                    Platform.OS == "web" ? { minWidth: 400 } : {},
                ]}
            >
                <View style={[{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }]}>
                    <Text style={[{ fontWeight: "bold", color: colors.grey }]}>Convidar administrador de revenda</Text>
                    <IconButton icon={"close"} style={{ margin: 0 }} onPress={onDismiss} />
                </View>

                <FormText
                    formik={formik}
                    name="user.email"
                    keyboardType="email-address"
                    autoCapitalize={"none"}
                    label="E-mail"
                    placeholder="joaozinho@gmail.com"
                />
                <FormText formik={formik} name="user.name" label="Nome de usuário" placeholder="Joãozinho" />

                <Text style={{ fontWeight: "bold", color: colors.grey }}>Permissões usuário revenda</Text>
                <Button style={{ alignSelf: "flex-start" }} mode="contained" onPress={() => setShowPermissionsModal(true)}>
                    Configurar permissões
                </Button>

                <TwoButtonsView>
                    <Button mode="contained" onPress={() => formik.handleSubmit()} loading={loading}>
                        Convidar
                    </Button>
                </TwoButtonsView>

                <ResalePermissionsModal formik={formik} visible={showPermissionsModal} onDismiss={() => setShowPermissionsModal(false)} />
            </Modal>
        </Portal>
    )
}
