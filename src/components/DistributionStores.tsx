import { Image } from "expo-image"
import React from "react"
import { TouchableOpacity, View } from "react-native"
import { Text, TouchableRipple, useTheme } from "react-native-paper"
import { colors } from "../style/colors"
import constants from "expo-constants"

interface DistributionStoresProps {}

const ItemContainer: React.FC<{ apple?: boolean }> = ({ apple }) => {
    const icon_size = 30

    return (
        <TouchableOpacity
            onPress={() => console.log("aa")}
            style={{
                borderRadius: 5,
                backgroundColor: "#000",
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                padding: 2,
                paddingHorizontal: 10,
            }}
        >
            <Image
                source={apple ? require(`../../assets/stores/apple-icon.png`) : require(`../../assets/stores/playstore-icon.png`)}
                style={{ width: icon_size, height: icon_size }}
                contentFit="contain"
            />
            <View style={{ justifyContent: "center" }}>
                <Text style={{ color: "#fff", fontSize: 10 }}>{apple ? "Download on the" : "GET IT ON"}</Text>
                <Text style={{ color: "#fff", fontSize: 15, lineHeight: 20 }} variant="titleLarge">
                    {apple ? "App Store" : "Google Play"}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export const DistributionStores: React.FC<DistributionStoresProps> = ({}) => {
    const theme = useTheme()
    const currentYear = new Date().getFullYear()

    return (
        <View
            style={{
                alignItems: "center",
                gap: 10,
                alignSelf: "center",
                paddingBottom: 50,
            }}
        >
            <Text>Obtenha o aplicativo</Text>
            <View style={{ flexDirection: "row", gap: 20 }}>
                <ItemContainer apple />
                <ItemContainer />
            </View>
            <View
                style={{
                    alignItems: "center",
                }}
            >
                <Text style={{ color: colors.grey }}>
                    v{constants.expoConfig?.version} @ {currentYear} | Start Já
                </Text>
                <Text style={{ color: colors.grey }}>Designed and powered by BOZ</Text>
                <Text style={{ color: colors.grey }}>Todos os direitos reservados</Text>
            </View>
        </View>
    )
}
