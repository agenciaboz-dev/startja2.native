import React, { useContext, useState } from "react"
import { Platform, View } from "react-native"
import { Button, IconButton, Modal, Portal, Text, TextInput } from "react-native-paper"
import { colors } from "../../../style/colors"
import * as Yup from "yup"
import { validateEmail, validatePassword, validationErrors } from "../../../tools/validationErrors"
import { useFormik } from "formik"
import { PartialUser } from "../../../types/server/class/User"
import { useUser } from "../../../hooks/useUser"
import UserContext from "../../../contexts/userContext"
import { api } from "../../../backend/api"

interface UserEmailModalProps {
    visible: boolean
    onDismiss: () => void
}

export const UserEmailModal: React.FC<UserEmailModalProps> = ({ visible, onDismiss }) => {
    const emailRegex = (value: string) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
    const { user } = useUser()
    const context = useContext(UserContext)

    const [currentEmailActive, setCurrentEmailActive] = useState(false)
    const [newEmailActive, setNewEmailActive] = useState(false)
    const [passwordActive, setPasswordActive] = useState(false)
    const [currentPassword, setCurrentPassword] = useState<string>("")
    const [passwordError, setPasswordError] = useState(false)
    const [currentEmail, setCurrentEmail] = useState<string>("")
    const [currentEmailError, setCurrentEmailError] = useState(false)

    //todo: melhorar a validação a mesma está incorreta

    const validateSchema = Yup.object().shape({
        email: Yup.string().required(validationErrors.required).test("emailregex", validationErrors.invalidEmail, emailRegex),
    })

    const formik = useFormik<PartialUser>({
        initialValues: { id: user!.id, email: "" },
        async onSubmit(values) {
            try {
                const response = await api.patch("/user", values)
                context.setUser(response.data)
                formik.resetForm()
            } catch (error) {
                console.log(error)
            }
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
                        value={currentEmail}
                        mode="outlined"
                        placeholder="Digite o endereço de email atual"
                        label={currentEmailActive ? "Endereço de email atual" : "Digite o endereço de email atual"}
                        onFocus={() => setCurrentEmailActive(true)}
                        onBlur={() => {
                            setCurrentEmailActive(false)
                        }}
                        onChangeText={(email) => {
                            setCurrentEmail(email)
                        }}
                    />
                    {currentEmailError && <Text style={{ color: colors.error, marginTop: -20 }}>{validationErrors.invalidEmailConfirmation}</Text>}

                    <TextInput
                        value={formik.values.email}
                        mode="outlined"
                        placeholder="Digite o novo endereço de email"
                        label={newEmailActive ? "Novo email" : "Digite o novo endereço de email"}
                        onFocus={() => setNewEmailActive(true)}
                        onBlur={() => {
                            formik.handleBlur("email")
                            setNewEmailActive(false)
                        }}
                        onChangeText={formik.handleChange("email")}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <Text style={{ color: colors.error, marginTop: -20 }}>{formik.errors.email}</Text>
                    )}

                    <TextInput
                        value={currentPassword}
                        mode="outlined"
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
                            validateEmail(currentEmail, user!, setCurrentEmailError)
                            validatePassword(currentPassword, user!, setPasswordError).then((isValid) => {
                                console.log(isValid)
                                if (isValid) {
                                    formik.handleSubmit()
                                    onDismiss()
                                    setCurrentPassword("")
                                    setCurrentEmail("")
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
