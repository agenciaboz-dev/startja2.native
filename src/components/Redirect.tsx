import { useLinkTo } from "@react-navigation/native"
import React, { useEffect } from "react"
import { View } from "react-native"

interface RedirectProps {}

export const Redirect: React.FC<RedirectProps> = ({}) => {
    const linkTo = useLinkTo()

    useEffect(() => {
        setTimeout(() => linkTo("/"), 100)
    }, [])

    return null
}
