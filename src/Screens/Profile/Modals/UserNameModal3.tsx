import React, { useState } from "react"
import { Platform, View } from "react-native"
import { Button, IconButton, Modal, Portal, Text, TextInput } from "react-native-paper"
import { colors } from "../../../style/colors"
import { ErrorMessage, FormikErrors, FormikTouched, useFormik } from "formik"
import { FormText } from "../../../components/FormText"
import { values } from "lodash"
import * as Yup from "yup"
import { PartialUser } from "../../../types/server/class/User"
import { useUser } from "../../../hooks/useUser"
import { validatePassword, validationErrors } from "../../../tools/validationErrors"

interface UserNameModalProps {
    visible: boolean
    onDismiss: () => void
}

export const UserNameModal: React.FC<UserNameModalProps> = ({ visible, onDismiss }) => {
    const nameValidationSchema = (value: string) => /^[A-Za-zÀ-ÖØ-öø-ÿĀ-ž]+$/.test(value)

    const { user } = useUser()
    const [nameActive, setNameActive] = useState(false)
    const [passwordActive, setPasswordActive] = useState(false)
    const [currentPassword, setCurrentPassword] = useState<string>("")
    const [passwordError, setPasswordError] = useState(false)

    const validateSchema = Yup.object().shape({
        name: Yup.string().required().test("is-name", validationErrors.invalidName, nameValidationSchema),
    })

    // email: Yup.string().email(validationErrors.invalidEmail),

    // phone: Yup.number().required(validationErrors.invalidPhone),

    const formik = useFormik<PartialUser>({
        initialValues: { id: user!.id, name: "" },
        onSubmit(values) {
            console.log(`enviando: ${values}`)
        },
        // validationSchema: validateSchema,
        // validateOnChange: false,
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
                    {/* {
                        formik.touched.name && formik.errors.name && <Text style={{ color: colors.error, marginTop: -20 }}>{formik.errors.name}</Text>
                    } */}
                    {/* <TextInput
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
                    {passwordError && <Text style={{ color: colors.error, marginTop: -20 }}>{validationErrors.invalidPasswordConfirmation}</Text>}; */}
                    <Button
                        mode="contained"
                        style={{ alignSelf: "flex-end" }}
                        onPress={() => {
                            // validatePassword(currentPassword, user!, setPasswordError)
                            formik.handleSubmit()
                        }}
                    >
                        Atualizar
                    </Button>
                </View>
            </Modal>
        </Portal>
    )
}


