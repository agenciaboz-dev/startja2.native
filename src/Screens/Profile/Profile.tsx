import React from "react"
import { SectionList, View } from "react-native"
import { Button, Divider, Surface, Text } from "react-native-paper"
import { OptionsMenu } from "./OptionsMenu"
import { colors } from "../../style/colors"
import { OutOptions } from "./OutOptions"
import { ProfileView } from "./ProfileView"

interface ProfileProps {}

export const Profile: React.FC<ProfileProps> = ({}) => {
    return (
        <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flex: 0.35, borderRightColor: colors.primary, borderRightWidth: 1 }}>
                <OptionsMenu style={{ flex: 1 }} />
                <View style={{ flex: 0.2 }}>
                    <OutOptions />
                </View>
            </View>
            <View style={{ flex: 0.65 }}>
                <ProfileView />
            </View>
        </View>
    )
}
