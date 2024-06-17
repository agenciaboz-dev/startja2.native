import { ImagePickerAsset, MediaTypeOptions } from "expo-image-picker"
import React from "react"
import { View } from "react-native"
import { Button, Text, TouchableRipple } from "react-native-paper"
import { colors } from "../style/colors"
import { pickMedia } from "../tools/pickMedia"

interface ProfilePicInputProps {
    onPick: (media: ImagePickerAsset) => void
}

export const ProfilePicInput: React.FC<ProfilePicInputProps> = ({ onPick }) => {
    return (
        <TouchableRipple
            borderless
            style={[
                {
                    borderRadius: 100,
                    height: 100,
                    aspectRatio: 1,
                    borderWidth: 1,
                    borderStyle: "dashed",
                    justifyContent: "center",
                    alignItems: "center",
                    borderColor: colors.grey,
                },
            ]}
            onPress={() => pickMedia([1, 1], false, MediaTypeOptions.Images)}
        >
            <Text variant="labelSmall" style={[{ fontWeight: "bold", color: colors.grey }]}>
                Enviar imagem
            </Text>
        </TouchableRipple>
    )
}
