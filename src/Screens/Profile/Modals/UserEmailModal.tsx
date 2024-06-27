import React, { useState } from "react"
import { Platform, View } from "react-native"
import { Button, IconButton, Modal, Portal, Text, TextInput } from "react-native-paper"
import { colors } from "../../../style/colors"
import * as Yup from "yup"
import { validateEmail, validatePassword, validationErrors } from "../../../tools/validationErrors"
import { useFormik } from "formik"
import { PartialUser } from "../../../types/server/class/User"
import { useUser } from "../../../hooks/useUser"

interface UserEmailModalProps {
    visible: boolean
    onDismiss: () => void
}

export const UserEmailModal: React.FC<UserEmailModalProps> = ({ visible, onDismiss }) => {
    const { user } = useUser()
    const [emailActive, setEmailActive] = useState(false)
    const [newEmailActive, setNewEmailActive] = useState(false)
    const [passwordActive, setPasswordActive] = useState(false)
    const [currentPassword, setCurrentPassword] = useState<string>("")
    const [passwordError, setPasswordError] = useState(false)
    const [currentEmail, setCurrentEmail] = useState<string>("")
    const [emailError, setEmailError] = useState(false)

    const validateSchema = Yup.object().shape({
        email: Yup.string().email(validationErrors.invalidEmail).required(validationErrors.required),
    })

    const formik = useFormik<PartialUser>({
        initialValues: { id: user!.id, email: "" },
        onSubmit(values) {
            console.log(`enviando: ${values}`)
        },
        validationSchema: validateSchema,
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
                ]}
            >
                <View style={{ gap: 20 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Text variant="headlineSmall">Alterar email do usuário</Text>
                        <IconButton icon="close" onPress={onDismiss} />
                    </View>
                    <Text>Forneça um endereço de email válido para receber notificações e recuperar sua conta</Text>
                    <TextInput
                        mode="outlined"
                        placeholder="Digite o endereço de email atual"
                        label={emailActive ? "Endereço de email atual" : "Digite o endereço de email atual"}
                        onFocus={() => setEmailActive(true)}
                        onBlur={() => setEmailActive(false)}
                        onChangeText={(email) => {
                            setCurrentEmail(email)
                        }}
                    />
                    {emailError && <Text style={{ color: colors.error, marginTop: -20 }}>{validationErrors.invalidEmailConfirmation}</Text>}

                    <TextInput
                        mode="outlined"
                        placeholder="Digite o novo endereço de email"
                        label={newEmailActive ? "Novo email" : "Digite o novo endereço de email"}
                        onFocus={() => setNewEmailActive(true)}
                        onBlur={() => {
                            setNewEmailActive(false)
                            formik.handleBlur("email")
                        }}
                        onChangeText={formik.handleChange}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <Text style={{ color: colors.error, marginTop: -20 }}>{formik.errors.email}</Text>
                    )}

                    <TextInput
                        mode="outlined"
                        value={currentPassword}
                        placeholder="Insira sua senha"
                        label={passwordActive ? "Senha" : "Insira sua senha"}
                        onFocus={() => setPasswordActive(true)}
                        onBlur={() => {
                            setPasswordActive(false)
                        }}
                        onChangeText={(password) => {
                            setCurrentPassword(password)
                        }}
                        secureTextEntry={true}
                    />
                    {passwordError && <Text style={{ color: colors.error, marginTop: -20 }}>{validationErrors.invalidPasswordConfirmation}</Text>}

                    <Button
                        mode="contained"
                        style={{ alignSelf: "flex-end" }}
                        onPress={() => {
                            validateEmail(currentEmail, user!, setEmailError).then((isvalid) => {
                                // console.log({ emaiValido: isvalid })
                            })
                            validatePassword(currentPassword, user!, setPasswordError).then((isValid) => {
                                // console.log(isValid)
                                if (isValid) {
                                    formik.handleSubmit()
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
