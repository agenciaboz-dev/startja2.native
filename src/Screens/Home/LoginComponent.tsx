import React, { useRef, useState } from "react"
import { Platform, TextInput, View } from "react-native"
import { Button, Checkbox, TextInput as Input, Text, useTheme } from "react-native-paper"
import { useFormik } from "formik"
import { LoginForm } from "../../types/server/login"
import { FormText } from "../../components/FormText"
import { LabeledComponent } from "../../components/LabeledComponent"
import { colors } from "../../style/colors"
import { api } from "../../backend/api"
import * as Yup from "yup"
import { validationErrors } from "../../tools/validationErrors"

interface LoginComponentProps {}

export const LoginComponent: React.FC<LoginComponentProps> = ({}) => {
    const theme = useTheme()
    const password_ref = useRef<TextInput>(null)

    const [loading, setLoading] = useState(false)
    const [hiddenPassword, setHiddenPassword] = useState(true)

    const validation_schema = Yup.object().shape({
        login: Yup.string().email("E-mail inválido").required(validationErrors.required),
        password: Yup.string().required(validationErrors.required),
    })

    const formik = useFormik<LoginForm>({
        initialValues: { login: "", password: "" },
        async onSubmit(values, formikHelpers) {
            if (loading) return

            setLoading(true)
            try {
                const response = await api.post("/user/login", values)
                const user = response.data
                if (user) {
                    // onLogin
                } else {
                    formikHelpers.setFieldError("login", " ")
                    formikHelpers.setFieldError("password", "Nenhum usuário encontrado")
                }
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        },
        validationSchema: validation_schema,
        validateOnChange: false,
    })

    return (
        <View style={[{ gap: 20, borderTopColor: theme.colors.outlineVariant, borderTopWidth: 1 }, Platform.OS != "web" && { gap: 10 }]}>
            <Text
                style={[{ color: colors.grey, paddingTop: 20 }, Platform.OS == "web" ? { fontWeight: "bold" } : { alignSelf: "center" }]}
                variant={Platform.OS == "web" ? "bodyLarge" : "titleLarge"}
            >
                Acesse sua conta
            </Text>
            <FormText
                label={"E-mail"}
                formik={formik}
                name="login"
                keyboardType="email-address"
                autoCapitalize={"none"}
                placeholder="Digite seu endereço de e-mail"
                onSubmitEditing={() => password_ref.current?.focus()}
            />
            <FormText
                ref={password_ref}
                label={"Senha"}
                formik={formik}
                name="password"
                autoCapitalize={"none"}
                secureTextEntry={hiddenPassword}
                placeholder="Digite sua senha"
                onSubmitEditing={() => formik.handleSubmit()}
                right={<Input.Icon icon={!hiddenPassword ? "eye" : "eye-off"} onPress={() => setHiddenPassword((value) => !value)} />}
            />
            <View
                style={[
                    Platform.OS == "web"
                        ? { flexDirection: "row-reverse", justifyContent: "space-between" }
                        : { alignItems: "center", gap: 20, padding: 20 },
                ]}
            >
                <Button mode="contained" onPress={() => formik.handleSubmit()} loading={loading}>
                    Entrar
                </Button>
                <LabeledComponent Component={<Checkbox status="checked" />} label={"Manter conectado"} orientation="horizontal" reverse />
            </View>
        </View>
    )
}
