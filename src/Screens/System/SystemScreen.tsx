import React from "react"
import { View } from "react-native"
import { Surface } from "react-native-paper"
import { ClienteHeaderToolbar } from "./ClientHeaderToolbar"
import { Statisticsbar } from "./StatisticsBar"

interface SystemScreenProps {
    displayStatistics: boolean
}

export const SystemScreen: React.FC<SystemScreenProps> = ({ displayStatistics }) => {
    return (
        <View style={{ flex: 1, flexDirection: "row", padding: 20, gap: 20 }}>
            <ClienteHeaderToolbar displayStatistics={displayStatistics} />
            {displayStatistics && <Statisticsbar />}
        </View>
    )
}
