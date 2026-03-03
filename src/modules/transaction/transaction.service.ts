import { prisma } from "../../config/prisma";

export const transfer = async (
  userId: string,
  toWalletId: string,
  amount: number
) => {
  return prisma.$transaction(async (tx) => {
    const senderWallet = await tx.wallet.findFirst({
      where: { userId }
    });

    if (!senderWallet || senderWallet.balance < amount) {
      throw new Error("Insufficient balance");
    }

    const transaction = await tx.transaction.create({
      data: {
        fromWalletId: senderWallet.id,
        toWalletId,
        amount,
        type: "TRANSFER",
        status: "INITIATED"
      }
    });

    await tx.wallet.update({
      where: { id: senderWallet.id },
      data: { balance: { decrement: amount } }
    });

    await tx.wallet.update({
      where: { id: toWalletId },
      data: { balance: { increment: amount } }
    });

    await tx.ledgerEntry.createMany({
      data: [
        {
          transactionId: transaction.id,
          walletId: senderWallet.id,
          entryType: "DEBIT",
          amount
        },
        {
          transactionId: transaction.id,
          walletId: toWalletId,
          entryType: "CREDIT",
          amount
        }
      ]
    });

    await tx.transaction.update({
      where: { id: transaction.id },
      data: { status: "SUCCESS" }
    });

    return transaction;
  });
};