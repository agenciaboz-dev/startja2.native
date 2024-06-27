import React from "react"
import { Platform, ScrollView, SectionList, View } from "react-native"
import { Button, Divider, Surface, Text } from "react-native-paper"
import { OptionsMenu } from "./OptionsMenu"
import { colors } from "../../style/colors"
import { OutOptions } from "./OutOptions"
import { ProfileView } from "./ProfileView"

interface ProfileProps {}

export const Profile: React.FC<ProfileProps> = ({}) => {
    return Platform.OS === "web" ? (
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
    ) : (
        <ScrollView style={{}}>
            <View style={{ paddingTop: 20, paddingBottom: 40 }}>
                <ProfileView />
            </View>
        </ScrollView>
    )
}
