import React, { useEffect, useRef, useState } from "react"
import { TextInput, View } from "react-native"
import { SectionWrapper } from "../SectionWrapper"
import { Text, TextInput as Input, Button } from "react-native-paper"
import { RouteProp } from "@react-navigation/native"
import { colors } from "../../../style/colors"
import { TwoButtonsView } from "../../../components/TwoButtonsView"
import { LinkButton } from "../../../components/LinkButton"

interface CodeVerificationProps {
    route: RouteProp<any, any>
}

export const CodeVerification: React.FC<CodeVerificationProps> = ({ route }) => {
    const email = route.params?.email

    const input_states = new Array(5).fill(null).map(() => useState(""))
    const input_refs = new Array(5).fill(null).map(() => useRef<TextInput>(null))

    const onChangeText = (text: string, index: number) => {
        if (isNaN(Number(text))) return

        const setState = input_states[index][1]
        setState(text)
        focusInput(index + (!!text ? 1 : -1))
    }

    const focusInput = (index: number) => {
        const ref = input_refs[index]?.current

        if (ref) {
            try {
                ref.focus()
            } catch (error) {}
        }
    }

    const onVerifyPress = async () => {}

    useEffect(() => {
        if (input_states.every((state) => !!state[0])) {
            console.log("preencheu")
        }
    }, [input_states])

    return (
        <SectionWrapper>
            <Text>
                Enviamos um link de redefinição para <Text style={{ color: colors.primary }}>{email}</Text>. digite o código de 5 dígitos mencionado
                no e-mail
            </Text>

            <View style={{ flexDirection: "row", gap: 10 }}>
                {input_states.map((state, index) => (
                    <Input
                        key={index}
                        ref={input_refs[index]}
                        label={undefined}
                        mode="outlined"
                        style={[{ backgroundColor: "transparent", flexShrink: 0 }]}
                        outlineStyle={{
                            borderRadius: 5,
                        }}
                        dense
                        returnKeyType={"next"}
                        maxLength={1}
                        value={state[0]}
                        onChangeText={(text) => onChangeText(text, index)}
                        keyboardType="numeric"
                        onSubmitEditing={() => focusInput(index + 1)}
                    />
                ))}
            </View>

            <TwoButtonsView>
                <Button mode="contained" onPress={onVerifyPress}>
                    Verificar código
                </Button>
                <LinkButton to="/login">Voltar</LinkButton>
            </TwoButtonsView>
        </SectionWrapper>
    )
}
