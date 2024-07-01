import React from "react"
import { Button, Surface } from "react-native-paper"

interface StatisticsbarProps {}

export const Statisticsbar: React.FC<StatisticsbarProps> = ({}) => {
    return (
        <Surface style={{ flex: 0.25 }}>
            <Button icon="page-first">Estatísticas Cliente</Button>
        </Surface>
    )
}
