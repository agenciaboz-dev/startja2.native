import React, { useState } from "react"
import { Platform, View } from "react-native"
import { Button, Text, useTheme } from "react-native-paper"
import { colors } from "../../style/colors"
import { useFormik } from "formik"
import { UserForm } from "../../types/server/class"
import { FormText } from "../../components/FormText"
import { LinkButton } from "../../components/LinkButton"
import * as Yup from "yup"
import { validationErrors } from "../../tools/validationErrors"
import { api } from "../../backend/api"
import { useLinkTo } from "@react-navigation/native"

interface BudgetRequestComponentProps {}

export const BudgetRequestComponent: React.FC<BudgetRequestComponentProps> = ({}) => {
    const theme = useTheme()
    const linkTo = useLinkTo()

    const [loading, setLoading] = useState(false)

    const validation_schema = Yup.object().shape({
        name: Yup.string().required(validationErrors.required),
        email: Yup.string().email("E-mail inválido").required(validationErrors.required),
        phone: Yup.string()
            .required(validationErrors.required)
            .matches(/^\(\d{2}\) \d \d{4}-\d{4}$/, "Telefone inválido"),
        password: Yup.string().required(validationErrors.required),
    })

    const formik = useFormik<UserForm>({
        initialValues: { name: "", email: "", password: "123", phone: "" },
        async onSubmit(values, formikHelpers) {
            if (loading) return
            setLoading(true)
            try {
                const response = await api.post("/user", values)
                console.log(response.data)
                const user = response.data
                if (user) {
                    linkTo("/budget/success")
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
                Solicite seu orçamento
            </Text>

            <View style={[{ gap: 10 }]}>
                <FormText label={"Nome"} formik={formik} name="name" placeholder="Digite seu nome" />

                <FormText
                    label={"E-mail"}
                    formik={formik}
                    name="email"
                    keyboardType="email-address"
                    autoCapitalize={"none"}
                    placeholder="Digite seu endereço de e-mail"
                />

                <FormText
                    name="phone"
                    formik={formik}
                    label={"Telefone"}
                    keyboardType="number-pad"
                    maxLength={16}
                    mask={"(99) 9 9999-9999"}
                    placeholder="Digite seu telefone"
                />

                <FormText label={"Mensagem"} formik={formik} name="password" placeholder="Digite ua mensagem" multiline numberOfLines={4} />
                <View
                    style={[
                        Platform.OS == "web"
                            ? { flexDirection: "row-reverse", justifyContent: "space-between" }
                            : { alignItems: "center", gap: 20, marginTop: 20 },
                    ]}
                >
                    <Button mode="contained" onPress={() => formik.handleSubmit()}>
                        Enviar
                    </Button>
                    <LinkButton to="/login">Voltar</LinkButton>
                </View>
            </View>
        </View>
    )
}
