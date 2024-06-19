import React, { useEffect, useState } from "react"
import { Platform, View } from "react-native"
import { Button, Icon, IconButton, Modal, Portal, Surface, Text, TextInput, useTheme } from "react-native-paper"
import { colors } from "../../style/colors"
import { useResale } from "../../hooks/useResale"
import { Resale } from "../../types/server/class/Resale"
import { ResaleCard } from "./ResaleCard"

interface ResaleListModalProps {
    visible: boolean
    onDismiss: () => void
}

export const ResaleListModal: React.FC<ResaleListModalProps> = ({ visible, onDismiss }) => {
    const theme = useTheme()
    const { fetchAllResales } = useResale()

    const [loading, setLoading] = useState(false)
    const [resales, setResales] = useState<Resale[]>([])

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

    useEffect(() => {
        fetchResales()
    }, [])

    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={onDismiss}
                style={{
                    marginTop: 200,
                    marginLeft: 145,
                    height: 70,
                    width: 470,
                }}
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
                        <TextInput
                            mode="outlined"
                            dense
                            placeholder="Procurar por nome, CPF, CNPJ, email..."
                            // value={searchValue}
                            // onChangeText={(text) => setSearchValue(text)}
                            right={<TextInput.Icon icon="magnify" />}
                            style={[{ flex: 1 }]}
                        />
                        <View style={[{ borderColor: colors.grey, borderWidth: 1, borderRadius: 5 }]}>
                            <IconButton icon="swap-vertical" iconColor={theme.colors.primary} />
                        </View>
                    </View>
                    {resales.map((resale) => (
                        <ResaleCard resale={resale} />
                    ))}
                </View>
            </Modal>
        </Portal>
    )
}
