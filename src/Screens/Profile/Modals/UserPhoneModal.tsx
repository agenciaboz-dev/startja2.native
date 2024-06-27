import React, { useContext, useState } from "react"
import { Platform, View } from "react-native"
import { Button, IconButton, Modal, Portal, Text, TextInput } from "react-native-paper"
import { colors } from "../../../style/colors"
import { useUser } from "../../../hooks/useUser"
import UserContext from "../../../contexts/userContext"
import * as Yup from "yup"
import { validatePassword, validatePhone, validationErrors } from "../../../tools/validationErrors"
import { useFormik } from "formik"
import { PartialUser } from "../../../types/server/class/User"
import { api } from "../../../backend/api"

interface UserPhoneModalProps {
    visible: boolean
    onDismiss: () => void
}

export const UserPhoneModal: React.FC<UserPhoneModalProps> = ({ visible, onDismiss }) => {
    const { user } = useUser()
    const context = useContext(UserContext)

    const [currentPhoneActive, setCurrentPhoneActive] = useState(false)
    const [newPhoneActive, setNewPhoneActive] = useState(false)
    const [passwordActive, setPasswordActive] = useState(false)

    const [currentPassword, setCurrentPassword] = useState<string>("")
    const [currentPasswordError, setCurrentPasswordError] = useState(false)
    const [currentPhone, setCurrentPhone] = useState<string>("")
    const [currentPhoneError, setCurrentPhoneError] = useState(false)

    //todo: melhorar a validação do phone
    const validateSchema = Yup.object().shape({
        phone: Yup.string().min(11, validationErrors.invalidPhone).required(validationErrors.required),
    })

    const formik = useFormik<PartialUser>({
        initialValues: { id: user!.id, phone: "" },
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
                style={{}}
            >
                <View style={{ gap: 20 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Text variant="headlineSmall">Alterar telefone</Text>
                        <IconButton icon="close" onPress={onDismiss} />
                    </View>
                    <Text>Atualize seu número de telefone para garantir que podemos contatá-lo quando necessário.</Text>

                    <TextInput
                        value={currentPhone}
                        mode="outlined"
                        placeholder="Digite seu telefone atual"
                        label={currentPhoneActive ? "Telefone atual" : "Digite seu telefone atual"}
                        onFocus={() => setCurrentPhoneActive(true)}
                        onBlur={() => setCurrentPhoneActive(false)}
                        onChangeText={(phone) => {
                            setCurrentPhone(phone)
                        }}
                    />
                    {currentPhoneError && <Text style={{ color: colors.error, marginTop: -20 }}>{validationErrors.invalidPhoneConfirmation}</Text>}

                    <TextInput
                        value={formik.values.phone}
                        mode="outlined"
                        placeholder="Digite seu novo telefone"
                        label={newPhoneActive ? "Novo telefone" : "Digite seu novo telefone"}
                        onFocus={() => setNewPhoneActive(true)}
                        onBlur={() => {
                            formik.handleBlur("phone")
                            setNewPhoneActive(false)
                        }}
                        onChangeText={formik.handleChange("phone")}
                    />
                    {formik.touched.phone && formik.errors.phone && (
                        <Text style={{ color: colors.error, marginTop: -20 }}>{formik.errors.phone}</Text>
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
                    {currentPasswordError && (
                        <Text style={{ color: colors.error, marginTop: -20 }}>{validationErrors.invalidPasswordConfirmation}</Text>
                    )}

                    <Button
                        mode="contained"
                        style={{ alignSelf: "flex-end" }}
                        onPress={() => {
                            validatePhone(currentPhone, user!, setCurrentPhoneError)
                            validatePassword(currentPassword, user!, setCurrentPasswordError).then((isValid) => {
                                console.log(isValid)
                                if (isValid) {
                                    formik.handleSubmit()
                                    onDismiss()
                                    setCurrentPassword("")
                                    setCurrentPhone("")
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
