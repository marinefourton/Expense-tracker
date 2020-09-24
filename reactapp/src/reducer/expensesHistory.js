export default function (history=[], action) {
    if (action.type === "saveExpenseHistory") {
        return action.history
    } else if (action.type ==="addExpense") {
        let historyCopy=[...history, action.expense];
        return historyCopy
    } else return history
}