import React from "react"
import { Platform, Pressable, ScrollView, View } from "react-native"
import { Text } from "react-native-paper"
import { Logo } from "../../components/Logo"
import { Image } from "expo-image"
import { LoginComponent } from "./LoginComponent"
import { colors } from "../../style/colors"
import { LinksComponent } from "./LinksComponent"
import { DistributionStores } from "../../components/DistributionStores"

interface HomeProps {}

const LogoComponent = () => (
    <View style={[{ gap: 20 }, Platform.OS != "web" && { alignItems: "center" }]}>
        <Logo size={Platform.OS == "web" ? 50 : 80} />
        <View style={[{ flexDirection: "row" }]}>
            <Text variant={Platform.OS == "web" ? "displayMedium" : "titleMedium"} style={{}}>
                Levando <Text style={{ color: colors.primary, fontWeight: "bold" }}>soluções</Text> ao empreendedor do{" "}
                <Text style={{ color: colors.primary, fontWeight: "bold" }}>Agro</Text>
            </Text>
        </View>
    </View>
)

export const Home: React.FC<HomeProps> = ({}) => {
    return Platform.OS == "web" ? (
        <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flex: 0.4, padding: 50, gap: 20, paddingHorizontal: 150 }}>
                <LogoComponent />
                <LoginComponent />
                <LinksComponent />
                <DistributionStores />
            </View>
            <Image source={require("../../../assets/login_background.png")} style={{ flex: 1 }} />
        </View>
    ) : (
        <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ padding: 20, paddingTop: 100, gap: 20, flex: 1 }}
            keyboardShouldPersistTaps="handled"
        >
            <LogoComponent />
            <LoginComponent />
            <LinksComponent />
        </ScrollView>
    )
}
