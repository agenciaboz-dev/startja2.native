import React, { useEffect, useState } from "react"
import { Platform, ScrollView, View } from "react-native"
import { colors } from "../../style/colors"
import { UserCard } from "../../components/UserCard/UserCard"
import { IconButton, Text } from "react-native-paper"
import { useUser } from "../../hooks/useUser"
import { SystemWrapper } from "./SystemWrapper"
import { Redirect } from "../../components/Redirect"
import { Resale } from "../../types/server/class/Resale"
import { useResale } from "../../hooks/useResale"

interface SystemChooserProps {}

const Title: React.FC<{ children?: React.ReactNode; right?: React.ReactNode; description?: string }> = ({ children, right, description }) => (
    <View style={{ position: "relative", flexDirection: "row", alignItems: "center" }}>
        <View style={{ flex: 1 }}>
            <Text style={{ color: colors.primary, fontWeight: "bold" }} variant="headlineMedium">
                {children}
            </Text>
            {!!description && (
                <Text variant="bodyLarge" style={{}}>
                    {description}
                </Text>
            )}
        </View>
        {right}
    </View>
)

export const SystemChooser: React.FC<SystemChooserProps> = ({}) => {
    const { logout } = useUser()
    const { user } = useUser()
    const { fetchAllResales } = useResale()

    const [adminResales, setAdminResales] = useState<Resale[]>([])

    const fetchAdminResales = async () => {
        try {
            const data = await fetchAllResales()
            setAdminResales(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (user?.admin) {
            fetchAdminResales()
        }
    }, [user])

    return user ? (
        <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={[
                { padding: 20, paddingVertical: 50, gap: 20, position: "relative" },
                Platform.OS == "web" && { paddingHorizontal: 300, paddingVertical: 100 },
            ]}
        >
            <Title right={<IconButton size={30} style={{ margin: 0, position: "absolute", right: 0 }} icon={"close"} onPress={logout} />}>
                Conectado como
            </Title>
            <UserCard />

            <Title
                description="Você gerencia múltiplos sistemas. Por favor, selecione o sistema que deseja acessar a partir do painel abaixo para prosseguir com o
                login e utilizar os serviços associados."
            >
                Gestão de contas
            </Title>

            {user?.admin && <SystemWrapper name="Admin. Master" systems={[{ name: "Sistema", route: "/admin" }]} />}

            {user.admin ? (
                <SystemWrapper
                    name="Revendas"
                    systems={adminResales
                        .sort((a, b) => Number(b.created_at) - Number(a.created_at))
                        .map((item) => ({ name: item.name, route: item.id }))}
                />
            ) : (
                (!!user?.resales.length || !!user?.resalesManager.length) && (
                    <SystemWrapper
                        name="Revendas"
                        systems={[
                            ...user.resalesManager
                                .sort((a, b) => Number(b.created_at) - Number(a.created_at))
                                .map((item) => ({ name: item.name, route: item.id })),
                            ...user.resales
                                .sort((a, b) => Number(b.resale.created_at) - Number(a.resale.created_at))
                                .map((item) => ({ name: item.resale.name, route: item.resale_id })),
                        ]}
                    />
                )
            )}
        </ScrollView>
    ) : (
        <Redirect />
    )
}
