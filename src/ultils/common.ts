
export const GenStatus = (status: number): string => {
    switch (status) {
        case 1:
            return '<div style="color: red;">Hello, World!</div>';
        case 2:
            return '<div style="color: red;">Hello, World!</div>';

        case 3:
            return '<div style="color: red;">Hello, World!</div>';

        case 4:
            return '<div>Hello, World!</div>';
        case 5:
            return '<div>Hello, World!</div>';
        case 6:
            return '<div>Hello, World!</div>';
        case 7:
            return '<div>Hello, World!</div>';
        default:
            return '';
    }
};
export const GenClassStatus = (status: number): string => {
    switch (status) {
        case 1:
            return 'PREPARE_GOODS';
        case 2:
            return 'SHIPPED';
        case 3:
            return 'CANCELLED';
        case 4:
            return 'RETURNS_PRODUCT';
        case 5:
            return 'PARTIAL_REFUND';
        case 6:
            return 'THE_RETURN_PERIOD';
        default:
            return 'DONE';
    }
};