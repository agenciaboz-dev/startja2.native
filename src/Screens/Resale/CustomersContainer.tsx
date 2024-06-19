import React, { useState } from "react"
import { View } from "react-native"
import { Resale } from "../../types/server/class/Resale"
import { ResaleAccordion } from "./ResaleAccordion"
import { TextInput } from "react-native-paper"

interface CustomersContainerProps {
    resale: Resale
}

export const CustomersContainer: React.FC<CustomersContainerProps> = ({ resale }) => {
    const [searchValue, setSearchValue] = useState("")

    return (
        <View style={{}}>
            <ResaleAccordion title="Clientes" onAddIconPress={() => null}>
                <TextInput
                    mode="outlined"
                    dense
                    placeholder="Procurar por nome, CPF, CNPJ e..."
                    value={searchValue}
                    onChangeText={(text) => setSearchValue(text)}
                />
            </ResaleAccordion>
        </View>
    )
}
