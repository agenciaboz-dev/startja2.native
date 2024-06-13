import React, { useEffect, useRef, useState } from "react"
import { TextInput, TouchableOpacity, View } from "react-native"
import { SectionWrapper } from "../SectionWrapper"
import { Text, TextInput as Input, Button, useTheme, Icon } from "react-native-paper"
import { RouteProp, useLinkTo } from "@react-navigation/native"
import { colors } from "../../../style/colors"
import { TwoButtonsView } from "../../../components/TwoButtonsView"
import { LinkButton } from "../../../components/LinkButton"
import { api } from "../../../backend/api"
import { Recovery } from "../../../types/server/class/Recovery"

interface CodeVerificationProps {
    route: RouteProp<any, any>
}

export const CodeVerification: React.FC<CodeVerificationProps> = ({ route }) => {
    const theme = useTheme()
    const email = route.params?.email
    const linkTo = useLinkTo<any>()

    const input_states = new Array(5).fill(null).map(() => useState(""))
    const input_refs = new Array(5).fill(null).map(() => useRef<TextInput>(null))

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [resendText, setResendText] = useState<"Reenviar" | "Enviado">("Reenviar")

    const onChangeText = (text: string, index: number) => {
        if (isNaN(Number(text))) return

        setError(false)

        const setState = input_states[index][1]
        setState(text)
        focusInput(index + (!!text ? 1 : -1))

        if (index == 4) {
        }
    }

    const focusInput = (index: number) => {
        const ref = input_refs[index]?.current

        if (ref) {
            try {
                ref.focus()
            } catch (error) {}
        }
    }

    const onVerifyPress = async () => {
        if (loading) return

        setLoading(true)
        try {
            const response = await api.post("/user/forgot_password/verify-code", {
                target: email,
                code: input_states.map((state) => Number(state[0])),
            })
            const recovery = response.data as Recovery | null
            if (recovery) {
                console.log(recovery)
                linkTo({ screen: "resetPassword", params: { email: recovery.target } })
            } else {
                setError(true)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const onResendPress = async () => {
        if (resendText != "Reenviar") return

        setResendText("Enviado")
        try {
            const response = await api.post("/user/forgot_password", { login: email })
        } catch (error) {
            console.log(error)
        } finally {
            setTimeout(() => setResendText("Reenviar"), 1000 * 60 * 1)
        }
    }

    useEffect(() => {
        if (input_states.every((state) => !!state[0])) {
            console.log("preencheu")
        }
    }, [input_states])

    return (
        <SectionWrapper>
            <Text>
                Enviamos um e-mail de redefinição para <Text style={{ color: colors.primary }}>{email}</Text>. digite o código de 5 dígitos mencionado
                no e-mail
            </Text>

            <View style={[{ flexDirection: "row", gap: 20, justifyContent: "center" }]}>
                {input_states.map((state, index) => (
                    <Input
                        key={index}
                        ref={input_refs[index]}
                        label={undefined}
                        mode="outlined"
                        style={[{ backgroundColor: "transparent", flex: 0.18, textAlign: "center" }]}
                        outlineStyle={[{ borderRadius: 5 }, error && { borderColor: theme.colors.error }]}
                        dense
                        returnKeyType={"next"}
                        maxLength={1}
                        value={state[0]}
                        onChangeText={(text) => onChangeText(text, index)}
                        keyboardType="numeric"
                        onSubmitEditing={() => (index == 4 ? onVerifyPress() : focusInput(index + 1))}
                    />
                ))}
            </View>
            {error && (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Icon size={20} source={"alert-circle"} />
                    <Text style={{ color: theme.colors.error, marginTop: -10 }}>Código inválido ou expirado</Text>
                </View>
            )}

            <Text style={{ alignSelf: "center" }}>
                Ainda não recebeu o e-mail?{" "}
                <TouchableOpacity onPress={onResendPress}>
                    <Text style={{ color: colors.primary, fontWeight: "bold", textDecorationLine: "underline" }}>{resendText}</Text>
                </TouchableOpacity>
            </Text>

            <TwoButtonsView>
                <Button mode="contained" onPress={onVerifyPress} loading={loading}>
                    Verificar código
                </Button>
                <LinkButton to="/login">Voltar</LinkButton>
            </TwoButtonsView>
        </SectionWrapper>
    )
}
