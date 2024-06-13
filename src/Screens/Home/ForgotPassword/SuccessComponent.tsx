import React from "react"
import { View } from "react-native"
import { SectionWrapper } from "../SectionWrapper"
import { Icon, Text } from "react-native-paper"
import { colors } from "../../../style/colors"
import { LinkButton } from "../../../components/LinkButton"

interface SuccessComponentProps {}

export const SuccessComponent: React.FC<SuccessComponentProps> = ({}) => {
    return (
        <SectionWrapper style={{ alignItems: "center" }}>
            <Icon size={50} source={"check-decagram"} color={colors.primary} />
            <View style={{ alignItems: "center" }}>
                <Text>Sua senha foi alterada!</Text>
                <Text>Clique em continuar para fazer login</Text>
            </View>
            <LinkButton to="/login" button>
                Continuar
            </LinkButton>
        </SectionWrapper>
    )
}
