import { ImagePickerAsset, MediaTypeOptions } from "expo-image-picker"
import React from "react"
import { View } from "react-native"
import { Button, Text, TouchableRipple } from "react-native-paper"
import { colors } from "../style/colors"
import { pickMedia } from "../tools/pickMedia"
import { Image } from "expo-image"

interface ProfilePicInputProps {
    onPick: (media: ImagePickerAsset) => void
    profilePic: ImagePickerAsset | null
}

export const ProfilePicInput: React.FC<ProfilePicInputProps> = ({ onPick, profilePic }) => {
    const onPress = async () => {
        const result = await pickMedia([1, 1], false, MediaTypeOptions.Images)
        if (result) {
            const image = result[0]
            onPick(image)
        }
    }
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
                    position: "relative",
                },
            ]}
            onPress={onPress}
        >
            <>
                <Image source={profilePic?.uri} contentFit="cover" style={{ height: 100, aspectRatio: 1, borderRadius: 100 }} />
                <Text variant="labelSmall" style={[{ fontWeight: "bold", color: colors.grey, position: "absolute" }]}>
                    Enviar imagem
                </Text>
            </>
        </TouchableRipple>
    )
}
