import { Image } from "expo-image"
import React from "react"
import { TouchableOpacity, View } from "react-native"
import { Text, TouchableRipple, useTheme } from "react-native-paper"

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

    return (
        <View
            style={{
                alignItems: "center",
                padding: 10,
                backgroundColor: "#F2F3F5",
                borderRadius: 5,
                gap: 10,
                alignSelf: "center",
            }}
        >
            <Text>Obtenha o aplicativo</Text>
            <View style={{ flexDirection: "row", gap: 20 }}>
                <ItemContainer apple />
                <ItemContainer />
            </View>
        </View>
    )
}
