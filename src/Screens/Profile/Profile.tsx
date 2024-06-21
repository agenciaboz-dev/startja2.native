import React from "react"
import { Button, Surface } from "react-native-paper"
// import chalk from "chalk"

interface ProfileProps {}

export const Profile: React.FC<ProfileProps> = ({}) => {
    // const onPress = () => {
    //     console.log(chalk.blue("Hello world!"))
    // }

    return (
        <Surface style={{ flex: 1 }}>
            <Button
                onPress={() => {
                    // onPress
                    console.log("imprimiu")
                }}
            >
                Teste
            </Button>
        </Surface>
    )
}
