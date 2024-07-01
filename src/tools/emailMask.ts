export const emailMask = (email: string): string => {
    const [localPart, domain] = email.split("@")
    let maskedLocalPart = localPart
    let maskedDomain = domain

    if (localPart.length > 2) {
        maskedLocalPart = localPart.substring(0, 2) + "*".repeat(localPart.length - 2)
    } else {
        maskedLocalPart = "*".repeat(localPart.length)
    }

    if (domain.indexOf(".") > 2) {
        const domainParts = domain.split(".")
        const domainName = domainParts[0]
        const topLevelDomain = domainParts.slice(1).join(".")

        if (domainName.length > 2) {
            maskedDomain = domainName.substring(0, 2) + "*".repeat(domainName.length - 2) + "." + topLevelDomain
        } else {
            maskedDomain = "*".repeat(domainName.length) + "." + topLevelDomain
        }
    } else {
        maskedDomain = "*".repeat(domain.indexOf(".")) + domain.substring(domain.indexOf("."))
    }

    return maskedLocalPart + "@" + maskedDomain
}
