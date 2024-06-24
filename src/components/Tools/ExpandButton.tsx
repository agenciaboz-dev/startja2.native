import React from "react"
import { Button, IconButton, Surface } from "react-native-paper"

interface ExpandButtonProps {
    onPress: () => void
    expanded: boolean
}

export const ExpandButton: React.FC<ExpandButtonProps> = ({ onPress, expanded }) => {
    return <IconButton icon={expanded ? "chevron-up" : "chevron-down"} style={{}} onPress={onPress} />
}
