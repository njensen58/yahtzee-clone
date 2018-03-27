import React from 'react';

function GameRules(){
    return (
        <div className="howToPlayDiv">
            <h1>How To Play</h1>
            <p>
                1. To begin, click the "New Roll" button.
            </p>
            <p>
                2. You will have 3 Rolls to acheive one of the scoring options on the yahtzee card.
            </p>
            <p>
                3. On each roll, click any of the die you wish to hold onto for the next roll, and this procedure will continue until either you have rolled 3 times, or you have selected all 5 die.  Once you select a die to save, it cannot be undone.
            </p>
            <p>
                4. Click "Sumbit Numbers", and then click the empty scoring fields on the yahtzee card to view and confirm your points.  If none of your final die produce a score, you must choose a field to have a 0 score
            </p>
            <p>
                5. Once a scoring field is filled, it cannot be undone.  The game will end once all 13 of the main scoring fields have been saved.
            </p>

            <h1>Bonuses</h1>
            <p>
                - The Upper Section will receive an automatic bonus of +35 points if the total upper section score is greater than or equal to 63.
            </p>
            <p>
                - The Yahtzee Bonus scoring is non-traditional Yahtzee in that you can receive as many bonuses as Yahtzees you roll.  If you have already scored a Yahtzee and roll another yahtzee, then you will be able to click the Yahtzee Bonus field to recieve the extra 100 points.  This will end the round and prompt you to roll again.  For every yahtzee bonus you roll, an additional 100 points can be added to this field.
            </p>

            <h1>Scoring Definitions</h1>
                <span>Ones - Sixes:</span>
                <p>
                    These fields correspond directly to the dice number. Example, rolling three 5's and two 1's would produce either a score of 15 in the 'FIVES' field, or a score of 2 in the 'ONES' field.
                </p>
                <span>3 & 4 of a kind</span>
                <p>
                    These are acheived by either have 3 or 4 of the same number at the end of your 3 rolls.  The points earned are dependent on what number you have 3 or 4 of.  For example, ( 5 - 5 - 5 ) is worth 15 points, and ( 5 - 5 - 5 - 5 ) is worth 20 points.
                </p>
                <span>Full House - 25pts</span>
                <p>
                    A full house occurs when your 5 die consist of a three-pair and a two-pair. For example, having ( 2 - 2 - 5 - 5 - 5 ) is a full house.
                </p>
                <span>Small Straight - 30pts</span>
                <p>
                    A Small Straight is an increasing sequence of four, such as  ( 1 - 2 - 3 - 4 ),  or  ( 2 - 3 - 4 - 5 ).
                    Large straights (see below) can also be used in the small straight scoring section.
                </p>
                <span>Large Straight - 40pts</span>
                <p>
                    A Large Straight is an increaseing sequence of fice, such as ( 1 - 2 - 3 - 4 - 5 ),  or  ( 2 - 3 - 4 - 5 - 6 ).
                </p>
                <span>Yahtzee - 50pts</span>
                <p>
                    A Yahtzee is a 5 of a kind, such as ( 6 - 6 - 6 - 6 - 6).
                </p>
                <span>Chance</span>
                <p>
                    Chance gives you a total of your final 5 die.  For example, ( 1 - 2 - 2 - 6 - 6 ) would give you 17 points.
                </p>
                <p>
                     <i className="ion-happy-outline icon"></i>
                           - THANKS FOR PLAYING! -
                     <i className="ion-happy-outline icon"></i> - The Almighty Developer
                </p>
        </div>
    )
}

export default GameRules;
