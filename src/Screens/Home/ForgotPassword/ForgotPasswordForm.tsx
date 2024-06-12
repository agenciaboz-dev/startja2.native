import { useFormik } from "formik"
import React, { useState } from "react"
import { Platform, View } from "react-native"
import { Button, Text, useTheme } from "react-native-paper"
import { FormText } from "../../../components/FormText"
import { colors } from "../../../style/colors"
import { TwoButtonsView } from "../../../components/TwoButtonsView"
import { LinkButton } from "../../../components/LinkButton"
import { api } from "../../../backend/api"
import { useLinkTo } from "@react-navigation/native"

interface ForgotPasswordFormProps {}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({}) => {
    const theme = useTheme()
    const linkTo = useLinkTo<any>()

    const [loading, setLoading] = useState(false)

    const formik = useFormik({
        initialValues: { login: "" },
        async onSubmit(values, formikHelpers) {
            if (loading) return
            setLoading(true)

            try {
                const response = await api.post("/user/forgot_password", values)
                linkTo({ screen: "codeVerification", params: { email: values.login } })
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        },
    })

    return (
        <View
            style={[{ gap: 20, borderTopColor: theme.colors.outlineVariant, borderTopWidth: 1, paddingTop: 20 }, Platform.OS != "web" && { gap: 10 }]}
        >
            <Text
                variant="bodyLarge"
                style={[{ color: colors.grey, paddingTop: 20 }, Platform.OS == "web" ? { fontWeight: "bold" } : { alignSelf: "center" }]}
            >
                Por favor, insira seu e-mail para redefinir a senha
            </Text>
            <FormText
                label={"E-mail"}
                formik={formik}
                name="login"
                keyboardType="email-address"
                autoCapitalize={"none"}
                placeholder="Digite seu endereço de e-mail"
            />
            <TwoButtonsView>
                <Button mode="contained" onPress={() => formik.handleSubmit()} loading={loading}>
                    Redefinir senha
                </Button>
                <LinkButton to="/login">Voltar</LinkButton>
            </TwoButtonsView>
        </View>
    )
}
