export const getQueuePriority = (queue) => {
    const priorityPrefix = queue.charAt(0); // 'A' atau 'B'
    const number = parseInt(queue.slice(1), 10);
    return priorityPrefix === 'A' ? (number * 2) : (number * 2 + 1);
};

export const sortTransactionsByQueuePriority = (transactions) => {
    return transactions.sort((a, b) => getQueuePriority(a.queue) - getQueuePriority(b.queue));
};