import React, { useState } from "react"
import { User } from "../types/server/class"

export const validationErrors = {
    required: "Campo obrigatório.",
    shortField: (fieldName: string) => `O campo ${fieldName} deve conter ao menos 3 caracteres.`,
    mediumField: (fieldName: string) => `O campo ${fieldName} deve conter ao menos 5 caracteres.`,
    invalidName: "Por favor, insira um nome de usuário válido. Evite usar caracteres especiais ou símbolos.",
    invalidEmail: "Por favor, forneça um endereço de email válido.",
    invalidPhone: "Por favor, forneça um número de telefone válido. Deve conter apenas números e ter o formato correto para seu país.",
    invalidPasswordConfirmation: "Senha incorreta. Por favor, digite a senha atual para autorizar a mudança.",
    invalidEmailConfirmation: "O endereço de email inserido não corresponde ao seu email atual.",
    invalidPhoneConfirmation: "O número de telefone inserido não corresponde ao seu telefone atual.",
}

export const validatePassword = async (
    currentPassword: string,
    user: User,
    setPasswordError: React.Dispatch<React.SetStateAction<boolean>>
): Promise<boolean> => {
    if (currentPassword !== user!.password) {
        setPasswordError(true)
        return false
    } else {
        setPasswordError(false)
        return true
    }
}

export const validateEmail = async (
    currentEmail: string,
    user: User,
    setEmailError: React.Dispatch<React.SetStateAction<boolean>>
): Promise<boolean> => {
    if (currentEmail !== user!.email) {
        setEmailError(true)
        return false
    } else {
        setEmailError(false)
        return true
    }
}

export const validatePhone = async (
    currentPhone: string,
    user: User,
    setPhoneError: React.Dispatch<React.SetStateAction<boolean>>
): Promise<boolean> => {
    if (currentPhone !== user!.phone) {
        setPhoneError(true)
        return false
    } else {
        setPhoneError(false)
        return true
    }
}
