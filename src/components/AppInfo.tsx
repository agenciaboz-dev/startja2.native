import React from "react"
import { Platform, View } from "react-native"
import { Text } from "react-native-paper"
import { colors } from "../style/colors"
import constants from "expo-constants"

interface AppInfoProps {}

export const AppInfo: React.FC<AppInfoProps> = ({}) => {
    const currentYear = new Date().getFullYear()

    return (
        <View
            style={[
                {
                    alignItems: "center",
                    alignSelf: "center",
                    paddingVertical: 20,
                },
                Platform.OS == "web" && { paddingTop: 15, paddingBottom: 50 },
            ]}
        >
            <View
                style={{
                    alignItems: "center",
                }}
            >
                <Text style={{ color: colors.grey, fontSize: 12 }}>
                    v{constants.expoConfig?.version} © {currentYear} Start Já . Todos os direitos reservados
                </Text>
                <Text style={{ color: colors.grey, fontSize: 12 }}>Designed and powered by BOZ</Text>
            </View>
        </View>
    )
}
