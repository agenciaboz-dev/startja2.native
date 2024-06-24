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

    return (
        <View style={{ flex: 1, marginHorizontal: -20 }}>
            <ResaleAccordion
                title="Clientes"
                onAddIconPress={() => setShowCustomerModal(true)}
                modal={<CustomerFormModal visible={showCustomerModal} onDismiss={() => setShowCustomerModal(false)} />}
            >
                <View style={[{ gap: 20, flex: 1 }]}>
                    <TextInput
                        mode="outlined"
                        dense
                        placeholder="Procurar por nome, CPF, CNPJ e..."
                        value={searchValue}
                        onChangeText={(text) => setSearchValue(text)}
                    />
                    <ScrollView style={{ maxHeight: 700 }}>
                        <FlatList
                            data={[1, 2, 3, 4, 5]}
                            renderItem={({ item }) => <CustomerComponent />}
                            keyExtractor={(item) => item.toString()}
                            style={{ margin: -20 }}
                            contentContainerStyle={[{ padding: 20, gap: 20 }]}
                        />
                    </ScrollView>
                </View>
            </ResaleAccordion>
        </View>
    )
}
