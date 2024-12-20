import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import userService from '@services/UserService';
import { Game } from '@types';
import PurchaseForm from '@components/PurchaseForm';

const PurchasePage: React.FC = () => {
    const router = useRouter();
    const [game, setGame] = useState<Game | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handlePurchase = async ({
        creditCardNumber,
        civ,
        nameOnCard,
        currency,
    }: {
        creditCardNumber: string;
        civ: string;
        nameOnCard: string;
        currency: string;
    }) => {
        if (game == null) {
            alert("Game could not be found");
            return;
        }

        const gameId = Number(game.id);
        if (isNaN(gameId)) {
            console.error("Invalid gameId");
            return;
        }

        try {
            await userService.addPurchase({ creditCardNumber, civ, nameOnCard, gameId });

            await userService.createPurchaseRecord({
                amount: game.price,
                currency,
                time: new Date().toISOString(),
                gameId,
            });

            alert("Purchase completed successfully! (your credit card info is in very safe hands)");
            setLoading(true);
            setTimeout(() => {
                router.push('/'); // Redirect after 2 seconds
            }, 2000);
        } catch (error) {
            console.error("Error during purchase:", error);
            alert("An error occurred during the purchase. Please try again.");
        }
    };

    useEffect(() => {
        if (router.query.game) {
            const gameData = JSON.parse(router.query.game as string);
            setGame(gameData);
        }
    }, [router.query.game]);

    if (loading) return <div>Loading...</div>;

    return <PurchaseForm game={game} onSubmit={handlePurchase} />;
};

export default PurchasePage;