export function numberToDollarString(number) {
    const re = new RegExp('(\\d+\\.\\d{2})(\\d)');
    const match = number.toString().match(re);
    const truncatedNumber =  match ? parseFloat(match[1]) : number.valueOf();
    return '$' + truncatedNumber.toLocaleString();
}
