import { Image } from "expo-image"
import React, { useEffect, useState } from "react"
import { Platform, View, NativeModules, FlatList } from "react-native"
import { Portal, Surface, Text, TouchableRipple } from "react-native-paper"
import { colors } from "../../style/colors"
import { Resale } from "../../types/server/class/Resale"
import { ResaleComponent } from "./ResaleComponent"
import { ResaleFormModal } from "./ResaleFormModal"
import { useResale } from "../../hooks/useResale"
const { StatusBarManager } = NativeModules

interface AdminSideBarProps {}

export const AdminSideBar: React.FC<AdminSideBarProps> = ({}) => {
    const icon_size = Platform.OS == "web" ? 75 : 50
    const { fetchAllResales } = useResale()

    const [loading, setLoading] = useState(true)
    const [resales, setResales] = useState<Resale[]>([])
    const [showResaleModal, setShowResaleModal] = useState(false)

    const onNewResale = (resale: Resale) => {
        setResales([...resales.filter((item) => item.id != resale.id), resale])
    }

    const fetchResales = async () => {
        setLoading(true)
        try {
            const data = await fetchAllResales()
            setResales(data)
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
            <FlatList
                data={resales.sort((a, b) => Number(b.created_at) - Number(a.created_at))}
                renderItem={({ item }) => <ResaleComponent icon_size={icon_size} resale={item} />}
                keyExtractor={(item) => item.id}
                horizontal={Platform.OS != "web"}
                refreshing={loading}
                onRefresh={fetchResales}
                contentContainerStyle={[{ gap: 20 }]}
                ListHeaderComponent={
                    <View style={[{ alignItems: "center", gap: 20 }, Platform.OS !== "web" && { flexDirection: "row" }]}>
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
                    </View>
                }
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
                <ResaleFormModal visible={showResaleModal} onDismiss={() => setShowResaleModal(false)} onNewResale={onNewResale} />
            </Portal>
        </Surface>
    )
}
