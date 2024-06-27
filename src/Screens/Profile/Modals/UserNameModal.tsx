import React, { useContext, useState } from "react"
import { Platform, View } from "react-native"
import { Button, IconButton, Modal, Portal, Text, TextInput } from "react-native-paper"
import { colors } from "../../../style/colors"
import { useUser } from "../../../hooks/useUser"
import { useFormik } from "formik"
import { PartialUser } from "../../../types/server/class/User"
import * as Yup from "yup"
import { api } from "../../../backend/api"
import { validatePassword, validationErrors } from "../../../tools/validationErrors"
import UserContext from "../../../contexts/userContext"

interface UserNameModalProps {
    visible: boolean
    onDismiss: () => void
}

export const UserNameModal: React.FC<UserNameModalProps> = ({ visible, onDismiss }) => {
    const { user } = useUser()
    const context = useContext(UserContext)

    const [nameActive, setNameActive] = useState(false)
    const [passwordActive, setPasswordActive] = useState(false)
    const [currentPassword, setCurrentPassword] = useState<string>("")
    const [passwordError, setPasswordError] = useState(false)

    const isValidName = (value: string) => /^[A-Za-zÀ-ÖØ-öø-ÿĀ-ž ]+$/.test(value)

    const validationschema = Yup.object().shape({
        name: Yup.string()
            .min(3, validationErrors.shortField("nome"))
            .required(validationErrors.required)
            .test("isValidName", validationErrors.invalidName, isValidName),
    })

    const formik = useFormik<PartialUser>({
        initialValues: { id: user!.id, name: "" },
        async onSubmit(values) {
            try {
                const response = await api.patch("/user", values)
                context.setUser(response.data)
                formik.resetForm()
            } catch (error) {
                console.log(error)
            }
        },
        validationSchema: validationschema,
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
                        <Text variant="headlineSmall">Alterar nome de usuário</Text>
                        <IconButton icon="close" onPress={onDismiss} />
                    </View>
                    <Text>Escolha um novo nome de usuário que será usado para o seu login no sistema</Text>
                    <TextInput
                        value={formik.values.name}
                        mode="outlined"
                        placeholder="Digite seu novo nome de usuário"
                        label={nameActive ? "Novo nome de usuário" : "Digite seu novo nome de usuário"}
                        onFocus={() => setNameActive(true)}
                        onBlur={() => {
                            formik.handleBlur("name")
                            setNameActive(false)
                        }}
                        onChangeText={formik.handleChange("name")}
                    />
                    {formik.touched.name && formik.errors.name && <Text style={{ color: colors.error, marginTop: -20 }}>{formik.errors.name}</Text>}

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
                            // validatePassword(currentPassword, user!, setPasswordError)
                            // formik.handleSubmit()

                            validatePassword(currentPassword, user!, setPasswordError).then((isValid) => {
                                console.log(isValid)
                                if (isValid) {
                                    formik.handleSubmit()
                                    onDismiss()
                                    setCurrentPassword("")
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
