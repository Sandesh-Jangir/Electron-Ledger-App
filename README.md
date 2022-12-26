# Ledger

![](https://img.shields.io/badge/Electron-v.21.2.2-yellow?style=for-the-badge&logo=appveyor)

![](https://img.shields.io/badge/Mongoose-MongoDB-brightgreen?style=for-the-badge&logo=appveyor)

It is an `Electron GUI Application` in which you can track your transactions and get a performance report about your income, expense and balance over the whole timespan and current month.

## About Database
In current version the database used is `mongodb` and each document has 3 feilds exculding the `_id`. They are
1. Amount
2. Transaction Type [ i.e. credit or debit ]
3. Date 
