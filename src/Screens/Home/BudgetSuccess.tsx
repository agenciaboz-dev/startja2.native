import React from "react"
import { Platform, View } from "react-native"
import { Icon, Text, useTheme } from "react-native-paper"
import { LinkButton } from "../../components/LinkButton"
import { colors } from "../../style/colors"

interface BudgetSuccessProps {}

export const BudgetSuccess: React.FC<BudgetSuccessProps> = ({}) => {
    const theme = useTheme()
    return (
        <View
            style={[
                { gap: 20, borderTopColor: theme.colors.outlineVariant, borderTopWidth: 1, alignItems: "center", paddingTop: 20 },
                Platform.OS != "web" && { gap: 10 },
            ]}
        >
            <Icon size={50} source={"check-decagram"} color={colors.primary} />
            <View style={{ alignItems: "center" }}>
                <Text>Seu pedido de orçamento foi enviado com sucesso!</Text>
                <Text>Nossa equipe entrará em contato em breve.</Text>
            </View>
            <LinkButton to="/login" button>
                Voltar
            </LinkButton>
        </View>
    )
}
