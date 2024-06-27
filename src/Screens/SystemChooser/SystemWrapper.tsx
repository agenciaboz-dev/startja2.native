import React, { useEffect, useState } from "react"
import { LayoutAnimation, View, Text, Platform, Pressable } from "react-native"
import { SystemComponentProp } from "../../types/SystemComponentProp"
import { Button, List, Surface, useTheme } from "react-native-paper"
import { colors } from "../../style/colors"
import { SearchComponent } from "../../components/Tools/SearchComponent"
import { SortComponent } from "../../components/Tools/SortComponent"
import { ExpandButton } from "../../components/Tools/ExpandButton"
import { SystemContainer } from "./SystemContainer"

interface SystemWrapperProps {
    name: string
    systems: SystemComponentProp[]
}

export const SystemWrapper: React.FC<SystemWrapperProps> = ({ name, systems }) => {
    const theme = useTheme()
    const [expanded, setExpanded] = useState(true)
    const [filteredSystems, setFilteredSystems] = useState(systems)
    const [sortedSystems, setSortedSystems] = useState(systems)

    const onAccordionPress = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        setExpanded((value) => !value)
    }

    useEffect(() => {
        setFilteredSystems(systems)
    }, [systems])

    return (
        <Surface>
            <Pressable>
                {Platform.OS === "web" && (
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            backgroundColor: colors.box,
                            cursor: "auto",
                            padding: 20,
                        }}
                    >
                        <Text style={{ fontWeight: "bold", color: colors.grey }}>{name}</Text>
                        {name !== "Admin. Master" && (
                            <View style={{ flexDirection: "row", gap: 10 }}>
                                <SearchComponent placeholder="Procurar por nome" data={systems} setFilteredData={setFilteredSystems} />
                                {/* <SortComponent
                                    title="Ordenar"
                                    style={{ paddingHorizontal: "auto" }}
                                    data={systems}
                                    setFilteredData={setSortedSystems}
                                /> */}
                                <ExpandButton onPress={onAccordionPress} expanded={expanded} />
                            </View>
                        )}
                    </View>
                )}
                {Platform.OS !== "web" && (
                    <View
                        style={{
                            backgroundColor: colors.box,
                            cursor: "auto",
                            padding: 20,
                            gap: 10,
                        }}
                    >
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <Text style={{ fontWeight: "bold", color: colors.grey }}>{name}</Text>
                            {name !== "Admin. Master" && <ExpandButton onPress={onAccordionPress} expanded={expanded} />}
                        </View>
                        {name !== "Admin. Master" && (
                            <View style={{ flexDirection: "row", gap: 10 }}>
                                <SearchComponent placeholder="Procurar" data={systems} setFilteredData={setFilteredSystems} />
                                {/* <SortComponent title="Ordenar" style={{ paddingHorizontal: "auto" }} /> */}
                            </View>
                        )}
                    </View>
                )}
            </Pressable>
            {expanded && (
                <Surface style={{ padding: 20, gap: 10 }}>
                    {filteredSystems.map((item) => (
                        <SystemContainer key={item.route} name={item.name} route={item.route} />
                    ))}
                </Surface>
            )}
        </Surface>
    )
}
