import React, { useState } from "react"
import { FlatList, View, ScrollView } from "react-native"
import { Resale } from "../../types/server/class/Resale"
import { ResaleAccordion } from "./ResaleAccordion"
import { TextInput } from "react-native-paper"
import { CustomerComponent } from "./CustomerComponent"
import { CustomerFormModal } from "./CustomerFormModal"

interface CustomersAccordionProps {
    resale: Resale
}

export const CustomersAccordion: React.FC<CustomersAccordionProps> = ({ resale }) => {
    const [searchValue, setSearchValue] = useState("")
    const [showCustomerModal, setShowCustomerModal] = useState(false)
    const data = [1, 2, 3, 4, 5]

    return (
        <View style={{ marginHorizontal: -20 }}>
            <ResaleAccordion
                title="Clientes"
                onAddIconPress={() => setShowCustomerModal(true)}
                modal={<CustomerFormModal visible={showCustomerModal} onDismiss={() => setShowCustomerModal(false)} />}
            >
                <View style={[{ gap: 20 }]}>
                    <TextInput
                        mode="outlined"
                        dense
                        placeholder="Procurar por nome, CPF, CNPJ..."
                        value={searchValue}
                        onChangeText={(text) => setSearchValue(text)}
                    />
                    <View style={{ gap: 20 }}>
                        {data.map((item) => (
                            <CustomerComponent key={item.toString()} />
                        ))}
                    </View>
                </View>
            </ResaleAccordion>
        </View>
    )
}
