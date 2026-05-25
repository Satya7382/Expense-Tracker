import moment from "moment";

const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

const addThousandsSeparator = (num) => {
    if (num === undefined || num === null) return '';
    const [integerPart, decimalPart] = num.toString().split('.');
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
}

const prepareIncomeBarChartData = (data = []) => {
    const sortedData = [...data].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
    );
    const chartData = sortedData.map((item) => ({
        date: moment(item?.date).format('Do MMM'),
        amount: item?.amount,
        source: item?.source,
    }));
    return chartData;
}

const prepareExpenseBarChartData = (data = []) => {
    const sortedData = [...data].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
    );
    const chartData = sortedData.map((item) => ({
        date: moment(item?.date).format('Do MMM'),
        amount: item?.amount,
        source: item?.source,
    }));
    return chartData;
}
export { validateEmail, addThousandsSeparator , prepareIncomeBarChartData, prepareExpenseBarChartData}