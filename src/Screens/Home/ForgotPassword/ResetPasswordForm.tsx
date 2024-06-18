import { RouteProp, useLinkTo } from "@react-navigation/native"
import { useFormik } from "formik"
import React, { useEffect, useState } from "react"
import { View } from "react-native"
import * as Yup from "yup"
import { SectionWrapper } from "../SectionWrapper"
import { FormText } from "../../../components/FormText"
import { validationErrors } from "../../../tools/validationErrors"
import { TwoButtonsView } from "../../../components/TwoButtonsView"
import { Button, Text, TextInput as Input } from "react-native-paper"
import { LinkButton } from "../../../components/LinkButton"
import { api } from "../../../backend/api"

interface ResetPasswordFormProps {
    route: RouteProp<any, any>
}

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ route }) => {
    const email = route.params?.email
    const linkTo = useLinkTo()

    const [loading, setLoading] = useState(false)
    const [passwordValue, setPasswordValue] = useState("")
    const [hiddenPassword, setHiddenPassword] = useState(true)

    const validation_schema = Yup.object().shape({
        password: Yup.string()
            .min(8, "Senha precisa ter pelo menos 8 caracteres")
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, "Senha precisa conter pelo menos uma letra maiúscula, uma letra minúscula e um número.")
            .required(validationErrors.required),
        password_confirmation: Yup.string().test("matching password", "Senhas não conferem", (value, context) => {
            return value === passwordValue
        }),
    })

    const formik = useFormik({
        initialValues: { target: email, password: "", password_confirmation: "" },
        async onSubmit(values, formikHelpers) {
            if (loading) return
            setLoading(true)

            try {
                const response = await api.post("/user/forgot_password/reset-password", values)
                if (response.data) {
                    linkTo("/forgot-password/success")
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

    useEffect(() => {
        setPasswordValue(formik.values.password)
    }, [formik.values.password])

    return (
        <SectionWrapper>
            <Text style={{}}>Criar uma nova senha. Certifique-se de que seja diferente das anteriores em termos de segurança</Text>
            <FormText
                label={"Nova senha"}
                formik={formik}
                name="password"
                placeholder="Digite a nova senha"
                secureTextEntry={hiddenPassword}
                right={<Input.Icon icon={!hiddenPassword ? "eye" : "eye-off"} onPress={() => setHiddenPassword((value) => !value)} />}
            />
            <FormText
                label={"Confirme sua senha"}
                formik={formik}
                name="password_confirmation"
                placeholder="Confirme sua senha"
                secureTextEntry={hiddenPassword}
                onSubmitEditing={() => formik.handleSubmit()}
            />
            <TwoButtonsView>
                <Button mode="contained" loading={loading} onPress={() => formik.handleSubmit()}>
                    Redefinir
                </Button>
                <LinkButton to="/login">Voltar</LinkButton>
            </TwoButtonsView>
        </SectionWrapper>
    )
}
