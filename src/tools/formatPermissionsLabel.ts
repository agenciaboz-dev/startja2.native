export const formatPermissionsLabel = (key: string) => {
    const values = {
        customers: "Clientes",
        natures: "Naturezas de operação",
        products: "Produtos",
    }

    // @ts-ignore
    return values[key]
}
