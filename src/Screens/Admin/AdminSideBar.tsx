import { Image } from "expo-image"
import React, { useEffect, useState } from "react"
import { Platform, View, NativeModules, FlatList } from "react-native"
import { Portal, Surface, Text, TouchableRipple } from "react-native-paper"
import { colors } from "../../style/colors"
import { api } from "../../backend/api"
import { Resale } from "../../types/server/class/Resale"
import { ResaleComponent } from "./ResaleComponent"
import { ResaleFormModal } from "./ResaleFormModal"
const { StatusBarManager } = NativeModules

interface AdminSideBarProps {}

export const AdminSideBar: React.FC<AdminSideBarProps> = ({}) => {
    const icon_size = Platform.OS == "web" ? 75 : 50

    const [loading, setLoading] = useState(true)
    const [resales, setResales] = useState<Resale[]>([])
    const [showResaleModal, setShowResaleModal] = useState(false)

    const fetchResales = async () => {
        setLoading(true)
        try {
            const response = await api.get("/resale/admin")
            setResales(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const onAddResalePress = () => {
        setShowResaleModal(true)
    }

    useEffect(() => {
        fetchResales()
    }, [])

    return (
        <Surface
            style={[
                { padding: 20, alignItems: "center", gap: 20 },
                Platform.OS == "web" ? { width: 125 } : { flexDirection: "row", paddingTop: Platform.OS == "ios" ? 20 : StatusBarManager.HEIGHT },
            ]}
        >
            <Image
                source={require("../../../assets/icon.png")}
                contentFit="contain"
                style={[{ borderRadius: 100, height: icon_size, aspectRatio: 1 }]}
            />

            <View
                style={[
                    { borderColor: colors.primary, borderWidth: 1 },
                    Platform.OS == "web" ? { width: icon_size * 0.7 } : { height: icon_size * 0.7 },
                ]}
            />

            <FlatList
                data={resales}
                renderItem={({ item }) => <ResaleComponent icon_size={icon_size} resale={item} />}
                keyExtractor={(item) => item.id}
                horizontal={Platform.OS != "web"}
                refreshing={loading}
                onRefresh={fetchResales}
                ListFooterComponent={
                    <TouchableRipple
                        borderless
                        style={[
                            { borderRadius: 100, height: icon_size, aspectRatio: 1, borderWidth: 1, justifyContent: "center", alignItems: "center" },
                        ]}
                        onPress={onAddResalePress}
                    >
                        <Text variant="headlineLarge">+</Text>
                    </TouchableRipple>
                }
            />

            <Portal>
                <ResaleFormModal visible={showResaleModal} onDismiss={() => setShowResaleModal(false)} />
            </Portal>
        </Surface>
    )
}
