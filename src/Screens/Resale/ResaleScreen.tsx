import { RouteProp } from "@react-navigation/native"
import React, { useEffect, useState } from "react"
import { Platform, ScrollView, View } from "react-native"
import { Resale } from "../../types/server/class/Resale"
import { useResale } from "../../hooks/useResale"
import { User } from "../../types/server/class"
import { Divider, IconButton, Surface, Text } from "react-native-paper"
import { colors } from "../../style/colors"
import { ManagersContainer } from "./ManagersContainer"
import { CustomersAccordion } from "./CustomersAccordion"
import { ResaleListModal } from "../Admin/ResaleListModal"
import { ProfileCard } from "../Settings/ProfileCard"

interface ResaleScreenProps {
    route: RouteProp<any, any>
    displayStatistics: boolean
    setDisplayStatistics: React.Dispatch<React.SetStateAction<boolean>>
}

export const ResaleScreen: React.FC<ResaleScreenProps> = ({ route, displayStatistics, setDisplayStatistics }) => {
    const resale_id = route.params?.resale
    const { fetchManagers, fetchResale } = useResale()

    const [loading, setLoading] = useState(true)
    const [resale, setResale] = useState<Resale>()
    const [managers, setManagers] = useState<User[]>([])
    const [resaleListModalOpen, setResaleListModalOpen] = useState(false)
    const onAddManager = (user: User) => {
        setManagers((users) => [...users.filter((item) => item.id != user.id), user])
    }

    const refresh = async () => {
        try {
            const resale = await fetchResale(resale_id)
            setResale(resale)
            console.log(resale)

            const managers = await fetchManagers(resale_id)
            console.log(managers)
            setManagers(managers)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        console.log(resale_id)
        if (resale_id) {
            refresh()
        }
    }, [resale_id])

    return (
        <Surface
            style={[
                { paddingHorizontal: 20 },
                Platform.OS === "web" && { width: 350, justifyContent: "space-between" },
                Platform.OS !== "web" && { flex: 1 },
            ]}
        >
            <View style={[{ flexDirection: "row", paddingVertical: 10, justifyContent: "space-between", alignItems: "center" }]}>
                <View style={[{ flexDirection: "row", alignItems: "center" }, Platform.OS === "web" ? { maxWidth: "75%" } : { maxWidth: "60%" }]}>
                    <Text variant="headlineSmall" ellipsizeMode="tail" numberOfLines={1} style={[{ fontWeight: "bold", color: colors.grey }]}>
                        {resale?.name}
                    </Text>
                    <IconButton icon={"unfold-more-horizontal"} onPress={() => setResaleListModalOpen(true)} />
                </View>
                <View style={[{ flexDirection: "row" }]}>
                    <IconButton icon={"poll"} style={{ margin: 0 }} onPress={() => setDisplayStatistics(!displayStatistics)} />
                    <IconButton icon={"cog"} style={{ margin: 0 }} />
                </View>
            </View>
            <Divider style={[Platform.OS !== "web" && { marginHorizontal: -20 }]} />
            <ScrollView style={{ paddingBottom: 20 }}>
                {resale && <ManagersContainer managers={managers} resale={resale} onAddManager={onAddManager} />}
                {resale && <CustomersAccordion resale={resale} />}
            </ScrollView>
            <Divider style={[Platform.OS !== "web" && { marginHorizontal: -20 }]} />
            {Platform.OS === "web" && <ProfileCard />}
            <ResaleListModal visible={resaleListModalOpen} onDismiss={() => setResaleListModalOpen(false)} />
        </Surface>
    )
}
