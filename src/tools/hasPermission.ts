export const hasPermission = (flag: number, value: number) => {
    return (value & flag) !== 0
}
