export const phoneMask = (phone: string): string => {
    if (phone.length > 5) {
        return "*".repeat(phone.length - 5) + phone.substring(phone.length - 5)
    }
    return phone
}
