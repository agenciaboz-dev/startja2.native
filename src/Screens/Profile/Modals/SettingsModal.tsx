import React, { useContext, useState } from "react"
import { Platform, View } from "react-native"
import { IconButton, Modal, Portal } from "react-native-paper"
import { colors } from "../../../style/colors"
import { OptionsMenu } from "../OptionsMenu"
import { OutOptions } from "../OutOptions"

interface SettingsModalProps {
    visible: boolean
    onDismiss: () => void
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ visible, onDismiss }) => {
    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={onDismiss}
                contentContainerStyle={[
                    {
                        backgroundColor: colors.box,
                        alignSelf: "center",
                        padding: 20,
                        borderRadius: 10,
                        height: "60%",
                        width: "90%",
                    },
                ]}
            >
                <View style={{ flex: 1, justifyContent: "space-between" }}>
                    <View style={{ flexDirection: "row" }}>
                        <OptionsMenu />
                        <IconButton
                            icon="close"
                            mode="contained"
                            containerColor={colors.primary}
                            iconColor="white"
                            style={{ marginLeft: -35, marginTop: -5 }}
                            onPress={onDismiss}
                        />
                    </View>
                    <OutOptions />
                </View>
            </Modal>
        </Portal>
    )
}
