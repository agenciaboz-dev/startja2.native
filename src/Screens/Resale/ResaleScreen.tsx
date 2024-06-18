import { RouteProp } from "@react-navigation/native"
import React, { useEffect, useState } from "react"
import { Platform, ScrollView, View } from "react-native"
import { Resale } from "../../types/server/class/Resale"
import { useResale } from "../../hooks/useResale"
import { User } from "../../types/server/class"
import { IconButton, Surface, Text } from "react-native-paper"
import { colors } from "../../style/colors"
import { ManagersContainer } from "./ManagersContainer"

interface ResaleScreenProps {
    route: RouteProp<any, any>
}

export const ResaleScreen: React.FC<ResaleScreenProps> = ({ route }) => {
    const resale_id = route.params?.resale
    const { fetchManagers, fetchResale } = useResale()

    const [loading, setLoading] = useState(true)
    const [resale, setResale] = useState<Resale>()
    const [managers, setManagers] = useState<User[]>([])

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
        <Surface style={[{ padding: 20 }, Platform.OS == "web" && { width: 350 }]}>
            <View style={[{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }]}>
                <Text variant="headlineSmall" style={[{ fontWeight: "bold", color: colors.grey }]}>
                    {resale?.name}
                </Text>
                <View style={[{ flexDirection: "row" }]}>
                    <IconButton icon={"poll"} style={{ margin: 0 }} />
                    <IconButton icon={"cog"} style={{ margin: 0 }} />
                </View>
            </View>

            {resale && <ManagersContainer managers={managers} resale={resale} onAddManager={onAddManager} />}
        </Surface>
    )
}
