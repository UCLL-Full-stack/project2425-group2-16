import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import userService from '@services/UserService';
import { Game } from '@types';

const PurchasePage: React.FC = () => {
    const router = useRouter();
    const [creditCardNumber, setCreditCardNumber] = useState('');
    const [civ, setCiv] = useState('');
    const [nameOnCard, setNameOnCard] = useState('');
    const [currency, setCurrency] = useState('USD');
    const [game, setGame] = useState<Game | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault(); 

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

    return (
        <div className={"buy-container"}>
            <h1 className={"buy-header"}>Purchase Game</h1>
            <form onSubmit={handleSubmit} className={"buy-form"}>
                <div className={"buy-formGroup"}>
                    <label htmlFor="creditCardNumber" className={"buy-label"}>Credit Card Number</label>
                    <input
                        type="tel"
                        id="creditCardNumber"
                        value={creditCardNumber}
                        onChange={(e) => setCreditCardNumber(e.target.value)}
                        required
                        className={"buy-input"}
                    />
                </div>

                <div className={"buy-formGroup"}>
                    <label htmlFor="civ" className={"buy-label"}>CIV</label>
                    <input
                        type="tel"
                        id="civ"
                        value={civ}
                        onChange={(e) => setCiv(e.target.value)}
                        required
                        className={"buy-input"}
                    />
                </div>

                <div className={"buy-formGroup"}>
                    <label htmlFor="nameOnCard" className={"buy-label"}>Name on the Card</label>
                    <input
                        type="text"
                        id="nameOnCard"
                        value={nameOnCard}
                        onChange={(e) => setNameOnCard(e.target.value)}
                        required
                        className={"buy-input"}
                    />
                </div>

                <div className={"buy-formGroup"}>
                    <label htmlFor="currency" className={"buy-label"}>Currency</label>
                    <select
                        id="currency"
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        required
                        className={"buy-select"}
                    >
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                    </select>
                </div>
           
                <button type="submit" className={"buy-button"}>Submit</button>
                
            </form>
            <div className={"buy-priceWrapper"}>
                <p className={"buy-priceLabel"}>Price:</p>
                <p className={"buy-priceValue"}>{game ? game.price : 0}</p>
            </div>
        </div>
    );
};


export default PurchasePage;
