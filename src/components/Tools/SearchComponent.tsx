import React, { useState } from "react"
import { Surface, TextInput } from "react-native-paper"
import { SystemComponentProp } from "../../types/SystemComponentProp"

interface SearchComponentProps {
    placeholder?: string
    data: any[]
    setFilteredData: React.Dispatch<React.SetStateAction<any[]>>
}

export const SearchComponent: React.FC<SearchComponentProps> = ({
    placeholder = "Procurar por nome, CPF, CNPJ, email...",
    data,
    setFilteredData,
}) => {
    const [search, setSearch] = useState("")
    const handleSearch = (text: string) => {
        setSearch(text)
        setFilteredData(data.filter((data) => data.name.toLowerCase().includes(search.toLowerCase())))
    }

    return (
        <TextInput
            mode="outlined"
            dense
            placeholder={placeholder}
            right={<TextInput.Icon icon="magnify" />}
            style={[{ flex: 1 }]}
            onChangeText={(text) => handleSearch(text)}
        />
    )
}
