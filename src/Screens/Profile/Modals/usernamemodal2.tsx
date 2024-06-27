import React, { useState } from "react"
import { Platform, View } from "react-native"
import { Button, IconButton, Modal, Portal, Text, TextInput } from "react-native-paper"
import { colors } from "../../../style/colors"
import { useUser } from "../../../hooks/useUser"
import { useFormik } from "formik"
import { PartialUser } from "../../../types/server/class/User"
import * as Yup from "yup"
import { api } from "../../../backend/api"


interface UserNameModalProps {
    visible: boolean
    onDismiss: () => void
}

export const UserNameModal: React.FC<UserNameModalProps> = ({ visible, onDismiss }) => {
    const {user} = useUser()

    
    const [nameActive, setNameActive] = useState(false)
    const [passwordActive, setPasswordActive] = useState(false)


    const isAlphaWithAccents = (value:string) => /^[A-Za-zÀ-ÖØ-öø-ÿĀ-ž]+$/.test(value);

    const validationschema = Yup.object().shape({
        name: Yup.string().required().test('is-alpha', 'O nome de usuário deve conter apenas letras', isAlphaWithAccents),
    })

    const formik = useFormik<PartialUser>({
        initialValues:{id: user!.id, name: ""},
        async onSubmit(values, ) {
       
            try {
                const response = await api.patch("/user", values)
                console.log(response.data)
                
            } catch (error) {
                console.log(error)
            }
        },
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
                            setNameActive(false)}}
                        onChangeText={formik.handleChange("name")}
                    />
                    <TextInput
                        mode="outlined"
                        placeholder="Insira sua senha"
                        label={passwordActive ? "Senha" : "Insira sua senha"}
                        onFocus={() => setPasswordActive(true)}
                        onBlur={() => {setPasswordActive(false)
                            
                        }}
                    />


                    <Button mode="contained" style={{ alignSelf: "flex-end" }} onPress={() => formik.handleSubmit()}>
                        Atualizar
                    </Button>
                </View>
            </Modal>
        </Portal>
    )
}
