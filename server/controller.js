let monthlyBills = []

module.exports = {
    getItems: (req, res) => {
        res.status(200).send(monthlyBills)
    },
    addItem: (req, res) => {
        let { id, name, amount } = req.body
        let billObj = {
            id: id,
            name: name,
            amount: amount
        }
        monthlyBills.push(billObj)
        res.status(200).send(monthlyBills)
    },
    deleteItem: (req, res) => {
        let index = monthlyBills.findIndex(bill => bill.id === +req.params.id)
        monthlyBills.splice(index, 1)
        res.status(200).send(monthlyBills)
    }
}