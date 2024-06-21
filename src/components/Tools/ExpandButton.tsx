import React from "react"
import { Button, IconButton, Surface } from "react-native-paper"

interface ExpandButtonProps {
    onPress: () => void
}

export const ExpandButton: React.FC<ExpandButtonProps> = ({ onPress }) => {
    return <IconButton icon="chevron-up" style={{}} onPress={onPress} />
}
