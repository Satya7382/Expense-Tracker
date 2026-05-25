import React, { useState } from 'react'
import { LuDownload } from 'react-icons/lu'
import moment from 'moment';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import Expense from '../../pages/Dashboard/Expense';
const ExpenseList = ({ transactions, onDelete, onDownload }) => {
    const [hoveredId, setHoveredId] = useState(null);
    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Expense List</h5>
                <button className='add-btn' onClick={onDownload}>
                    <LuDownload className='text-base' /> Download
                </button>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6'>

                {transactions.length === 0 ? (
                    <p className='text-center text-gray-500 col-span-full'>
                        No Expense records found.
                    </p>
                ) : (
                    transactions.map((expense) => (
                        <TransactionInfoCard
                            key={expense._id}
                            title={expense.category}
                            icon={expense.icon}
                            date={
                                expense.date
                                    ? moment(expense.date).format("Do MMM YYYY")
                                    : "No Date"
                            }
                            amount={expense.amount}
                            type="expense"
                            hideDeleteBtn={hoveredId !== expense._id}
                            onDelete={() => onDelete(expense._id)}
                            onMouseEnter={() => setHoveredId(expense._id)}
                            onMouseLeave={() => setHoveredId(null)}
                        />
                    ))
                )}
            </div>
        </div>
    )
}

export default ExpenseList
