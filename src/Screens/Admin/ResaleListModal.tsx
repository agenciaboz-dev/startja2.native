import React from "react"
import { Platform } from "react-native"
import { Modal, Portal, Surface, useTheme } from "react-native-paper"

interface ResaleListModalProps {
    visible: boolean
    onDismiss: () => void
}

export const ResaleListModal: React.FC<ResaleListModalProps> = ({ visible, onDismiss }) => {
    const theme = useTheme()
    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={onDismiss}
                style={{
                    height: 200,
                    marginLeft: 145,
                    width: 400,
                }}
                contentContainerStyle={[
                    {
                        borderRadius: 15,
                        backgroundColor: theme.colors.background,
                    },
                    // Platform.OS == "web" ? {} : { marginBottom: keyboardVisible ? 0 : undefined },
                ]}
            >
                <Surface style={{ padding: 20, gap: 20, borderRadius: 15 }}>Teste</Surface>
            </Modal>
        </Portal>
    )
}
