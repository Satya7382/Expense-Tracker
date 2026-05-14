import React from 'react';
import moment from 'moment';
import { LuArrowRight } from 'react-icons/lu';

import TransactionInfoCard from '../Cards/TransactionInfoCard';

const IncomeTransactions = ({ transactions = [], onSeeMore }) => {
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Income</h5>

                <button
                    className="card-btn flex items-center gap-1"
                    onClick={onSeeMore}
                >
                    See All
                    <LuArrowRight className="text-base" />
                </button>
            </div>

            <div className="mt-6 space-y-4">
                {transactions.slice(0, 5).map((income) => (
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
                        hideDeleteBtn={true}
                    />
                ))}
            </div>
        </div>
    );
};

export default IncomeTransactions;