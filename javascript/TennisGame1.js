var TennisGame1 = function(player1Name, player2Name) {
    this.m_score1 = 0;
    this.m_score2 = 0;
    this.player1Name = player1Name;
    this.player2Name = player2Name;
    this.game = new Game(0, 0);
};

TennisGame1.prototype.wonPoint = function(playerName) {
    if (playerName === 'player1') {
        this.game.addPointToPlayerOne();
        this.m_score1 += 1;
    } else {
        this.game.addPointToPlayerTwo();
        this.m_score2 += 1;
    }
};

const matchScoreToPhrase = score => {
    const phrases = ['Love', 'Fifteen', 'Thirty', 'Forty'];

    return phrases[score];
};

TennisGame1.prototype.getScore = function() {
    var scoreAsPhrase = '';
    if (this.m_score1 === this.m_score2) {
        scoreAsPhrase = `${matchScoreToPhrase(this.m_score1)}-All`;
        if (this.m_score1 > 2) {
            scoreAsPhrase = 'Deuce';
        }
    } else if (
        (this.m_score1 >= 4 || this.m_score2 >= 4) &&
        Math.abs(this.m_score1 - this.m_score2) >= 2
    ) {
        var scoreDiff = this.m_score1 - this.m_score2;
        if (scoreDiff >= 2) scoreAsPhrase = 'Win for player1';
        else if (scoreDiff <= -2) scoreAsPhrase = 'Win for player2';
    } else if (this.m_score1 >= 4 || this.m_score2 >= 4) {
        scoreDiff = this.m_score1 - this.m_score2;
        if (scoreDiff === 1) scoreAsPhrase = 'Advantage player1';
        else if (scoreDiff === -1) scoreAsPhrase = 'Advantage player2';
    } else {
        scoreAsPhrase = `${matchScoreToPhrase(
            this.m_score1
        )}-${matchScoreToPhrase(this.m_score2)}`;
    }
    return scoreAsPhrase;
};

class Game {
    constructor(playerOneScore = 0, playerTwoScore = 0) {
        this.playerOneScore = playerOneScore;
        this.playTwoScore = playerTwoScore;
    }

    addPointToPlayerOne() {
        this.playerOneScore += 1;
    }

    addPointToPlayerTwo() {
        this.playerTwoScore += 1;
    }

    isWon() {
        return (
            (this.playerOneScore >= 4 || this.playerTwoScore >= 4) &&
            Math.abs(this.playerOneScore - this.playerTwoScore) >= 2
        );
    }

    whoWon() {}

    getState() {
        if (isWon()) return 'won';
    }
}

if (typeof window === 'undefined') {
    module.exports = TennisGame1;
}
