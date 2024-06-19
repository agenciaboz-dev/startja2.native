import React from "react"
import { Platform, View } from "react-native"
import { IconButton, Modal, Portal, Text, useTheme } from "react-native-paper"
import { colors } from "../../style/colors"
import { ModalTitle } from "../../components/ModalTitle"
import { useFormik } from "formik"
import { CustomerForm } from "../../types/server/class/Customer"

interface CustomerFormModalProps {
    visible: boolean
    onDismiss: () => void
}

export const CustomerFormModal: React.FC<CustomerFormModalProps> = ({ visible, onDismiss }) => {
    const theme = useTheme()

    const formik = useFormik<CustomerForm>({
        initialValues: {
            address: {
                cep: "",
                city: "",
                complement: "",
                district: "",
                number: "",
                street: "",
                uf: "",
            },
            business_name: "",
            certificate_password: "",
            discriminate_taxes: false,
            document: "",
            email: "",
            enable_nfce: false,
            enable_nfe: false,
            exempted: false,
            funrural: "paycheck",
            municipal_registration: "",
            name: "",
            next_nfe_number: "",
            nfe_series: "",
            permissions: {
                bank_accounts: 0,
                chart_accounts: 0,
                edit_permissions: false,
                enterprises: 0,
                invite_user: false,
                natures: 0,
                options: false,
                products: 0,
                properties: 0,
                report_nfe: 0,
                sold_products: 0,
                nfePermissions: {
                    emit: false,
                    edit: false,
                    cancel: false,
                    delete: false,
                    transmit: false,
                    clone: false,
                    adjust: false,
                    renderNumber: false,
                    manifest: false,
                    correctionLetter: false,
                    share: false,
                    download: false,
                    history: false,
                    save_view: false,
                },
            },
            phone: "",
            send_destinatary_mail: false,
            state_registration: "",
        },
        onSubmit(values, formikHelpers) {
            console.log(values)
        },
    })

    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={onDismiss}
                contentContainerStyle={[
                    {
                        backgroundColor: theme.colors.background,
                        alignSelf: "center",
                        padding: 20,
                        gap: 20,
                    },
                    Platform.OS == "web" ? { minWidth: 400 } : {},
                ]}
            >
                <ModalTitle title="Novo cliente" onDismiss={onDismiss} />

                <View style={[{ flexDirection: "row", gap: 20 }]}>
                    <View style={[{ flex: 1 }]}>
                        <Text>Cadastro</Text>
                    </View>
                    <View style={[{ flex: 1 }]}>
                        <Text>Endereço</Text>
                    </View>
                    <View style={[{ flex: 1 }]}>
                        <Text>Funrural</Text>
                    </View>
                </View>
            </Modal>
        </Portal>
    )
}
