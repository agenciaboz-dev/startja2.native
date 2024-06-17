import React from "react"
import { Platform, ScrollView, View } from "react-native"
import { colors } from "../../style/colors"
import { UserCard } from "../../components/UserCard/UserCard"
import { IconButton, Text } from "react-native-paper"
import { useUser } from "../../hooks/useUser"
import { SystemWrapper } from "./SystemWrapper"

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

    return (
        <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={[
                { flex: 1, padding: 20, paddingTop: 50, gap: 20, position: "relative" },
                Platform.OS == "web" && { paddingHorizontal: 300, paddingTop: 100 },
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

            {(!!user?.resales.length || !!user?.resalesManager.length) && (
                <SystemWrapper
                    name="Revendas"
                    systems={[
                        ...user.resalesManager.map((item) => ({ name: item.name, route: item.id })),
                        ...user.resales.map((item) => ({ name: item.resale.name, route: item.resale_id })),
                    ]}
                />
            )}
        </ScrollView>
    )
}
