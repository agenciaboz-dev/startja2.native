import React, { useContext, useState } from "react"
import { Platform, View } from "react-native"
import { Button, IconButton, Modal, Portal, Text, TextInput } from "react-native-paper"
import { colors } from "../../../style/colors"
import { useUser } from "../../../hooks/useUser"
import UserContext from "../../../contexts/userContext"
import { useFormik } from "formik"
import { PartialUser } from "../../../types/server/class/User"
import { api } from "../../../backend/api"
import { validatePassword } from "../../../tools/validationErrors"

interface PasswordModalProps {
    visible: boolean
    onDismiss: () => void
}

export const PasswordModal: React.FC<PasswordModalProps> = ({ visible, onDismiss }) => {
    const { user } = useUser()
    const context = useContext(UserContext)

    const [currentPasswordActive, setCurrentPasswordActive] = useState(false)
    const [newPasswordActive, setNewPasswordActive] = useState(false)
    const [passwordConfirmActive, setpasswordConfirmActive] = useState(false)

    const [currentPassword, setCurrentPassword] = useState<string>("")
    const [currentPasswordError, setCurrentPasswordError] = useState(false)
    const [newPassword, setNewPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [samePassword, setSamePassword] = useState<boolean>()

    const formik = useFormik<PartialUser>({
        initialValues: { id: user!.id, password: "" },
        async onSubmit(values) {
            try {
                const response = await api.patch("/user", values)
                context.setUser(response.data)
                formik.resetForm()
            } catch (error) {
                console.log(error)
            }
        },
        // validationSchema: validateSchema,
        validateOnChange: false,
        enableReinitialize: true,
    })

    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={onDismiss}
                contentContainerStyle={[
                    {
                        backgroundColor: colors.box,
                        alignSelf: "center",
                        padding: 20,
                        gap: 20,
                        borderRadius: 10,
                    },
                    Platform.OS == "web" && {},
                    Platform.OS !== "web" && { width: "90%" },
                ]}
            >
                <View style={{ gap: 20 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Text variant="headlineSmall">Alterar Senha</Text>
                        <IconButton icon="close" onPress={onDismiss} />
                    </View>
                    <Text>Crie uma nova senha forte para melhorar a segurança da sua conta.</Text>
                    <TextInput
                        value={currentPassword}
                        mode="outlined"
                        placeholder="Insira sua senha antiga"
                        label={currentPasswordActive ? "Senha antiga" : "Insira sua senha antiga"}
                        onFocus={() => setCurrentPasswordActive(true)}
                        onBlur={() => {
                            setCurrentPasswordActive(false)
                        }}
                        onChangeText={(password) => {
                            setCurrentPassword(password)
                        }}
                        secureTextEntry={true}
                    />
                    <TextInput
                        value={formik.values.password}
                        mode="outlined"
                        placeholder="Insira sua nova senha"
                        label={passwordConfirmActive ? "Nova senha" : "Insira sua nova senha"}
                        onFocus={() => setpasswordConfirmActive(true)}
                        onBlur={() => {
                            formik.handleBlur("password")
                            setpasswordConfirmActive(false)
                        }}
                        onChangeText={() => {
                            formik.handleChange("password")
                            // setNewPassword(password)
                        }}
                    />
                    <TextInput
                        value={passwordConfirm}
                        mode="outlined"
                        placeholder="Confirme sua nova senha"
                        label={newPasswordActive ? "Confirme nova senha" : "Confirme sua nova senha"}
                        onFocus={() => setNewPasswordActive(true)}
                        onBlur={() => setNewPasswordActive(false)}
                        onChangeText={(password) => setPasswordConfirm(password)}
                    />
                    <Button
                        mode="contained"
                        style={{ alignSelf: "flex-end" }}
                        onPress={() => {
                            validatePassword(currentPassword, user!, setCurrentPasswordError).then((isValid) => {
                                console.log(isValid)
                                if (isValid) {
                                    setSamePassword(newPassword === passwordConfirm)
                                    if (samePassword) {
                                        formik.handleSubmit()
                                        onDismiss()
                                        setCurrentPassword("")
                                        setNewPassword("")
                                        setPasswordConfirm("")
                                    }
                                }
                            })
                        }}
                    >
                        Atualizar
                    </Button>
                </View>
            </Modal>
        </Portal>
    )
}
