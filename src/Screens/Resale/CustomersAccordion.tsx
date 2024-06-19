import React, { useState } from "react"
import { View } from "react-native"
import { Resale } from "../../types/server/class/Resale"
import { ResaleAccordion } from "./ResaleAccordion"
import { TextInput } from "react-native-paper"
import { CustomerComponent } from "./CustomerComponent"

interface CustomersAccordionProps {
    resale: Resale
}

export const CustomersAccordion: React.FC<CustomersAccordionProps> = ({ resale }) => {
    const [searchValue, setSearchValue] = useState("")

    return (
        <View style={{}}>
            <ResaleAccordion title="Clientes" onAddIconPress={() => null}>
                <View style={[{ gap: 20 }]}>
                    <TextInput
                        mode="outlined"
                        dense
                        placeholder="Procurar por nome, CPF, CNPJ e..."
                        value={searchValue}
                        onChangeText={(text) => setSearchValue(text)}
                    />
                    <CustomerComponent />
                    <CustomerComponent />
                </View>
            </ResaleAccordion>
        </View>
    )
}
