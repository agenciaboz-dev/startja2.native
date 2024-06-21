import React, { useEffect, useState } from "react"
import { Platform, View } from "react-native"
import { Button, Icon, IconButton, Modal, Portal, Surface, Text, TextInput, useTheme } from "react-native-paper"
import { colors } from "../../style/colors"
import { useResale } from "../../hooks/useResale"
import { Resale } from "../../types/server/class/Resale"
import { ResaleCard } from "./ResaleCard"
import { useLinkTo } from "@react-navigation/native"
import { SearchComponent } from "../../components/Tools/SearchComponent"
import { SortComponent } from "../../components/Tools/SortComponent"

interface ResaleListModalProps {
    visible: boolean
    onDismiss: () => void
}

export const ResaleListModal: React.FC<ResaleListModalProps> = ({ visible, onDismiss }) => {
    const theme = useTheme()
    const { fetchAllResales } = useResale()
    const linkTo = useLinkTo()

    const [loading, setLoading] = useState(false)
    const [resales, setResales] = useState<Resale[]>([])
    const [selectedResale, setSelectedResale] = useState<Resale>()

    const fetchResales = async () => {
        setLoading(true)
        try {
            const data = await fetchAllResales()
            setResales(data)
            // setSelectedResale(data.sort((a, b) => Number(b.created_at) - Number(a.created_at))[0])
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const onSelectResale = (resale: Resale) => {
        setSelectedResale(resale)
        onDismiss()
    }

    useEffect(() => {
        if (selectedResale) {
            linkTo(`/admin?resale=${selectedResale.id}`)
        }
    }, [selectedResale])

    useEffect(() => {
        fetchResales()
    }, [])

    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={onDismiss}
                style={[
                    {
                        marginTop: 200,
                        marginLeft: 145,
                        height: 70,
                        width: 470,
                    },
                    Platform.OS !== "web" && {
                        marginTop: "25%",
                        marginLeft: 10,
                        marginRight: 10,
                        height: "auto",
                        width: "auto",
                    },
                ]}
                contentContainerStyle={[
                    {
                        borderRadius: 15,
                        backgroundColor: theme.colors.background,
                    },
                    // Platform.OS == "web" ? {} : { marginBottom: keyboardVisible ? 0 : undefined },
                ]}
            >
                <View style={{ padding: 20, gap: 20, borderRadius: 15 }}>
                    <View style={{ flexDirection: "row", gap: 10 }}>
                        {/* <TextInput
                            mode="outlined"
                            dense
                            placeholder="Procurar por nome, CPF, CNPJ, email..."
                            value={searchValue}
                            onChangeText={(text) => setSearchValue(text)}
                            right={<TextInput.Icon icon="magnify" />}
                            style={[{ flex: 1 }]}
                        /> */}
                        <SearchComponent />
                        <SortComponent />
                        {/* <View style={[{ borderColor: colors.grey, borderWidth: 1, borderRadius: 5 }]}>
                            <IconButton icon="swap-vertical" iconColor={theme.colors.primary} />
                        </View> */}
                    </View>
                    <View style={[{ gap: 10 }]}>
                        <Text style={{ color: colors.dark }}>Revendas</Text>
                        <View style={[{ gap: 5 }]}>
                            {resales.map((resale) => (
                                <ResaleCard resale={resale} onPress={onSelectResale} />
                            ))}
                        </View>
                    </View>
                </View>
            </Modal>
        </Portal>
    )
}
