import React from "react"
import { Surface, TextInput } from "react-native-paper"

interface SearchComponentProps {
    placeholder?: string
}

export const SearchComponent: React.FC<SearchComponentProps> = ({ placeholder = "Procurar por nome, CPF, CNPJ, email..." }) => {
    return (
        <TextInput
            mode="outlined"
            dense
            placeholder={placeholder}
            // value={searchValue}
            // onChangeText={(text) => setSearchValue(text)}
            right={<TextInput.Icon icon="magnify" />}
            style={[{ flex: 1 }]}
            // onChange={(e) => console.log(e.target.value)}
            onPress={() => console.log("clicando no searchField")}
        />
    )
}
