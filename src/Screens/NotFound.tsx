import { Image } from "expo-image"
import React from "react"
import { Platform, View } from "react-native"
import { Logo } from "../components/Logo"
import { Text } from "react-native-paper"
import { colors } from "../style/colors"
import { SectionWrapper } from "./Home/SectionWrapper"
import { LinkButton } from "../components/LinkButton"

interface NotFoundProps {}

export const NotFound: React.FC<NotFoundProps> = ({}) => {
    return (
        <View style={[{ flex: 1 }, Platform.OS == "web" ? { flexDirection: "row" } : {}]}>
            {Platform.OS == "web" && <Image source={require("../../assets/404_background.png")} style={{ flex: 0.55 }} contentFit="cover" />}
            <View style={[{ justifyContent: "center", alignItems: "center" }, Platform.OS == "web" ? { flex: 0.45 } : {}]}>
                <Logo size={50} />
                <Text style={{ color: colors.primary, fontWeight: "bold", fontSize: 250 }}>404</Text>
                <Text style={{ fontWeight: "bold", fontSize: 45 }}>Página não encontrada</Text>
                <SectionWrapper style={{ flexDirection: "row", marginTop: 20, alignItems: "center", marginHorizontal: 200 }}>
                    <LinkButton to="/" button>
                        Voltar
                    </LinkButton>
                    <Text style={{ fontSize: 15 }}>
                        Não encontramos a página que você procura. Clique no botão ao lado para voltar para o início.
                    </Text>
                </SectionWrapper>
            </View>
        </View>
    )
}
