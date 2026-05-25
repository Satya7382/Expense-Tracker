import React, { useState } from 'react'
import { LuDownload } from 'react-icons/lu'
import moment from 'moment';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
const IncomeList = ({ transactions, onDelete, onDownload }) => {
    const [hoveredId, setHoveredId] = useState(null);
    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Income List</h5>
                <button className='add-btn' onClick={onDownload}>
                    <LuDownload className='text-base' /> Download
                </button>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6'>

                {transactions.length === 0 ? (
                    <p className='text-center text-gray-500 col-span-full'>
                        No income records found.
                    </p>
                ) : (
                    transactions.map((income) => (
                        <TransactionInfoCard
                            key={income._id}
                            title={income.source}
                            icon={income.icon}
                            date={
                                income.date
                                    ? moment(income.date).format("Do MMM YYYY")
                                    : "No Date"
                            }
                            amount={income.amount}
                            type="income"
                            hideDeleteBtn={hoveredId !== income._id}
                            onDelete={() => onDelete(income._id)}
                            onMouseEnter={() => setHoveredId(income._id)}
                            onMouseLeave={() => setHoveredId(null)}
                        />
                    ))
                )}

            </div>
        </div>
    )
}

export default IncomeList
