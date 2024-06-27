import React, { useState } from "react"
import { StyleProp, View, ViewStyle } from "react-native"
import { Button, Divider, Icon, IconButton, Menu, Surface, Text, useTheme } from "react-native-paper"
import { colors } from "../../style/colors"
import { SortMenu } from "./SortMenu"

interface SortComponentProps {
    title?: string
    style?: StyleProp<ViewStyle>
    data: any[]
    setSortedData: React.Dispatch<React.SetStateAction<any[]>>
}

export const SortComponent: React.FC<SortComponentProps> = ({ title, style, data, setSortedData }) => {
    const [openSortModal, setOpenSortModal] = useState<boolean>(false)

    const onDismiss = () => {
        setOpenSortModal(false)
    }

    return (
        <>
            {title ? (
                <Menu
                    visible={openSortModal}
                    onDismiss={onDismiss}
                    anchor={
                        <Button
                            icon="swap-vertical"
                            onPress={() => setOpenSortModal(true)}
                            style={[
                                {
                                    backgroundColor: "white",
                                    borderColor: colors.grey,
                                    borderWidth: 1,
                                    borderRadius: 5,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    height: "auto",
                                },
                                style,
                            ]}
                        >
                            {title}
                        </Button>
                    }
                    contentStyle={{ padding: 0, backgroundColor: colors.box }}
                >
                    <SortMenu />
                </Menu>
            ) : (
                <Menu
                    visible={openSortModal}
                    onDismiss={onDismiss}
                    anchor={
                        <IconButton
                            icon="swap-vertical"
                            iconColor={colors.primary}
                            style={{ borderColor: colors.grey, borderWidth: 1, borderRadius: 5 }}
                            onPress={() => setOpenSortModal(true)}
                        />
                    }
                >
                    <SortMenu />
                </Menu>
            )}
            {/* <SortModal visible={openSortModal} onDismiss={onDismiss} /> */}
        </>
    )
}
